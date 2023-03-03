import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, NgModule } from '@angular/core';
import { GrpcStatusEvent, GrpcMetadata, GrpcDataEvent } from '@ngx-grpc/common';
import { GrpcWebClientBase, MethodDescriptor } from 'grpc-web';
import { Observable } from 'rxjs';
import { GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';

/**
 * Default configuration for grpc-web clients. Will be used for every GrpcWebClient unless service-specific config is provided
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useClass: { host: 'localhost:4321' } },
 * ]
 * ```
 */
const GRPC_WEB_CLIENT_DEFAULT_SETTINGS = new InjectionToken('GRPC_WEB_CLIENT_DEFAULT_SETTINGS');

/**
 * GrpcClientFactory implementation based on grpc-web
 */
class GrpcWebClientFactory {
    constructor(defaultSettings) {
        this.defaultSettings = defaultSettings;
    }
    createClient(serviceId, customSettings) {
        const settings = customSettings || this.defaultSettings;
        if (!settings) {
            throw new Error(`grpc-web client factory: no settings provided for ${serviceId}`);
        }
        return new GrpcWebClient(Object.assign({}, settings));
    }
}
GrpcWebClientFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientFactory, deps: [{ token: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcWebClientFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GRPC_WEB_CLIENT_DEFAULT_SETTINGS]
                    }] }];
    } });
/**
 * GrpcClient implementation based on grpc-web
 */
class GrpcWebClient {
    constructor(settings) {
        this.settings = settings;
        this.clientStream = () => {
            throw new Error('Client streaming not supported');
        };
        this.bidiStream = () => {
            throw new Error('Bidirectional streaming not supported');
        };
        this.client = new GrpcWebClientBase(this.settings);
    }
    getSettings() {
        return Object.assign({}, this.settings);
    }
    unary(path, req, metadata, reqclss, resclss) {
        const descriptor = new MethodDescriptor(path, 'unary', reqclss, resclss, (request) => request.serializeBinary(), resclss.deserializeBinary);
        return new Observable(obs => {
            var _a;
            const stream = this.client.rpcCall(this.settings.host + path, req, (_a = metadata === null || metadata === void 0 ? void 0 : metadata.toObject()) !== null && _a !== void 0 ? _a : {}, descriptor, (error, data) => {
                if (error) {
                    obs.next(new GrpcStatusEvent(error.code, error.message, new GrpcMetadata(error.metadata)));
                    obs.complete();
                }
                else {
                    obs.next(new GrpcDataEvent(data));
                }
            });
            // take only status 0 because unary error already includes non-zero statuses
            stream.on('status', status => status.code === 0 ? obs.next(new GrpcStatusEvent(status.code, status.details, new GrpcMetadata(status.metadata))) : null);
            stream.on('end', () => obs.complete());
            return () => stream.cancel();
        });
    }
    serverStream(path, req, metadata, reqclss, resclss) {
        const descriptor = new MethodDescriptor(path, 'server_streaming', reqclss, resclss, (request) => request.serializeBinary(), resclss.deserializeBinary);
        return new Observable(obs => {
            var _a;
            const stream = this.client.serverStreaming(this.settings.host + path, req, (_a = metadata === null || metadata === void 0 ? void 0 : metadata.toObject()) !== null && _a !== void 0 ? _a : {}, descriptor);
            stream.on('status', status => obs.next(new GrpcStatusEvent(status.code, status.details, new GrpcMetadata(status.metadata))));
            stream.on('error', error => {
                obs.next(new GrpcStatusEvent(error.code, error.message, new GrpcMetadata(error.metadata)));
                obs.complete();
            });
            stream.on('data', data => obs.next(new GrpcDataEvent(data)));
            stream.on('end', () => obs.complete());
            return () => stream.cancel();
        });
    }
}

class GrpcWebClientModule {
    /**
     * Create GrpcWebClientModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options) {
        const providers = [{ provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory }];
        if (options === null || options === void 0 ? void 0 : options.settings) {
            providers.push({ provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcWebClientModule, providers };
    }
    /**
     * Create GrpcWebClientModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options) {
        const providers = [{ provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory }];
        if (options === null || options === void 0 ? void 0 : options.settings) {
            providers.push({ provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcWebClientModule, providers };
    }
}
GrpcWebClientModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GrpcWebClientModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientModule });
GrpcWebClientModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientModule, decorators: [{
            type: NgModule
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { GRPC_WEB_CLIENT_DEFAULT_SETTINGS, GrpcWebClient, GrpcWebClientFactory, GrpcWebClientModule };
//# sourceMappingURL=ngx-grpc-grpc-web-client.mjs.map
