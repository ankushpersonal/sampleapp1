import { InjectionToken } from '@angular/core';
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
export declare const GRPC_WEB_CLIENT_DEFAULT_SETTINGS: InjectionToken<unknown>;
