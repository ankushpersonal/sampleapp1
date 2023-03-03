import { TransportFactory } from '@improbable-eng/grpc-web/dist/typings/transports/Transport';
import { GrpcClient, GrpcClientFactory, GrpcEvent, GrpcMessage, GrpcMessageClass, GrpcMetadata } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Settings for the chosen implementation of GrpcClient
 */
export interface ImprobableEngGrpcWebClientSettings {
    host: string;
    transport: TransportFactory | ImprobableEngGrpcWebClientTransports;
    debug?: boolean;
}
/**
 * Settings for the transport implementation for each request
 */
export interface ImprobableEngGrpcWebClientTransports {
    unary: TransportFactory;
    serverStream: TransportFactory;
    clientStream: TransportFactory;
    bidiStream: TransportFactory;
}
/**
 * GrpcClientFactory implementation based on @improbable-eng/grpc-web
 */
export declare class ImprobableEngGrpcWebClientFactory implements GrpcClientFactory<ImprobableEngGrpcWebClientSettings> {
    private defaultSettings;
    constructor(defaultSettings: ImprobableEngGrpcWebClientSettings);
    createClient(serviceId: string, customSettings: ImprobableEngGrpcWebClientSettings): ImprobableEngGrpcWebClient;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImprobableEngGrpcWebClientFactory, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ImprobableEngGrpcWebClientFactory>;
}
/**
 * GrpcClient implementation based on grpc-web
 */
export declare class ImprobableEngGrpcWebClient implements GrpcClient<ImprobableEngGrpcWebClientSettings> {
    private serviceId;
    private settings;
    private client;
    constructor(serviceId: string, settings: ImprobableEngGrpcWebClientSettings);
    getSettings(): ImprobableEngGrpcWebClientSettings;
    unary<Q extends GrpcMessage, S extends GrpcMessage>(path: string, request: Q, metadata: GrpcMetadata, reqclss: GrpcMessageClass<Q>, resclss: GrpcMessageClass<S>): Observable<GrpcEvent<S>>;
    serverStream<Q extends GrpcMessage, S extends GrpcMessage>(path: string, request: Q, metadata: GrpcMetadata, reqclss: GrpcMessageClass<Q>, resclss: GrpcMessageClass<S>): Observable<GrpcEvent<S>>;
    clientStream<Q extends GrpcMessage, S extends GrpcMessage>(path: string, inputStream: Observable<Q>, metadata: GrpcMetadata, reqclss: GrpcMessageClass<Q>, resclss: GrpcMessageClass<S>): Observable<GrpcEvent<S>>;
    bidiStream<Q extends GrpcMessage, S extends GrpcMessage>(path: string, inputStream: Observable<Q>, metadata: GrpcMetadata, reqclss: GrpcMessageClass<Q>, resclss: GrpcMessageClass<S>): Observable<GrpcEvent<S>>;
    private castResponseMetadata;
    private getTransport;
}
