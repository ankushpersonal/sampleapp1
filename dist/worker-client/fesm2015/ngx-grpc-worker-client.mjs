import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Optional, NgModule } from '@angular/core';
import { GrpcDataEvent, GrpcStatusEvent, GrpcMetadata } from '@ngx-grpc/common';
import { tap } from 'rxjs/operators';
import { GrpcWorkerApi } from '@ngx-grpc/worker';
import { Observable } from 'rxjs';
import { GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';

/**
 * Registers a worker implementation, generated by Angular CLI and implemented according documentation
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_WORKER, useFactory: () => new Worker('./grpc.worker', { type: 'module' }) },
 * ]
 * ```
 */
const GRPC_WORKER = new InjectionToken('GRPC_WORKER');
/**
 * Default configuration for grpc-web clients running in worker. Will be used for every GrpcWorkerClient unless service-specific config is provided
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, useClass: { host: 'localhost:4321' } },
 * ]
 * ```
 */
const GRPC_WORKER_CLIENT_DEFAULT_SETTINGS = new InjectionToken('GRPC_WORKER_CLIENT_DEFAULT_SETTINGS');

/** @dynamic */
class GrpcWorkerGateway {
    constructor(worker) {
        this.worker = worker;
        this.lastId = 0;
        this.connections = new Map();
        worker.onmessage = (event) => {
            const data = event.data;
            const connection = this.connections.get(data.id);
            if (connection && data.type === GrpcWorkerApi.GrpcWorkerMessageType.rpcResponse) {
                switch (data.responseType) {
                    case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.error:
                        connection.next(new GrpcStatusEvent(data.error.code, data.error.message, data.error.metadata));
                        connection.complete();
                        this.connections.delete(data.id);
                        break;
                    case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.status:
                        connection.next(new GrpcStatusEvent(data.status.code, data.status.details, new GrpcMetadata(data.status.metadata)));
                        break;
                    case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.data:
                        connection.next(new GrpcDataEvent(data.response));
                        break;
                    case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.end:
                        connection.complete();
                        this.connections.delete(data.id);
                        break;
                }
            }
        };
    }
    configureServiceClient(serviceId, settings) {
        this.worker.postMessage({ type: GrpcWorkerApi.GrpcWorkerMessageType.serviceClientConfig, serviceId, settings });
    }
    callUnaryFromWorker(serviceId, path, request, metadata) {
        return new Observable(observer => {
            const id = this.createRequestId();
            this.connections.set(id, observer);
            this.worker.postMessage({
                type: GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest,
                id,
                serviceId,
                path,
                request,
                metadata,
            });
            return () => this.closeConnection(id);
        });
    }
    callServerStreamFromWorker(serviceId, path, request, metadata) {
        return new Observable(observer => {
            const id = this.createRequestId();
            this.connections.set(id, observer);
            this.worker.postMessage({
                type: GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest,
                id,
                serviceId,
                path,
                request,
                metadata,
            });
            return () => this.closeConnection(id);
        });
    }
    closeConnection(id) {
        this.worker.postMessage({
            type: GrpcWorkerApi.GrpcWorkerMessageType.rpcCancel,
            id,
        });
        this.connections.delete(id);
    }
    createRequestId() {
        return this.lastId++;
    }
}
GrpcWorkerGateway.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerGateway, deps: [{ token: GRPC_WORKER }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcWorkerGateway.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerGateway });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerGateway, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: Worker, decorators: [{
                        type: Inject,
                        args: [GRPC_WORKER]
                    }] }];
    } });

/**
 * GrpcClientFactory implementation based on grpc-web running in worker
 */
class GrpcWorkerClientFactory {
    constructor(defaultSettings, gateway) {
        this.defaultSettings = defaultSettings;
        this.gateway = gateway;
    }
    createClient(serviceId, customSettings) {
        const settings = customSettings || this.defaultSettings;
        if (!settings) {
            throw new Error(`Worker client factory: no settings provided for ${serviceId}`);
        }
        return new GrpcWorkerClient(serviceId, Object.assign({}, settings), this.gateway);
    }
}
GrpcWorkerClientFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientFactory, deps: [{ token: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, optional: true }, { token: GrpcWorkerGateway }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcWorkerClientFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [GRPC_WORKER_CLIENT_DEFAULT_SETTINGS]
                    }] }, { type: GrpcWorkerGateway }];
    } });
/**
 * GrpcClient implementation based on grpc-web running in worker
 */
class GrpcWorkerClient {
    constructor(serviceId, settings, gateway) {
        this.serviceId = serviceId;
        this.settings = settings;
        this.gateway = gateway;
        this.clientStream = () => {
            throw new Error('Client streaming not supported');
        };
        this.bidiStream = () => {
            throw new Error('Bidirectional streaming not supported');
        };
        this.gateway.configureServiceClient(this.serviceId, this.settings);
    }
    getSettings() {
        return Object.assign({}, this.settings);
    }
    unary(path, req, metadata, reqclss, resclss) {
        var _a;
        return this.gateway
            .callUnaryFromWorker(this.serviceId, path, req.toObject(), (_a = metadata === null || metadata === void 0 ? void 0 : metadata.toObject()) !== null && _a !== void 0 ? _a : {})
            .pipe(tap(res => {
            if (res instanceof GrpcDataEvent) {
                res.data = new resclss(res.data);
            }
        }));
    }
    serverStream(path, req, metadata, reqclss, resclss) {
        var _a;
        return this.gateway
            .callServerStreamFromWorker(this.serviceId, path, req.toObject(), (_a = metadata === null || metadata === void 0 ? void 0 : metadata.toObject()) !== null && _a !== void 0 ? _a : {})
            .pipe(tap(res => {
            if (res instanceof GrpcDataEvent) {
                res.data = new resclss(res.data);
            }
        }));
    }
}

class GrpcWorkerClientModule {
    /**
     * Create GrpcWorkerClientModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options) {
        const providers = [
            GrpcWorkerGateway,
            { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWorkerClientFactory },
        ];
        if (options === null || options === void 0 ? void 0 : options.worker) {
            providers.push({ provide: GRPC_WORKER, useValue: options.worker });
        }
        if (options === null || options === void 0 ? void 0 : options.settings) {
            providers.push({ provide: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcWorkerClientModule, providers };
    }
    /**
     * Create GrpcWorkerClientModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options) {
        const providers = [
            GrpcWorkerGateway,
            { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWorkerClientFactory },
        ];
        if (options === null || options === void 0 ? void 0 : options.worker) {
            providers.push({ provide: GRPC_WORKER, useValue: options.worker });
        }
        if (options === null || options === void 0 ? void 0 : options.settings) {
            providers.push({ provide: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcWorkerClientModule, providers };
    }
}
GrpcWorkerClientModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GrpcWorkerClientModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientModule });
GrpcWorkerClientModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientModule, decorators: [{
            type: NgModule
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { GRPC_WORKER, GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, GrpcWorkerClient, GrpcWorkerClientFactory, GrpcWorkerClientModule, GrpcWorkerGateway };
//# sourceMappingURL=ngx-grpc-worker-client.mjs.map
