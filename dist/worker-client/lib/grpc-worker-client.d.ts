import { GrpcClient, GrpcClientFactory, GrpcEvent, GrpcMessage, GrpcMessageClass, GrpcMetadata } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { GrpcWorkerGateway } from './grpc-worker-gateway';
import * as i0 from "@angular/core";
/**
 * Settings for the chosen implementation of GrpcClient
 */
export interface GrpcWorkerClientSettings {
    host: string;
    format?: string;
    suppressCorsPreflight?: boolean;
    withCredentials?: boolean;
}
/**
 * GrpcClientFactory implementation based on grpc-web running in worker
 */
export declare class GrpcWorkerClientFactory implements GrpcClientFactory<GrpcWorkerClientSettings> {
    private defaultSettings;
    private gateway;
    constructor(defaultSettings: GrpcWorkerClientSettings, gateway: GrpcWorkerGateway);
    createClient(serviceId: string, customSettings: GrpcWorkerClientSettings): GrpcWorkerClient;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrpcWorkerClientFactory, [{ optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrpcWorkerClientFactory>;
}
/**
 * GrpcClient implementation based on grpc-web running in worker
 */
export declare class GrpcWorkerClient implements GrpcClient<GrpcWorkerClientSettings> {
    private serviceId;
    private settings;
    private gateway;
    constructor(serviceId: string, settings: GrpcWorkerClientSettings, gateway: GrpcWorkerGateway);
    getSettings(): GrpcWorkerClientSettings;
    unary<Q extends GrpcMessage, S extends GrpcMessage>(path: string, req: Q, metadata: GrpcMetadata, reqclss: GrpcMessageClass<Q>, resclss: GrpcMessageClass<S>): Observable<GrpcEvent<S>>;
    serverStream<Q extends GrpcMessage, S extends GrpcMessage>(path: string, req: Q, metadata: GrpcMetadata, reqclss: GrpcMessageClass<Q>, resclss: GrpcMessageClass<S>): Observable<GrpcEvent<S>>;
    clientStream: () => never;
    bidiStream: () => never;
}
