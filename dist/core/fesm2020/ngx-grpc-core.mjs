import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, NgModule } from '@angular/core';
import { GrpcCallType, GrpcDataEvent, GrpcStatusEvent } from '@ngx-grpc/common';
import { isObservable, throwError, of } from 'rxjs';
import { tap, switchMap, filter, map } from 'rxjs/operators';

/**
 * Use this injection token to register the GrpcClientFactory
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_CLIENT_FACTORY, useClass: MyClientFactory },
 * ]
 * ```
 */
const GRPC_CLIENT_FACTORY = new InjectionToken('GRPC_CLIENT_FACTORY');
/**
 * Use this injection token to add interceptors
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_INTERCEPTORS, useClass: MyInterceptor, multi: true },
 * ]
 * ```
 */
const GRPC_INTERCEPTORS = new InjectionToken('GRPC_INTERCEPTORS');

/**
 * Core gRPC transport class. Implements creation and binding of RPCs to the clients.
 * There is a root GrpcHandler that handles all initial requests;
 * however for every interception a new instance of GrpcHandler is created and passed to the interceptor
 */
class GrpcHandler {
    constructor(configuredInterceptors) {
        this.interceptors = !configuredInterceptors ? [] : Array.isArray(configuredInterceptors) ? configuredInterceptors : [configuredInterceptors];
    }
    /**
     * Handles the gRPC request passing it through the interceptors array
     * Recursively calls all interceptors with a new instance of the GrpcHandler
     *
     * @param request a GrpcRequest to execute
     * @returns Observable of events returned by the GrpcClient implementation
     */
    handle(request) {
        const interceptors = (this.interceptors || []).slice();
        const interceptor = interceptors.shift();
        if (interceptor) {
            return interceptor.intercept(request, new GrpcHandler(interceptors));
        }
        switch (request.type) {
            case GrpcCallType.unary: return request.client.unary(request.path, this.message(request.requestData), request.requestMetadata, request.requestClass, request.responseClass);
            case GrpcCallType.serverStream: return request.client.serverStream(request.path, this.message(request.requestData), request.requestMetadata, request.requestClass, request.responseClass);
            case GrpcCallType.clientStream: return request.client.clientStream(request.path, this.stream(request.requestData), request.requestMetadata, request.requestClass, request.responseClass);
            case GrpcCallType.bidiStream: return request.client.bidiStream(request.path, this.stream(request.requestData), request.requestMetadata, request.requestClass, request.responseClass);
        }
    }
    message(p) {
        if (!isObservable(p)) {
            return p;
        }
        throw new Error('Expected Message, got Observable');
    }
    stream(p) {
        if (isObservable(p)) {
            return p;
        }
        throw new Error('Expected Observable, got message');
    }
}
GrpcHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcHandler, deps: [{ token: GRPC_INTERCEPTORS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcHandler });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcHandler, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GRPC_INTERCEPTORS]
                }] }]; } });

class GrpcCoreModule {
    /**
     * Create GrpcCoreModule for using in AppModule (application root module)
     */
    static forRoot() {
        return {
            ngModule: GrpcCoreModule,
            providers: [
                GrpcHandler,
            ],
        };
    }
    /**
     * Create GrpcCoreModule for using in children modules (incl. lazy modules)
     */
    static forChild() {
        return {
            ngModule: GrpcCoreModule,
            providers: [
                GrpcHandler,
            ],
        };
    }
}
GrpcCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GrpcCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcCoreModule });
GrpcCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcCoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcCoreModule, decorators: [{
            type: NgModule
        }] });

/**
 * A configuration for GrpcLoggerInterceptor
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_LOGGER_SETTINGS, useValue: { enabled: true } },
 * ]
 * ```
 *
 * or more complex:
 *
 * ```
 * providers: [
 *   { provide: GRPC_LOGGER_SETTINGS, useFactory: () => { enabled: localStorage.getItem('GRPC_LOGGER_SETTINGS') === 'true' || !environment.prod } },
 * ]
 * ```
 */
const GRPC_LOGGER_SETTINGS = new InjectionToken('GRPC_LOGGER_SETTINGS');
/**
 * Interceptor that implements logging of every request to the browser console
 *
 * Can be enabled / disabled by GRPC_LOGGER_ENABLED injection token
 */
class GrpcLoggerInterceptor {
    constructor(settings = {}) {
        this.clientDataStyle = 'color: #eb0edc;';
        this.dataStyle = 'color: #5c7ced;';
        this.errorStyle = 'color: #f00505;';
        this.statusOkStyle = 'color: #0ffcf5;';
        this.settings = {
            enabled: settings.enabled ?? true,
            logClientSettings: settings.logClientSettings ?? true,
            logMetadata: settings.logMetadata ?? true,
            logStatusCodeOk: settings.logStatusCodeOk ?? false,
            requestMapper: settings.requestMapper ?? ((msg) => msg.toObject()),
            responseMapper: settings.responseMapper ?? ((msg) => msg.toObject()),
        };
    }
    intercept(request, next) {
        if (this.settings.enabled) {
            const id = ++GrpcLoggerInterceptor.requestId;
            const start = Date.now();
            // check if client streaming, then push each value separately
            if (isObservable(request.requestData)) {
                request.requestData = request.requestData.pipe(tap(msg => {
                    console.groupCollapsed(`%c#${id}: ${Date.now() - start}ms -> ${request.path}`, this.clientDataStyle);
                    console.log('%c>>', this.clientDataStyle, this.settings.requestMapper(msg));
                    console.groupEnd();
                }));
            }
            // handle unary calls and server streaming in the same manner
            return next.handle(request).pipe(tap(event => {
                const style = event instanceof GrpcDataEvent ? this.dataStyle : event.statusCode !== 0 ? this.errorStyle : this.statusOkStyle;
                const openGroup = () => console.groupCollapsed(`%c#${id}: ${Date.now() - start}ms -> ${request.path}`, style);
                const printSettings = () => {
                    if (this.settings.logClientSettings) {
                        console.log('%csc', style, request.client.getSettings());
                    }
                };
                const printMetadata = () => {
                    if (this.settings.logMetadata) {
                        console.log('%c**', style, request.requestMetadata.toObject());
                    }
                };
                const printRequest = () => console.log('%c>>', style, isObservable(request.requestData) ? '<see above>' : this.settings.requestMapper(request.requestData));
                const closeGroup = () => console.groupEnd();
                if (event instanceof GrpcDataEvent) {
                    openGroup();
                    printSettings();
                    printRequest();
                    printMetadata();
                    console.log('%c<<', style, this.settings.responseMapper(event.data));
                    closeGroup();
                }
                else if (event.statusCode !== 0) {
                    openGroup();
                    printSettings();
                    printRequest();
                    printMetadata();
                    console.log('%c<<', style, event);
                    closeGroup();
                }
                else if (event.statusCode === 0 && this.settings.logStatusCodeOk) {
                    openGroup();
                    printSettings();
                    printRequest();
                    printMetadata();
                    console.log('%c<<', style, event);
                    closeGroup();
                }
            }));
        }
        return next.handle(request);
    }
}
GrpcLoggerInterceptor.requestId = 0;
GrpcLoggerInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerInterceptor, deps: [{ token: GRPC_LOGGER_SETTINGS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcLoggerInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GRPC_LOGGER_SETTINGS]
                }] }]; } });

class GrpcLoggerModule {
    /**
     * Create GrpcLoggerModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options) {
        const providers = [{ provide: GRPC_INTERCEPTORS, useClass: GrpcLoggerInterceptor, multi: true }];
        if (options?.settings) {
            providers.push({ provide: GRPC_LOGGER_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcLoggerModule, providers };
    }
    /**
     * Create GrpcCoreModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options) {
        const providers = [{ provide: GRPC_INTERCEPTORS, useClass: GrpcLoggerInterceptor, multi: true }];
        if (options?.settings) {
            providers.push({ provide: GRPC_LOGGER_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcLoggerModule, providers };
    }
}
GrpcLoggerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GrpcLoggerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerModule });
GrpcLoggerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerModule, decorators: [{
            type: NgModule
        }] });

/**
 * RxJS operator
 * When applied to gRPC events emits error for status events with a non-zero code (includes throwStatusErrors)
 *
 * @return Observable of gRPC events
 */
function throwStatusErrors() {
    return (source$) => source$.pipe(switchMap(event => event instanceof GrpcStatusEvent && event.statusCode ? throwError(event) : of(event)));
}
/**
 * RxJS operator
 * When applied to gRPC events stream extracts and returns only messages
 *
 * @return Observable of messages
 */
function takeMessages() {
    return (source$) => source$.pipe(filter(event => event instanceof GrpcDataEvent), map((event) => event.data));
}

/**
 * Generated bundle index. Do not edit.
 */

export { GRPC_CLIENT_FACTORY, GRPC_INTERCEPTORS, GRPC_LOGGER_SETTINGS, GrpcCoreModule, GrpcHandler, GrpcLoggerInterceptor, GrpcLoggerModule, takeMessages, throwStatusErrors };
//# sourceMappingURL=ngx-grpc-core.mjs.map
