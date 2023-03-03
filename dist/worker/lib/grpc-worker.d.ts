import { GrpcWorkerServiceClientDef } from './service-client-def';
/**
 * A worker-side service of worker client implementation based on grpc-web
 *
 * Example:
 *
 * ```
 * /// <reference lib="webworker" />
 *
 * import { GrpcWorker } from '@ngx-grpc/worker';
 * import { GrpcWorkerEchoServiceClientDef } from '../proto/echo.pbwsc';
 *
 * const worker = new GrpcWorker();
 *
 * worker.register(
 *   // register here all the service clients definitions
 *   GrpcWorkerEchoServiceClientDef,
 * );
 *
 * worker.start();
 * ```
 */
export declare class GrpcWorker {
    private definitions;
    private clients;
    private requestCancelHandlers;
    /**
     * Register one or more service clients.
     * Add here only the services you use, otherwise the worker size can explode.
     *
     * @param defs generated service client definitions to register
     */
    register(...defs: GrpcWorkerServiceClientDef[]): void;
    /**
     * Start the service
     */
    start(): void;
    private configureServiceClient;
    private handleRpc;
    private cancelRpc;
}
