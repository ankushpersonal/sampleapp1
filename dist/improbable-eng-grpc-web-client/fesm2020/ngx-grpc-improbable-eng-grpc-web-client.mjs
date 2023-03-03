import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Optional, Inject, NgModule } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { GrpcStatusEvent, GrpcDataEvent, GrpcMetadata } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';

/**
 * Default configuration for grpc-web clients. Will be used for every GrpcWebClient unless service-specific config is provided
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useClass: { host: 'localhost:4321' } },
 * ]
 * ```
 */
const IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS = new InjectionToken('IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS');

/**
 * GrpcClientFactory implementation based on @improbable-eng/grpc-web
 */
class ImprobableEngGrpcWebClientFactory {
    constructor(defaultSettings) {
        this.defaultSettings = defaultSettings;
    }
    createClient(serviceId, customSettings) {
        const settings = customSettings || this.defaultSettings;
        if (!settings) {
            throw new Error(`grpc-web client factory: no settings provided for ${serviceId}`);
        }
        return new ImprobableEngGrpcWebClient(serviceId, { ...settings });
    }
}
ImprobableEngGrpcWebClientFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ImprobableEngGrpcWebClientFactory, deps: [{ token: IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ImprobableEngGrpcWebClientFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ImprobableEngGrpcWebClientFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ImprobableEngGrpcWebClientFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS]
                }] }]; } });
/**
 * GrpcClient implementation based on grpc-web
 */
class ImprobableEngGrpcWebClient {
    constructor(serviceId, settings) {
        this.serviceId = serviceId;
        this.settings = settings;
        // implementation is based on https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web-react-example/ts/_proto/examplecom/library/book_service_pb_service.js
        this.client = (() => {
            function Client() { }
            Client.serviceName = this.serviceId;
            return Client;
        })();
    }
    getSettings() {
        return { ...this.settings };
    }
    unary(path, request, metadata, reqclss, resclss) {
        return new Observable(obs => {
            const methodName = path.split('/')[2];
            const methodDescriptor = {
                methodName,
                service: this.client,
                requestStream: false,
                responseStream: false,
                requestType: reqclss,
                responseType: resclss,
            };
            const client = grpc.unary(methodDescriptor, {
                request,
                host: this.settings.host,
                metadata: new grpc.Metadata(metadata?.toObject() ?? {}),
                transport: this.getTransport('unary'),
                debug: this.settings.debug,
                onEnd: (response) => {
                    obs.next(new GrpcStatusEvent(response.status, response.statusMessage, this.castResponseMetadata(response.trailers)));
                    if (response.status !== grpc.Code.OK) {
                        obs.complete();
                    }
                    else {
                        obs.next(new GrpcDataEvent(response.message));
                        obs.complete();
                    }
                },
            });
            return () => client.close();
        });
    }
    serverStream(path, request, metadata, reqclss, resclss) {
        const methodName = path.split('/')[2];
        const methodDescriptor = {
            methodName,
            service: this.client,
            requestStream: false,
            responseStream: true,
            requestType: reqclss,
            responseType: resclss,
        };
        return new Observable(obs => {
            const client = grpc.invoke(methodDescriptor, {
                request,
                host: this.settings.host,
                metadata: new grpc.Metadata(metadata?.toObject() ?? {}),
                transport: this.getTransport('serverStream'),
                debug: this.settings.debug,
                onMessage: (data) => {
                    obs.next(new GrpcDataEvent(data));
                },
                onEnd: (status, statusMessage, trailers) => {
                    obs.next(new GrpcStatusEvent(status, statusMessage, this.castResponseMetadata(trailers)));
                    obs.complete();
                },
            });
            return () => client.close();
        });
    }
    clientStream(path, inputStream, metadata, reqclss, resclss) {
        const methodName = path.split('/')[2];
        const methodDescriptor = {
            methodName,
            service: this.client,
            requestStream: true,
            responseStream: false,
            requestType: reqclss,
            responseType: resclss,
        };
        return new Observable(obs => {
            const client = grpc.client(methodDescriptor, {
                host: this.settings.host,
                transport: this.getTransport('clientStream'),
                debug: this.settings.debug,
            });
            client.start(new grpc.Metadata(metadata?.toObject() ?? {}));
            const inputStreamSub = inputStream.subscribe(message => {
                client.send(message);
            }, () => {
                client.close();
            }, () => {
                client.finishSend();
            });
            client.onMessage(data => obs.next(new GrpcDataEvent(data)));
            client.onEnd((status, statusMessage, trailers) => {
                obs.next(new GrpcStatusEvent(status, statusMessage, this.castResponseMetadata(trailers)));
                obs.complete();
            });
            return () => {
                inputStreamSub.unsubscribe();
                client.close();
            };
        });
    }
    bidiStream(path, inputStream, metadata, reqclss, resclss) {
        const methodName = path.split('/')[2];
        const methodDescriptor = {
            methodName,
            service: this.client,
            requestStream: true,
            responseStream: false,
            requestType: reqclss,
            responseType: resclss,
        };
        return new Observable(obs => {
            const client = grpc.client(methodDescriptor, {
                host: this.settings.host,
                transport: this.getTransport('bidiStream'),
                debug: this.settings.debug,
            });
            client.start(new grpc.Metadata(metadata?.toObject() ?? {}));
            const inputStreamSub = inputStream.subscribe(message => {
                client.send(message);
            }, () => {
                client.close();
            }, () => {
                client.finishSend();
            });
            client.onMessage(data => obs.next(new GrpcDataEvent(data)));
            client.onEnd((status, statusMessage, trailers) => {
                obs.next(new GrpcStatusEvent(status, statusMessage, this.castResponseMetadata(trailers)));
                obs.complete();
            });
            return () => {
                inputStreamSub.unsubscribe();
                client.close();
            };
        });
    }
    castResponseMetadata({ headersMap }) {
        return new GrpcMetadata(Object.keys(headersMap).reduce((r, k) => ({ ...r, [k]: headersMap[k][0] }), {}));
    }
    getTransport(key) {
        const { transport } = this.settings;
        return typeof transport === 'function' ? transport : transport[key];
    }
}

class ImprobableEngGrpcWebClientModule {
    /**
     * Create ImprobableEngGrpcWebClientModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options) {
        const providers = [{ provide: GRPC_CLIENT_FACTORY, useClass: ImprobableEngGrpcWebClientFactory }];
        if (options?.settings) {
            providers.push({ provide: IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: ImprobableEngGrpcWebClientModule, providers };
    }
    /**
     * Create ImprobableEngGrpcWebClientModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options) {
        const providers = [{ provide: GRPC_CLIENT_FACTORY, useClass: ImprobableEngGrpcWebClientFactory }];
        if (options?.settings) {
            providers.push({ provide: IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: ImprobableEngGrpcWebClientModule, providers };
    }
}
ImprobableEngGrpcWebClientModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ImprobableEngGrpcWebClientModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImprobableEngGrpcWebClientModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ImprobableEngGrpcWebClientModule });
ImprobableEngGrpcWebClientModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ImprobableEngGrpcWebClientModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: ImprobableEngGrpcWebClientModule, decorators: [{
            type: NgModule
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { IMPROBABLE_ENG_GRPC_WEB_CLIENT_DEFAULT_SETTINGS, ImprobableEngGrpcWebClient, ImprobableEngGrpcWebClientFactory, ImprobableEngGrpcWebClientModule };
//# sourceMappingURL=ngx-grpc-improbable-eng-grpc-web-client.mjs.map
