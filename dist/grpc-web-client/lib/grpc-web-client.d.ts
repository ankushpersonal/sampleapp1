import { GrpcClient, GrpcClientFactory, GrpcEvent, GrpcMessage, GrpcMessageClass, GrpcMetadata } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Settings for the chosen implementation of GrpcClient
 */
export interface GrpcWebClientSettings {
    host: string;
    format?: string;
    suppressCorsPreflight?: boolean;
    withCredentials?: boolean;
}
/**
 * GrpcClientFactory implementation based on grpc-web
 */
export declare class GrpcWebClientFactory implements GrpcClientFactory<GrpcWebClientSettings> {
    private defaultSettings;
    constructor(defaultSettings: GrpcWebClientSettings);
    createClient(serviceId: string, customSettings: GrpcWebClientSettings): GrpcWebClient;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrpcWebClientFactory, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrpcWebClientFactory>;
}
/**
 * GrpcClient implementation based on grpc-web
 */
export declare class GrpcWebClient implements GrpcClient<GrpcWebClientSettings> {
    private settings;
    private client;
    constructor(settings: GrpcWebClientSettings);
    getSettings(): GrpcWebClientSettings;
    unary<Q extends GrpcMessage, S extends GrpcMessage>(path: string, req: Q, metadata: GrpcMetadata, reqclss: GrpcMessageClass<Q>, resclss: GrpcMessageClass<S>): Observable<GrpcEvent<S>>;
    serverStream<Q extends GrpcMessage, S extends GrpcMessage>(path: string, req: Q, metadata: GrpcMetadata, reqclss: GrpcMessageClass<Q>, resclss: GrpcMessageClass<S>): Observable<GrpcEvent<S>>;
    clientStream: () => never;
    bidiStream: () => never;
}
