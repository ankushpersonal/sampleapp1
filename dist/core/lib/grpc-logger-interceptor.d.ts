import { InjectionToken } from '@angular/core';
import { GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { GrpcHandler } from './grpc-handler';
import { GrpcInterceptor } from './grpc-interceptor';
import * as i0 from "@angular/core";
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
export declare const GRPC_LOGGER_SETTINGS: InjectionToken<unknown>;
/**
 * A configuration definition for GrpcLoggerInterceptor
 */
export interface GrpcLoggerSettings {
    /**
     * Enables / disables the output, default true
     */
    enabled?: boolean;
    /**
     * Includes client settings into the logs, default true
     */
    logClientSettings?: boolean;
    /**
     * Includes request metadata into the logs, default true
     */
    logMetadata?: boolean;
    /**
     * Logs events with status code OK (0), default false
     */
    logStatusCodeOk?: boolean;
    /**
     * Request mapper function, defines what output is generated for the given message.
     * The default implementation is `(msg) => msg.toObject()`.
     * According to your preferences you might choose e.g. `(msg) => msg.toProtobufJSON()` instead.
     */
    requestMapper?: (msg: GrpcMessage) => any;
    /**
     * Response mapper function, defines what output is generated for the given message.
     * The default implementation is `(msg) => msg.toObject()`.
     * According to your preferences you might choose e.g. `(msg) => msg.toProtobufJSON()` instead.
     */
    responseMapper?: (msg: GrpcMessage) => any;
}
/**
 * Interceptor that implements logging of every request to the browser console
 *
 * Can be enabled / disabled by GRPC_LOGGER_ENABLED injection token
 */
export declare class GrpcLoggerInterceptor implements GrpcInterceptor {
    private static requestId;
    private clientDataStyle;
    private dataStyle;
    private errorStyle;
    private statusOkStyle;
    private settings;
    constructor(settings?: GrpcLoggerSettings);
    intercept<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>, next: GrpcHandler): Observable<GrpcEvent<S>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrpcLoggerInterceptor, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrpcLoggerInterceptor>;
}
