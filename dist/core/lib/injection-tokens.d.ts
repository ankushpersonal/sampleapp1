import { InjectionToken } from '@angular/core';
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
export declare const GRPC_CLIENT_FACTORY: InjectionToken<unknown>;
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
export declare const GRPC_INTERCEPTORS: InjectionToken<unknown>;
