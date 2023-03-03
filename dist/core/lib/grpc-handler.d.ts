import { GrpcEvent, GrpcMessage, GrpcRequest } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
import { GrpcInterceptor } from './grpc-interceptor';
import * as i0 from "@angular/core";
/**
 * Core gRPC transport class. Implements creation and binding of RPCs to the clients.
 * There is a root GrpcHandler that handles all initial requests;
 * however for every interception a new instance of GrpcHandler is created and passed to the interceptor
 */
export declare class GrpcHandler {
    private interceptors;
    constructor(configuredInterceptors: GrpcInterceptor | GrpcInterceptor[]);
    /**
     * Handles the gRPC request passing it through the interceptors array
     * Recursively calls all interceptors with a new instance of the GrpcHandler
     *
     * @param request a GrpcRequest to execute
     * @returns Observable of events returned by the GrpcClient implementation
     */
    handle<Q extends GrpcMessage, S extends GrpcMessage>(request: GrpcRequest<Q, S>): Observable<GrpcEvent<S>>;
    private message;
    private stream;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrpcHandler, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrpcHandler>;
}
