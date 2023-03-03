import { GrpcCallType } from '@ngx-grpc/common';
import { GrpcWebClientBase, MethodDescriptor } from 'grpc-web';

/* eslint-disable  @typescript-eslint/no-namespace */
var GrpcWorkerApi;
(function (GrpcWorkerApi) {
    let GrpcWorkerMessageType;
    (function (GrpcWorkerMessageType) {
        GrpcWorkerMessageType[GrpcWorkerMessageType["serviceClientConfig"] = 0] = "serviceClientConfig";
        GrpcWorkerMessageType[GrpcWorkerMessageType["rpcRequest"] = 1] = "rpcRequest";
        GrpcWorkerMessageType[GrpcWorkerMessageType["rpcCancel"] = 2] = "rpcCancel";
        GrpcWorkerMessageType[GrpcWorkerMessageType["rpcResponse"] = 3] = "rpcResponse";
    })(GrpcWorkerMessageType = GrpcWorkerApi.GrpcWorkerMessageType || (GrpcWorkerApi.GrpcWorkerMessageType = {}));
    let GrpcWorkerMessageRPCResponseType;
    (function (GrpcWorkerMessageRPCResponseType) {
        GrpcWorkerMessageRPCResponseType[GrpcWorkerMessageRPCResponseType["error"] = 0] = "error";
        GrpcWorkerMessageRPCResponseType[GrpcWorkerMessageRPCResponseType["status"] = 1] = "status";
        GrpcWorkerMessageRPCResponseType[GrpcWorkerMessageRPCResponseType["data"] = 2] = "data";
        GrpcWorkerMessageRPCResponseType[GrpcWorkerMessageRPCResponseType["end"] = 3] = "end";
    })(GrpcWorkerMessageRPCResponseType = GrpcWorkerApi.GrpcWorkerMessageRPCResponseType || (GrpcWorkerApi.GrpcWorkerMessageRPCResponseType = {}));
})(GrpcWorkerApi || (GrpcWorkerApi = {}));

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
class GrpcWorker {
    constructor() {
        this.definitions = new Map();
        this.clients = new Map();
        this.requestCancelHandlers = new Map();
    }
    /**
     * Register one or more service clients.
     * Add here only the services you use, otherwise the worker size can explode.
     *
     * @param defs generated service client definitions to register
     */
    register(...defs) {
        defs.forEach(def => this.definitions.set(def.serviceId, def));
    }
    /**
     * Start the service
     */
    start() {
        addEventListener('message', ({ data }) => {
            switch (data.type) {
                case GrpcWorkerApi.GrpcWorkerMessageType.serviceClientConfig:
                    this.configureServiceClient(data);
                    break;
                case GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest:
                    this.handleRpc(data);
                    break;
                case GrpcWorkerApi.GrpcWorkerMessageType.rpcCancel:
                    this.cancelRpc(data);
                    break;
                default: throw new Error(`Unknown incoming message type ${data.type}`);
            }
        });
    }
    configureServiceClient(message) {
        const def = this.definitions.get(message.serviceId);
        if (!def) {
            throw new Error(`Service client ${message.serviceId} is not registered in Worker`);
        }
        this.clients.set(message.serviceId, { settings: message.settings, client: new GrpcWebClientBase(message.settings) });
    }
    handleRpc(message) {
        const def = this.definitions.get(message.serviceId);
        if (!def) {
            throw new Error(`Service client ${message.serviceId} is not registered in Worker`);
        }
        const service = this.clients.get(message.serviceId);
        if (!service) {
            throw new Error(`Service client ${message.serviceId} is not configured in Worker`);
        }
        const respond = (msg) => (postMessage({
            type: GrpcWorkerApi.GrpcWorkerMessageType.rpcResponse,
            id: message.id,
            ...msg,
        }));
        const { type, reqclss, resclss } = def.methods[message.path];
        const request = new reqclss(message.request);
        const url = service.settings.host + message.path;
        const metadata = message.metadata || {};
        const descriptor = new MethodDescriptor(message.path, type === GrpcCallType.unary ? 'unary' : 'server_streaming', reqclss, resclss, (req) => req.serializeBinary(), resclss.deserializeBinary);
        if (type === GrpcCallType.unary) {
            const stream = service.client.rpcCall(url, request, metadata, descriptor, (error, response) => {
                if (error) {
                    this.requestCancelHandlers.delete(message.id);
                    respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.error, error });
                }
                else {
                    respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.data, response: response.toObject() });
                }
            });
            // take only status 0 because unary error already includes non-zero statuses
            stream.on('status', (status) => status.code === 0 ? respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.status, status }) : null);
            stream.on('end', () => {
                this.requestCancelHandlers.delete(message.id);
                respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.end });
            });
            this.requestCancelHandlers.set(message.id, () => stream.cancel());
        }
        else if (type === GrpcCallType.serverStream) {
            const stream = service.client.serverStreaming(url, request, metadata, descriptor);
            stream.on('error', (error) => {
                this.requestCancelHandlers.delete(message.id);
                respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.error, error });
            });
            stream.on('status', (status) => respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.status, status }));
            stream.on('data', (response) => respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.data, response: response.toObject() }));
            stream.on('end', () => {
                this.requestCancelHandlers.delete(message.id);
                respond({ responseType: GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.end });
            });
            this.requestCancelHandlers.set(message.id, () => stream.cancel());
        }
        else {
            throw new Error('Client / Bidi stream is not supported');
        }
    }
    cancelRpc(message) {
        const cancel = this.requestCancelHandlers.get(message.id);
        if (cancel) {
            cancel();
            this.requestCancelHandlers.delete(message.id);
        }
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { GrpcWorker, GrpcWorkerApi };
//# sourceMappingURL=ngx-grpc-worker.mjs.map
