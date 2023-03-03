import { Inject, Injectable } from '@angular/core';
import { GrpcDataEvent, GrpcMetadata, GrpcStatusEvent } from '@ngx-grpc/common';
import { GrpcWorkerApi } from '@ngx-grpc/worker';
import { Observable } from 'rxjs';
import { GRPC_WORKER } from './tokens';
import * as i0 from "@angular/core";
/** @dynamic */
export class GrpcWorkerGateway {
    constructor(worker) {
        this.worker = worker;
        this.lastId = 0;
        this.connections = new Map();
        worker.onmessage = (event) => {
            const data = event.data;
            const connection = this.connections.get(data.id);
            if (connection && data.type === GrpcWorkerApi.GrpcWorkerMessageType.rpcResponse) {
                switch (data.responseType) {
                    case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.error:
                        connection.next(new GrpcStatusEvent(data.error.code, data.error.message, data.error.metadata));
                        connection.complete();
                        this.connections.delete(data.id);
                        break;
                    case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.status:
                        connection.next(new GrpcStatusEvent(data.status.code, data.status.details, new GrpcMetadata(data.status.metadata)));
                        break;
                    case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.data:
                        connection.next(new GrpcDataEvent(data.response));
                        break;
                    case GrpcWorkerApi.GrpcWorkerMessageRPCResponseType.end:
                        connection.complete();
                        this.connections.delete(data.id);
                        break;
                }
            }
        };
    }
    configureServiceClient(serviceId, settings) {
        this.worker.postMessage({ type: GrpcWorkerApi.GrpcWorkerMessageType.serviceClientConfig, serviceId, settings });
    }
    callUnaryFromWorker(serviceId, path, request, metadata) {
        return new Observable(observer => {
            const id = this.createRequestId();
            this.connections.set(id, observer);
            this.worker.postMessage({
                type: GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest,
                id,
                serviceId,
                path,
                request,
                metadata,
            });
            return () => this.closeConnection(id);
        });
    }
    callServerStreamFromWorker(serviceId, path, request, metadata) {
        return new Observable(observer => {
            const id = this.createRequestId();
            this.connections.set(id, observer);
            this.worker.postMessage({
                type: GrpcWorkerApi.GrpcWorkerMessageType.rpcRequest,
                id,
                serviceId,
                path,
                request,
                metadata,
            });
            return () => this.closeConnection(id);
        });
    }
    closeConnection(id) {
        this.worker.postMessage({
            type: GrpcWorkerApi.GrpcWorkerMessageType.rpcCancel,
            id,
        });
        this.connections.delete(id);
    }
    createRequestId() {
        return this.lastId++;
    }
}
GrpcWorkerGateway.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerGateway, deps: [{ token: GRPC_WORKER }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcWorkerGateway.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerGateway });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerGateway, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Worker, decorators: [{
                    type: Inject,
                    args: [GRPC_WORKER]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy13b3JrZXItZ2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL3dvcmtlci1jbGllbnQvc3JjL2xpYi9ncnBjLXdvcmtlci1nYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQTBCLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUU1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUV2QyxlQUFlO0FBRWYsTUFBTSxPQUFPLGlCQUFpQjtJQU01QixZQUMrQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUxyQyxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRVgsZ0JBQVcsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUtyRCxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBbUIsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUF1RCxDQUFDO1lBQzNFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVqRCxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUU7Z0JBQy9FLFFBQVEsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDekIsS0FBSyxhQUFhLENBQUMsZ0NBQWdDLENBQUMsS0FBSzt3QkFDdkQsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENB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QUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdEIsSUFBSSxFQUFFLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTO1lBQ25ELEVBQUU7U0FDeUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxlQUFlO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7OzhHQXhGVSxpQkFBaUIsa0JBT2xCLFdBQVc7a0hBUFYsaUJBQWlCOzJGQUFqQixpQkFBaUI7a0JBRDdCLFVBQVU7MERBUThCLE1BQU07MEJBQTFDLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JwY0RhdGFFdmVudCwgR3JwY0V2ZW50LCBHcnBjTWVzc2FnZSwgR3JwY01ldGFkYXRhLCBHcnBjU3RhdHVzRXZlbnQgfSBmcm9tICdAbmd4LWdycGMvY29tbW9uJztcbmltcG9ydCB7IEdycGNXb3JrZXJBcGkgfSBmcm9tICdAbmd4LWdycGMvd29ya2VyJztcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnZ3JwYy13ZWInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEdycGNXb3JrZXJDbGllbnRTZXR0aW5ncyB9IGZyb20gJy4vZ3JwYy13b3JrZXItY2xpZW50JztcbmltcG9ydCB7IEdSUENfV09SS0VSIH0gZnJvbSAnLi90b2tlbnMnO1xuXG4vKiogQGR5bmFtaWMgKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcnBjV29ya2VyR2F0ZXdheSB7XG5cbiAgcHJpdmF0ZSBsYXN0SWQgPSAwO1xuXG4gIHByaXZhdGUgY29ubmVjdGlvbnMgPSBuZXcgTWFwPG51bWJlciwgT2JzZXJ2ZXI8YW55Pj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEdSUENfV09SS0VSKSBwcml2YXRlIHdvcmtlcjogV29ya2VyLFxuICApIHtcbiAgICB3b3JrZXIub25tZXNzYWdlID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhIGFzIEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VSUENSZXNwb25zZTxhbnk+O1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvbnMuZ2V0KGRhdGEuaWQpO1xuXG4gICAgICBpZiAoY29ubmVjdGlvbiAmJiBkYXRhLnR5cGUgPT09IEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VUeXBlLnJwY1Jlc3BvbnNlKSB7XG4gICAgICAgIHN3aXRjaCAoZGF0YS5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICBjYXNlIEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VSUENSZXNwb25zZVR5cGUuZXJyb3I6XG4gICAgICAgICAgICBjb25uZWN0aW9uLm5leHQobmV3IEdycGNTdGF0dXNFdmVudChkYXRhLmVycm9yLmNvZGUsIGRhdGEuZXJyb3IubWVzc2FnZSwgKGRhdGEuZXJyb3IgYXMgYW55KS5tZXRhZGF0YSkpO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9ucy5kZWxldGUoZGF0YS5pZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VSUENSZXNwb25zZVR5cGUuc3RhdHVzOlxuICAgICAgICAgICAgY29ubmVjdGlvbi5uZXh0KG5ldyBHcnBjU3RhdHVzRXZlbnQoZGF0YS5zdGF0dXMuY29kZSwgZGF0YS5zdGF0dXMuZGV0YWlscywgbmV3IEdycGNNZXRhZGF0YShkYXRhLnN0YXR1cy5tZXRhZGF0YSkpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVJQQ1Jlc3BvbnNlVHlwZS5kYXRhOlxuICAgICAgICAgICAgY29ubmVjdGlvbi5uZXh0KG5ldyBHcnBjRGF0YUV2ZW50KGRhdGEucmVzcG9uc2UpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVJQQ1Jlc3BvbnNlVHlwZS5lbmQ6XG4gICAgICAgICAgICBjb25uZWN0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25zLmRlbGV0ZShkYXRhLmlkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbmZpZ3VyZVNlcnZpY2VDbGllbnQoc2VydmljZUlkOiBzdHJpbmcsIHNldHRpbmdzOiBHcnBjV29ya2VyQ2xpZW50U2V0dGluZ3MpIHtcbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7IHR5cGU6IEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VUeXBlLnNlcnZpY2VDbGllbnRDb25maWcsIHNlcnZpY2VJZCwgc2V0dGluZ3MgfSBhcyBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlU2VydmljZUNsaWVudENvbmZpZyk7XG4gIH1cblxuICBjYWxsVW5hcnlGcm9tV29ya2VyPFEgZXh0ZW5kcyBHcnBjTWVzc2FnZSwgUyBleHRlbmRzIEdycGNNZXNzYWdlPihzZXJ2aWNlSWQ6IHN0cmluZywgcGF0aDogc3RyaW5nLCByZXF1ZXN0OiBRLCBtZXRhZGF0YTogTWV0YWRhdGEpOiBPYnNlcnZhYmxlPEdycGNFdmVudDxTPj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuY3JlYXRlUmVxdWVzdElkKCk7XG5cbiAgICAgIHRoaXMuY29ubmVjdGlvbnMuc2V0KGlkLCBvYnNlcnZlcik7XG5cbiAgICAgIHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVR5cGUucnBjUmVxdWVzdCxcbiAgICAgICAgaWQsXG4gICAgICAgIHNlcnZpY2VJZCxcbiAgICAgICAgcGF0aCxcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICB9IGFzIEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VSUENSZXF1ZXN0PFE+KTtcblxuICAgICAgcmV0dXJuICgpID0+IHRoaXMuY2xvc2VDb25uZWN0aW9uKGlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGxTZXJ2ZXJTdHJlYW1Gcm9tV29ya2VyPFEgZXh0ZW5kcyBHcnBjTWVzc2FnZSwgUyBleHRlbmRzIEdycGNNZXNzYWdlPihzZXJ2aWNlSWQ6IHN0cmluZywgcGF0aDogc3RyaW5nLCByZXF1ZXN0OiBRLCBtZXRhZGF0YTogTWV0YWRhdGEpOiBPYnNlcnZhYmxlPEdycGNFdmVudDxTPj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuY3JlYXRlUmVxdWVzdElkKCk7XG5cbiAgICAgIHRoaXMuY29ubmVjdGlvbnMuc2V0KGlkLCBvYnNlcnZlcik7XG5cbiAgICAgIHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVR5cGUucnBjUmVxdWVzdCxcbiAgICAgICAgaWQsXG4gICAgICAgIHNlcnZpY2VJZCxcbiAgICAgICAgcGF0aCxcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgbWV0YWRhdGEsXG4gICAgICB9IGFzIEdycGNXb3JrZXJBcGkuR3JwY1dvcmtlck1lc3NhZ2VSUENSZXF1ZXN0PFE+KTtcblxuICAgICAgcmV0dXJuICgpID0+IHRoaXMuY2xvc2VDb25uZWN0aW9uKGlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlQ29ubmVjdGlvbihpZDogbnVtYmVyKSB7XG4gICAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogR3JwY1dvcmtlckFwaS5HcnBjV29ya2VyTWVzc2FnZVR5cGUucnBjQ2FuY2VsLFxuICAgICAgaWQsXG4gICAgfSBhcyBHcnBjV29ya2VyQXBpLkdycGNXb3JrZXJNZXNzYWdlUlBDQ2FuY2VsKTtcblxuICAgIHRoaXMuY29ubmVjdGlvbnMuZGVsZXRlKGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmVxdWVzdElkKCkge1xuICAgIHJldHVybiB0aGlzLmxhc3RJZCsrO1xuICB9XG5cbn1cbiJdfQ==