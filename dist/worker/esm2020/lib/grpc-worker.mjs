import { GrpcCallType } from '@ngx-grpc/common';
import { GrpcWebClientBase, MethodDescriptor } from 'grpc-web';
import { GrpcWorkerApi } from './api';
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
export class GrpcWorker {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy13b3JrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy93b3JrZXIvc3JjL2xpYi9ncnBjLXdvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFlLE1BQU0sa0JBQWtCLENBQUM7QUFDN0QsT0FBTyxFQUFZLGlCQUFpQixFQUFFLGdCQUFnQixFQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFJdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxPQUFPLFVBQVU7SUFBdkI7UUFFVSxnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFzQyxDQUFDO1FBRTVELFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFHckIsQ0FBQztRQUVHLDBCQUFxQixHQUFHLElBQUksR0FBRyxFQUFzQixDQUFDO0lBdUhoRSxDQUFDO0lBckhDOzs7OztPQUtHO0lBQ0gsUUFBUSxDQUFDLEdBQUcsSUFBa0M7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQXFFLEVBQUUsRUFBRTtZQUMxRyxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pCLEtBQUssYUFBYSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQjtvQkFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBMEQsQ0FBQyxDQUFDO29CQUFDLE1BQU07Z0JBQzdKLEtBQUssYUFBYSxDQUFDLHFCQUFxQixDQUFDLFVBQVU7b0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJ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LE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFTyxTQUFTLENBQUMsT0FBaUQ7UUFDakUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFMUQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLEVBQUUsQ0FBQztZQUNULElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JwY0NhbGxUeXBlLCBHcnBjTWVzc2FnZSB9IGZyb20gJ0BuZ3gtZ3JwYy9jb21tb24nO1xuaW1wb3J0IHsgUnBjRXJyb3IsIEdycGNXZWJDbGllbnRCYXNlLCBNZXRob2REZXNjcmlwdG9yLCBTdGF0dXMgfSBmcm9tICdncnBjLXdlYic7XG5pbXBvcnQgeyBHcnBjV29ya2VyQXBpIH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgR3JwY1dvcmtlckNsaWVudFNldHRpbmdzIH0gZnJvbSAnLi9jbGllbnQtc2V0dGluZ3MnO1xuaW1wb3J0IHsgR3JwY1dvcmtlclNlcnZpY2VDbGllbnREZWYgfSBmcm9tICcuL3NlcnZpY2UtY2xpZW50LWRlZic7XG5cbi8qKlxuICogQSB3b3JrZXItc2lkZSBzZXJ2aWNlIG9mIHdvcmtlciBjbGllbnQgaW1wbGVtZW50YXRpb24gYmFzZWQgb24gZ3JwYy13ZWJcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogLy8vIDxyZWZlcmVuY2UgbGliPVwid2Vid29ya2VyXCIgLz5cbiAqXG4gKiBpbXBvcnQgeyBHcnBjV29ya2VyIH0gZnJvbSAnQG5neC1ncnBjL3dvcmtlcic7XG4gKiBpbXBvcnQgeyBHcnBjV29ya2VyRWNob1NlcnZpY2VDbGllbnREZWYgfSBmcm9tICcuLi9wcm90by9lY2hvLnBid3NjJztcbiAqXG4gKiBjb25zdCB3b3JrZXIgPSBuZXcgR3JwY1dvcmtlcigpO1xuICpcbiAqIHdvcmtlci5yZWdpc3RlcihcbiAqICAgLy8gcmVnaXN0ZXIgaGVyZSBhbGwgdGhlIHNlcnZpY2UgY2xpZW50cyBkZWZpbml0aW9uc1xuICogICBHcnBjV29ya2VyRWNob1NlcnZpY2VDbGllbnREZWYsXG4gKiApO1xuICpcbiAqIHdvcmtlci5zdGFydCgpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBHcnBjV29ya2VyIHtcblxuICBwcml2YXRlIGRlZmluaXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIEdycGNXb3JrZXJTZXJ2aWNlQ2xpZW50RGVmPigpO1xuXG4gIHByaXZhdGUgY2xpZW50cyA9IG5ldyBNYXA8c3RyaW5nLCB7XG4gICAgc2V0dGluZ3M6IEdycGNXb3JrZXJDbGllbnRTZXR0aW5ncztcbiAgICBjbGllbnQ6IEdycGNXZWJDbGllbnRCYXNlO1xuICB9PigpO1xuXG4gIHByaXZhdGUgcmVxdWVzdENhbmNlbEhhbmRsZXJzID0gbmV3IE1hcDxudW1iZXIsICgpID0+IHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIG9uZSBvciBtb3JlIHNlcnZpY2UgY2xpZW50cy5cbiAgICogQWRkIGhlcmUgb25seSB0aGUgc2VydmljZXMgeW91IHVzZSwgb3RoZXJ3aXNlIHRoZSB3b3JrZXIgc2l6ZSBjYW4gZXhwbG9kZS5cbiAgICpcbiAgICogQHBhcmFtIGRlZnMgZ2VuZXJhdGVkIHNlcnZpY2UgY2xpZW50IGRlZmluaXRpb25zIHRvIHJlZ2lzdGVyXG4gICAqL1xuICByZWdpc3RlciguLi5kZWZzOiBHcnBjV29ya2VyU2VydmljZUNsaWVudERlZltdKSB7XG4gICAgZGVmcy5mb3JFYWNoKGRlZiA9PiB0aGlzLmRlZmluaXRpb25zLnNldChkZWYuc2VydmljZUlkLCBkZWYpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgc2VydmljZVxuICAgKi9cbiAgc3RhcnQoKSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsICh7IGRhdGEgfTogR3JwY1dvcmtlckFwaS5Xb3JrZXJNZXNzYWdlRXZlbnQ8R3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZT4pID0+IHtcbiAgICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XG4gICAgICAgIGNhc2UgR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVR5cGUuc2VydmljZUNsaWVudENvbmZpZzogdGhpcy5jb25maWd1cmVTZXJ2aWNlQ2xpZW50KGRhdGEgYXMgR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVNlcnZpY2VDbGllbnRDb25maWcpOyBicmVhaztcbiAgICAgICAgY2FzZSBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlVHlwZS5ycGNSZXF1ZXN0OiB0aGlzLmhhbmRsZVJwYyhkYXRhIGFzIEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VSUENSZXF1ZXN0PGFueT4pOyBicmVhaztcbiAgICAgICAgY2FzZSBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlVHlwZS5ycGNDYW5jZWw6IHRoaXMuY2FuY2VsUnBjKGRhdGEgYXMgR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVJQQ0NhbmNlbCk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gaW5jb21pbmcgbWVzc2FnZSB0eXBlICR7ZGF0YS50eXBlfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVTZXJ2aWNlQ2xpZW50KG1lc3NhZ2U6IEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VTZXJ2aWNlQ2xpZW50Q29uZmlnKSB7XG4gICAgY29uc3QgZGVmID0gdGhpcy5kZWZpbml0aW9ucy5nZXQobWVzc2FnZS5zZXJ2aWNlSWQpO1xuXG4gICAgaWYgKCFkZWYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmljZSBjbGllbnQgJHttZXNzYWdlLnNlcnZpY2VJZH0gaXMgbm90IHJlZ2lzdGVyZWQgaW4gV29ya2VyYCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbGllbnRzLnNldChtZXNzYWdlLnNlcnZpY2VJZCwgeyBzZXR0aW5nczogbWVzc2FnZS5zZXR0aW5ncywgY2xpZW50OiBuZXcgR3JwY1dlYkNsaWVudEJhc2UobWVzc2FnZS5zZXR0aW5ncykgfSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVJwYyhtZXNzYWdlOiBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlUlBDUmVxdWVzdDxhbnk+KSB7XG4gICAgY29uc3QgZGVmID0gdGhpcy5kZWZpbml0aW9ucy5nZXQobWVzc2FnZS5zZXJ2aWNlSWQpO1xuXG4gICAgaWYgKCFkZWYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmljZSBjbGllbnQgJHttZXNzYWdlLnNlcnZpY2VJZH0gaXMgbm90IHJlZ2lzdGVyZWQgaW4gV29ya2VyYCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VydmljZSA9IHRoaXMuY2xpZW50cy5nZXQobWVzc2FnZS5zZXJ2aWNlSWQpO1xuXG4gICAgaWYgKCFzZXJ2aWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlcnZpY2UgY2xpZW50ICR7bWVzc2FnZS5zZXJ2aWNlSWR9IGlzIG5vdCBjb25maWd1cmVkIGluIFdvcmtlcmApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbmQgPSAobXNnOiBhbnkpID0+ICgocG9zdE1lc3NhZ2UgYXMgYW55KSh7XG4gICAgICB0eXBlOiBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlVHlwZS5ycGNSZXNwb25zZSxcbiAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgLi4ubXNnLFxuICAgIH0pKTtcblxuICAgIGNvbnN0IHsgdHlwZSwgcmVxY2xzcywgcmVzY2xzcyB9ID0gZGVmLm1ldGhvZHNbbWVzc2FnZS5wYXRoXTtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IHJlcWNsc3MobWVzc2FnZS5yZXF1ZXN0KTtcbiAgICBjb25zdCB1cmwgPSBzZXJ2aWNlLnNldHRpbmdzLmhvc3QgKyBtZXNzYWdlLnBhdGg7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBtZXNzYWdlLm1ldGFkYXRhIHx8IHt9O1xuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBuZXcgTWV0aG9kRGVzY3JpcHRvcihcbiAgICAgIG1lc3NhZ2UucGF0aCxcbiAgICAgIHR5cGUgPT09IEdycGNDYWxsVHlwZS51bmFyeSA/ICd1bmFyeScgOiAnc2VydmVyX3N0cmVhbWluZycsXG4gICAgICByZXFjbHNzLFxuICAgICAgcmVzY2xzcyxcbiAgICAgIChyZXE6IEdycGNNZXNzYWdlKSA9PiByZXEuc2VyaWFsaXplQmluYXJ5KCksXG4gICAgICByZXNjbHNzLmRlc2VyaWFsaXplQmluYXJ5LFxuICAgICk7XG5cbiAgICBpZiAodHlwZSA9PT0gR3JwY0NhbGxUeXBlLnVuYXJ5KSB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBzZXJ2aWNlLmNsaWVudC5ycGNDYWxsKHVybCwgcmVxdWVzdCwgbWV0YWRhdGEsIGRlc2NyaXB0b3IsIChlcnJvciwgcmVzcG9uc2U6IEdycGNNZXNzYWdlKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHRoaXMucmVxdWVzdENhbmNlbEhhbmRsZXJzLmRlbGV0ZShtZXNzYWdlLmlkKTtcbiAgICAgICAgICByZXNwb25kKHsgcmVzcG9uc2VUeXBlOiBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlUlBDUmVzcG9uc2VUeXBlLmVycm9yLCBlcnJvciB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNwb25kKHsgcmVzcG9uc2VUeXBlOiBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlUlBDUmVzcG9uc2VUeXBlLmRhdGEsIHJlc3BvbnNlOiByZXNwb25zZS50b09iamVjdCgpIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gdGFrZSBvbmx5IHN0YXR1cyAwIGJlY2F1c2UgdW5hcnkgZXJyb3IgYWxyZWFkeSBpbmNsdWRlcyBub24temVybyBzdGF0dXNlc1xuICAgICAgc3RyZWFtLm9uKCdzdGF0dXMnLCAoc3RhdHVzOiBTdGF0dXMpID0+IHN0YXR1cy5jb2RlID09PSAwID8gcmVzcG9uZCh7IHJlc3BvbnNlVHlwZTogR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVJQQ1Jlc3BvbnNlVHlwZS5zdGF0dXMsIHN0YXR1cyB9KSA6IG51bGwpO1xuXG4gICAgICBzdHJlYW0ub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q2FuY2VsSGFuZGxlcnMuZGVsZXRlKG1lc3NhZ2UuaWQpO1xuICAgICAgICByZXNwb25kKHsgcmVzcG9uc2VUeXBlOiBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlUlBDUmVzcG9uc2VUeXBlLmVuZCB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlcXVlc3RDYW5jZWxIYW5kbGVycy5zZXQobWVzc2FnZS5pZCwgKCkgPT4gc3RyZWFtLmNhbmNlbCgpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEdycGNDYWxsVHlwZS5zZXJ2ZXJTdHJlYW0pIHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IHNlcnZpY2UuY2xpZW50LnNlcnZlclN0cmVhbWluZyh1cmwsIHJlcXVlc3QsIG1ldGFkYXRhLCBkZXNjcmlwdG9yKTtcblxuICAgICAgc3RyZWFtLm9uKCdlcnJvcicsIChlcnJvcjogUnBjRXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q2FuY2VsSGFuZGxlcnMuZGVsZXRlKG1lc3NhZ2UuaWQpO1xuICAgICAgICByZXNwb25kKHsgcmVzcG9uc2VUeXBlOiBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlUlBDUmVzcG9uc2VUeXBlLmVycm9yLCBlcnJvciB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBzdHJlYW0ub24oJ3N0YXR1cycsIChzdGF0dXM6IFN0YXR1cykgPT4gcmVzcG9uZCh7IHJlc3BvbnNlVHlwZTogR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVJQQ1Jlc3BvbnNlVHlwZS5zdGF0dXMsIHN0YXR1cyB9KSk7XG5cbiAgICAgIHN0cmVhbS5vbignZGF0YScsIChyZXNwb25zZTogR3JwY01lc3NhZ2UpID0+IHJlc3BvbmQoeyByZXNwb25zZVR5cGU6IEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VSUENSZXNwb25zZVR5cGUuZGF0YSwgcmVzcG9uc2U6IHJlc3BvbnNlLnRvT2JqZWN0KCkgfSkpO1xuXG4gICAgICBzdHJlYW0ub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q2FuY2VsSGFuZGxlcnMuZGVsZXRlKG1lc3NhZ2UuaWQpO1xuICAgICAgICByZXNwb25kKHsgcmVzcG9uc2VUeXBlOiBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlUlBDUmVzcG9uc2VUeXBlLmVuZCB9KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlcXVlc3RDYW5jZWxIYW5kbGVycy5zZXQobWVzc2FnZS5pZCwgKCkgPT4gc3RyZWFtLmNhbmNlbCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDbGllbnQgLyBCaWRpIHN0cmVhbSBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYW5jZWxScGMobWVzc2FnZTogR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVJQQ0NhbmNlbCkge1xuICAgIGNvbnN0IGNhbmNlbCA9IHRoaXMucmVxdWVzdENhbmNlbEhhbmRsZXJzLmdldChtZXNzYWdlLmlkKTtcblxuICAgIGlmIChjYW5jZWwpIHtcbiAgICAgIGNhbmNlbCgpO1xuICAgICAgdGhpcy5yZXF1ZXN0Q2FuY2VsSGFuZGxlcnMuZGVsZXRlKG1lc3NhZ2UuaWQpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=