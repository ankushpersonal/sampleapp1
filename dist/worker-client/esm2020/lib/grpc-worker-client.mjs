import { Inject, Injectable, Optional } from '@angular/core';
import { GrpcDataEvent } from '@ngx-grpc/common';
import { tap } from 'rxjs/operators';
import { GRPC_WORKER_CLIENT_DEFAULT_SETTINGS } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "./grpc-worker-gateway";
/**
 * GrpcClientFactory implementation based on grpc-web running in worker
 */
export class GrpcWorkerClientFactory {
    constructor(defaultSettings, gateway) {
        this.defaultSettings = defaultSettings;
        this.gateway = gateway;
    }
    createClient(serviceId, customSettings) {
        const settings = customSettings || this.defaultSettings;
        if (!settings) {
            throw new Error(`Worker client factory: no settings provided for ${serviceId}`);
        }
        return new GrpcWorkerClient(serviceId, { ...settings }, this.gateway);
    }
}
GrpcWorkerClientFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientFactory, deps: [{ token: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, optional: true }, { token: i1.GrpcWorkerGateway }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcWorkerClientFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GRPC_WORKER_CLIENT_DEFAULT_SETTINGS]
                }] }, { type: i1.GrpcWorkerGateway }]; } });
/**
 * GrpcClient implementation based on grpc-web running in worker
 */
export class GrpcWorkerClient {
    constructor(serviceId, settings, gateway) {
        this.serviceId = serviceId;
        this.settings = settings;
        this.gateway = gateway;
        this.clientStream = () => {
            throw new Error('Client streaming not supported');
        };
        this.bidiStream = () => {
            throw new Error('Bidirectional streaming not supported');
        };
        this.gateway.configureServiceClient(this.serviceId, this.settings);
    }
    getSettings() {
        return { ...this.settings };
    }
    unary(path, req, metadata, reqclss, resclss) {
        return this.gateway
            .callUnaryFromWorker(this.serviceId, path, req.toObject(), metadata?.toObject() ?? {})
            .pipe(tap(res => {
            if (res instanceof GrpcDataEvent) {
                res.data = new resclss(res.data);
            }
        }));
    }
    serverStream(path, req, metadata, reqclss, resclss) {
        return this.gateway
            .callServerStreamFromWorker(this.serviceId, path, req.toObject(), metadata?.toObject() ?? {})
            .pipe(tap(res => {
            if (res instanceof GrpcDataEvent) {
                res.data = new resclss(res.data);
            }
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy13b3JrZXItY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvd29ya2VyLWNsaWVudC9zcmMvbGliL2dycGMtd29ya2VyLWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFpQyxhQUFhLEVBQTBELE1BQU0sa0JBQWtCLENBQUM7QUFFeEksT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7O0FBWS9EOztHQUVHO0FBRUgsTUFBTSxPQUFPLHVCQUF1QjtJQUVsQyxZQUNtRSxlQUF5QyxFQUNsRyxPQUEwQjtRQUQrQixvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7UUFDbEcsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7SUFDaEMsQ0FBQztJQUVMLFlBQVksQ0FBQyxTQUFpQixFQUFFLGNBQXdDO1FBQ3RFLE1BQU0sUUFBUSxHQUFHLGNBQWMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDO1FBRXhELElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsT0FBTyxJQUFJLGdCQUFnQixDQUN6QixTQUFTLEVBQ1QsRUFBRSxHQUFHLFFBQVEsRUFBRSxFQUNmLElBQUksQ0FBQyxPQUFPLENBQ2IsQ0FBQztJQUNKLENBQUM7O29IQW5CVSx1QkFBdUIsa0JBR1osbUNBQW1DO3dIQUg5Qyx1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFEbkMsVUFBVTs7MEJBSU4sUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxtQ0FBbUM7O0FBb0IzRDs7R0FFRztBQUNILE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0IsWUFDVSxTQUFpQixFQUNqQixRQUFrQyxFQUNsQyxPQUEwQjtRQUYxQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBNkNwQyxpQkFBWSxHQUFHLEdBQUcsRUFBRTtZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDO1FBRUYsZUFBVSxHQUFHLEdBQUcsRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDO1FBakRBLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUssQ0FDSCxJQUFZLEVBQ1osR0FBTSxFQUNOLFFBQXNCLEVBQ3RCLE9BQTRCLEVBQzVCLE9BQTRCO1FBRTVCLE9BQU8sSUFBSSxDQUFDLE9BQU87YUFDaEIsbUJBQW1CLENBQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDM0YsSUFBSSxDQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNSLElBQUksR0FBRyxZQUFZLGFBQWEsRUFBRTtnQkFDaEMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBVyxDQUFDLENBQUM7YUFDekM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVELFlBQVksQ0FDVixJQUFZLEVBQ1osR0FBTSxFQUNOLFFBQXNCLEVBQ3RCLE9BQTRCLEVBQzVCLE9BQTRCO1FBRTVCLE9BQU8sSUFBSSxDQUFDLE9BQU87YUFDaEIsMEJBQTBCLENBQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDbEcsSUFBSSxDQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNSLElBQUksR0FBRyxZQUFZLGFBQWEsRUFBRTtnQkFDaEMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBVyxDQUFDLENBQUM7YUFDekM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztDQVVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JwY0NsaWVudCwgR3JwY0NsaWVudEZhY3RvcnksIEdycGNEYXRhRXZlbnQsIEdycGNFdmVudCwgR3JwY01lc3NhZ2UsIEdycGNNZXNzYWdlQ2xhc3MsIEdycGNNZXRhZGF0YSB9IGZyb20gJ0BuZ3gtZ3JwYy9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR3JwY1dvcmtlckdhdGV3YXkgfSBmcm9tICcuL2dycGMtd29ya2VyLWdhdGV3YXknO1xuaW1wb3J0IHsgR1JQQ19XT1JLRVJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MgfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKlxuICogU2V0dGluZ3MgZm9yIHRoZSBjaG9zZW4gaW1wbGVtZW50YXRpb24gb2YgR3JwY0NsaWVudFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdycGNXb3JrZXJDbGllbnRTZXR0aW5ncyB7XG4gIGhvc3Q6IHN0cmluZztcbiAgZm9ybWF0Pzogc3RyaW5nO1xuICBzdXBwcmVzc0NvcnNQcmVmbGlnaHQ/OiBib29sZWFuO1xuICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEdycGNDbGllbnRGYWN0b3J5IGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIGdycGMtd2ViIHJ1bm5pbmcgaW4gd29ya2VyXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcnBjV29ya2VyQ2xpZW50RmFjdG9yeSBpbXBsZW1lbnRzIEdycGNDbGllbnRGYWN0b3J5PEdycGNXb3JrZXJDbGllbnRTZXR0aW5ncz4ge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoR1JQQ19XT1JLRVJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MpIHByaXZhdGUgZGVmYXVsdFNldHRpbmdzOiBHcnBjV29ya2VyQ2xpZW50U2V0dGluZ3MsXG4gICAgcHJpdmF0ZSBnYXRld2F5OiBHcnBjV29ya2VyR2F0ZXdheSxcbiAgKSB7IH1cblxuICBjcmVhdGVDbGllbnQoc2VydmljZUlkOiBzdHJpbmcsIGN1c3RvbVNldHRpbmdzOiBHcnBjV29ya2VyQ2xpZW50U2V0dGluZ3MpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGN1c3RvbVNldHRpbmdzIHx8IHRoaXMuZGVmYXVsdFNldHRpbmdzO1xuXG4gICAgaWYgKCFzZXR0aW5ncykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBXb3JrZXIgY2xpZW50IGZhY3Rvcnk6IG5vIHNldHRpbmdzIHByb3ZpZGVkIGZvciAke3NlcnZpY2VJZH1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEdycGNXb3JrZXJDbGllbnQoXG4gICAgICBzZXJ2aWNlSWQsXG4gICAgICB7IC4uLnNldHRpbmdzIH0sXG4gICAgICB0aGlzLmdhdGV3YXksXG4gICAgKTtcbiAgfVxuXG59XG5cbi8qKlxuICogR3JwY0NsaWVudCBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBncnBjLXdlYiBydW5uaW5nIGluIHdvcmtlclxuICovXG5leHBvcnQgY2xhc3MgR3JwY1dvcmtlckNsaWVudCBpbXBsZW1lbnRzIEdycGNDbGllbnQ8R3JwY1dvcmtlckNsaWVudFNldHRpbmdzPiB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZXJ2aWNlSWQ6IHN0cmluZyxcbiAgICBwcml2YXRlIHNldHRpbmdzOiBHcnBjV29ya2VyQ2xpZW50U2V0dGluZ3MsXG4gICAgcHJpdmF0ZSBnYXRld2F5OiBHcnBjV29ya2VyR2F0ZXdheSxcbiAgKSB7XG4gICAgdGhpcy5nYXRld2F5LmNvbmZpZ3VyZVNlcnZpY2VDbGllbnQodGhpcy5zZXJ2aWNlSWQsIHRoaXMuc2V0dGluZ3MpO1xuICB9XG5cbiAgZ2V0U2V0dGluZ3MoKTogR3JwY1dvcmtlckNsaWVudFNldHRpbmdzIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnNldHRpbmdzIH07XG4gIH1cblxuICB1bmFyeTxRIGV4dGVuZHMgR3JwY01lc3NhZ2UsIFMgZXh0ZW5kcyBHcnBjTWVzc2FnZT4oXG4gICAgcGF0aDogc3RyaW5nLFxuICAgIHJlcTogUSxcbiAgICBtZXRhZGF0YTogR3JwY01ldGFkYXRhLFxuICAgIHJlcWNsc3M6IEdycGNNZXNzYWdlQ2xhc3M8UT4sXG4gICAgcmVzY2xzczogR3JwY01lc3NhZ2VDbGFzczxTPixcbiAgKTogT2JzZXJ2YWJsZTxHcnBjRXZlbnQ8Uz4+IHtcbiAgICByZXR1cm4gdGhpcy5nYXRld2F5XG4gICAgICAuY2FsbFVuYXJ5RnJvbVdvcmtlcjxRLCBTPih0aGlzLnNlcnZpY2VJZCwgcGF0aCwgcmVxLnRvT2JqZWN0KCksIG1ldGFkYXRhPy50b09iamVjdCgpID8/IHt9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBHcnBjRGF0YUV2ZW50KSB7XG4gICAgICAgICAgICByZXMuZGF0YSA9IG5ldyByZXNjbHNzKHJlcy5kYXRhIGFzIGFueSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICk7XG4gIH1cblxuICBzZXJ2ZXJTdHJlYW08USBleHRlbmRzIEdycGNNZXNzYWdlLCBTIGV4dGVuZHMgR3JwY01lc3NhZ2U+KFxuICAgIHBhdGg6IHN0cmluZyxcbiAgICByZXE6IFEsXG4gICAgbWV0YWRhdGE6IEdycGNNZXRhZGF0YSxcbiAgICByZXFjbHNzOiBHcnBjTWVzc2FnZUNsYXNzPFE+LFxuICAgIHJlc2Nsc3M6IEdycGNNZXNzYWdlQ2xhc3M8Uz4sXG4gICk6IE9ic2VydmFibGU8R3JwY0V2ZW50PFM+PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2F0ZXdheVxuICAgICAgLmNhbGxTZXJ2ZXJTdHJlYW1Gcm9tV29ya2VyPFEsIFM+KHRoaXMuc2VydmljZUlkLCBwYXRoLCByZXEudG9PYmplY3QoKSwgbWV0YWRhdGE/LnRvT2JqZWN0KCkgPz8ge30pXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcyBpbnN0YW5jZW9mIEdycGNEYXRhRXZlbnQpIHtcbiAgICAgICAgICAgIHJlcy5kYXRhID0gbmV3IHJlc2Nsc3MocmVzLmRhdGEgYXMgYW55KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgfVxuXG4gIGNsaWVudFN0cmVhbSA9ICgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NsaWVudCBzdHJlYW1pbmcgbm90IHN1cHBvcnRlZCcpO1xuICB9O1xuXG4gIGJpZGlTdHJlYW0gPSAoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCaWRpcmVjdGlvbmFsIHN0cmVhbWluZyBub3Qgc3VwcG9ydGVkJyk7XG4gIH07XG5cbn1cbiJdfQ==