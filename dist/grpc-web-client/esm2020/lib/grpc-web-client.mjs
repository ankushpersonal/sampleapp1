import { Inject, Injectable, Optional } from '@angular/core';
import { GrpcDataEvent, GrpcMetadata, GrpcStatusEvent } from '@ngx-grpc/common';
import { GrpcWebClientBase, MethodDescriptor } from 'grpc-web';
import { Observable } from 'rxjs';
import { GRPC_WEB_CLIENT_DEFAULT_SETTINGS } from './tokens';
import * as i0 from "@angular/core";
/**
 * GrpcClientFactory implementation based on grpc-web
 */
export class GrpcWebClientFactory {
    constructor(defaultSettings) {
        this.defaultSettings = defaultSettings;
    }
    createClient(serviceId, customSettings) {
        const settings = customSettings || this.defaultSettings;
        if (!settings) {
            throw new Error(`grpc-web client factory: no settings provided for ${serviceId}`);
        }
        return new GrpcWebClient({ ...settings });
    }
}
GrpcWebClientFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientFactory, deps: [{ token: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcWebClientFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GRPC_WEB_CLIENT_DEFAULT_SETTINGS]
                }] }]; } });
/**
 * GrpcClient implementation based on grpc-web
 */
export class GrpcWebClient {
    constructor(settings) {
        this.settings = settings;
        this.clientStream = () => {
            throw new Error('Client streaming not supported');
        };
        this.bidiStream = () => {
            throw new Error('Bidirectional streaming not supported');
        };
        this.client = new GrpcWebClientBase(this.settings);
    }
    getSettings() {
        return { ...this.settings };
    }
    unary(path, req, metadata, reqclss, resclss) {
        const descriptor = new MethodDescriptor(path, 'unary', reqclss, resclss, (request) => request.serializeBinary(), resclss.deserializeBinary);
        return new Observable(obs => {
            const stream = this.client.rpcCall(this.settings.host + path, req, metadata?.toObject() ?? {}, descriptor, (error, data) => {
                if (error) {
                    obs.next(new GrpcStatusEvent(error.code, error.message, new GrpcMetadata(error.metadata)));
                    obs.complete();
                }
                else {
                    obs.next(new GrpcDataEvent(data));
                }
            });
            // take only status 0 because unary error already includes non-zero statuses
            stream.on('status', status => status.code === 0 ? obs.next(new GrpcStatusEvent(status.code, status.details, new GrpcMetadata(status.metadata))) : null);
            stream.on('end', () => obs.complete());
            return () => stream.cancel();
        });
    }
    serverStream(path, req, metadata, reqclss, resclss) {
        const descriptor = new MethodDescriptor(path, 'server_streaming', reqclss, resclss, (request) => request.serializeBinary(), resclss.deserializeBinary);
        return new Observable(obs => {
            const stream = this.client.serverStreaming(this.settings.host + path, req, metadata?.toObject() ?? {}, descriptor);
            stream.on('status', status => obs.next(new GrpcStatusEvent(status.code, status.details, new GrpcMetadata(status.metadata))));
            stream.on('error', error => {
                obs.next(new GrpcStatusEvent(error.code, error.message, new GrpcMetadata(error.metadata)));
                obs.complete();
            });
            stream.on('data', data => obs.next(new GrpcDataEvent(data)));
            stream.on('end', () => obs.complete());
            return () => stream.cancel();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy13ZWItY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvZ3JwYy13ZWItY2xpZW50L3NyYy9saWIvZ3JwYy13ZWItY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQWlDLGFBQWEsRUFBNEMsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pKLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUFZNUQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBRS9CLFlBQ2dFLGVBQXNDO1FBQXRDLG9CQUFlLEdBQWYsZUFBZSxDQUF1QjtJQUNsRyxDQUFDO0lBRUwsWUFBWSxDQUFDLFNBQWlCLEVBQUUsY0FBcUM7UUFDbkUsTUFBTSxRQUFRLEdBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUM7UUFFeEQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELFNBQVMsRUFBRSxDQUFDLENBQUM7U0FDbkY7UUFFRCxPQUFPLElBQUksYUFBYSxDQUFDLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7O2lIQWRVLG9CQUFvQixrQkFHVCxnQ0FBZ0M7cUhBSDNDLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVOzswQkFJTixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGdDQUFnQzs7QUFleEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sYUFBYTtJQUl4QixZQUNVLFFBQStC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QUFlLENBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksRUFDekIsR0FBRyxFQUNILFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQzFCLFVBQVUsQ0FDWCxDQUFDO1lBRUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksWUFBWSxDQUFFLEtBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFFdkMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBVUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcnBjQ2xpZW50LCBHcnBjQ2xpZW50RmFjdG9yeSwgR3JwY0RhdGFFdmVudCwgR3JwY0V2ZW50LCBHcnBjTWVzc2FnZSwgR3JwY01lc3NhZ2VDbGFzcywgR3JwY01ldGFkYXRhLCBHcnBjU3RhdHVzRXZlbnQgfSBmcm9tICdAbmd4LWdycGMvY29tbW9uJztcbmltcG9ydCB7IEdycGNXZWJDbGllbnRCYXNlLCBNZXRob2REZXNjcmlwdG9yIH0gZnJvbSAnZ3JwYy13ZWInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgR1JQQ19XRUJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MgfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKlxuICogU2V0dGluZ3MgZm9yIHRoZSBjaG9zZW4gaW1wbGVtZW50YXRpb24gb2YgR3JwY0NsaWVudFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdycGNXZWJDbGllbnRTZXR0aW5ncyB7XG4gIGhvc3Q6IHN0cmluZztcbiAgZm9ybWF0Pzogc3RyaW5nO1xuICBzdXBwcmVzc0NvcnNQcmVmbGlnaHQ/OiBib29sZWFuO1xuICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEdycGNDbGllbnRGYWN0b3J5IGltcGxlbWVudGF0aW9uIGJhc2VkIG9uIGdycGMtd2ViXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcnBjV2ViQ2xpZW50RmFjdG9yeSBpbXBsZW1lbnRzIEdycGNDbGllbnRGYWN0b3J5PEdycGNXZWJDbGllbnRTZXR0aW5ncz4ge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoR1JQQ19XRUJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MpIHByaXZhdGUgZGVmYXVsdFNldHRpbmdzOiBHcnBjV2ViQ2xpZW50U2V0dGluZ3MsXG4gICkgeyB9XG5cbiAgY3JlYXRlQ2xpZW50KHNlcnZpY2VJZDogc3RyaW5nLCBjdXN0b21TZXR0aW5nczogR3JwY1dlYkNsaWVudFNldHRpbmdzKSB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBjdXN0b21TZXR0aW5ncyB8fCB0aGlzLmRlZmF1bHRTZXR0aW5ncztcblxuICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZ3JwYy13ZWIgY2xpZW50IGZhY3Rvcnk6IG5vIHNldHRpbmdzIHByb3ZpZGVkIGZvciAke3NlcnZpY2VJZH1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEdycGNXZWJDbGllbnQoeyAuLi5zZXR0aW5ncyB9KTtcbiAgfVxuXG59XG5cbi8qKlxuICogR3JwY0NsaWVudCBpbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBncnBjLXdlYlxuICovXG5leHBvcnQgY2xhc3MgR3JwY1dlYkNsaWVudCBpbXBsZW1lbnRzIEdycGNDbGllbnQ8R3JwY1dlYkNsaWVudFNldHRpbmdzPiB7XG5cbiAgcHJpdmF0ZSBjbGllbnQ6IEdycGNXZWJDbGllbnRCYXNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2V0dGluZ3M6IEdycGNXZWJDbGllbnRTZXR0aW5ncyxcbiAgKSB7XG4gICAgdGhpcy5jbGllbnQgPSBuZXcgR3JwY1dlYkNsaWVudEJhc2UodGhpcy5zZXR0aW5ncyk7XG4gIH1cblxuICBnZXRTZXR0aW5ncygpOiBHcnBjV2ViQ2xpZW50U2V0dGluZ3Mge1xuICAgIHJldHVybiB7IC4uLnRoaXMuc2V0dGluZ3MgfTtcbiAgfVxuXG4gIHVuYXJ5PFEgZXh0ZW5kcyBHcnBjTWVzc2FnZSwgUyBleHRlbmRzIEdycGNNZXNzYWdlPihcbiAgICBwYXRoOiBzdHJpbmcsXG4gICAgcmVxOiBRLFxuICAgIG1ldGFkYXRhOiBHcnBjTWV0YWRhdGEsXG4gICAgcmVxY2xzczogR3JwY01lc3NhZ2VDbGFzczxRPixcbiAgICByZXNjbHNzOiBHcnBjTWVzc2FnZUNsYXNzPFM+LFxuICApOiBPYnNlcnZhYmxlPEdycGNFdmVudDxTPj4ge1xuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBuZXcgTWV0aG9kRGVzY3JpcHRvcihcbiAgICAgIHBhdGgsXG4gICAgICAndW5hcnknLFxuICAgICAgcmVxY2xzcyxcbiAgICAgIHJlc2Nsc3MsXG4gICAgICAocmVxdWVzdDogUSkgPT4gcmVxdWVzdC5zZXJpYWxpemVCaW5hcnkoKSxcbiAgICAgIHJlc2Nsc3MuZGVzZXJpYWxpemVCaW5hcnksXG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnMgPT4ge1xuICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy5jbGllbnQucnBjQ2FsbChcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5ob3N0ICsgcGF0aCxcbiAgICAgICAgcmVxLFxuICAgICAgICBtZXRhZGF0YT8udG9PYmplY3QoKSA/PyB7fSxcbiAgICAgICAgZGVzY3JpcHRvcixcbiAgICAgICAgKGVycm9yLCBkYXRhKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBvYnMubmV4dChuZXcgR3JwY1N0YXR1c0V2ZW50KGVycm9yLmNvZGUsIGVycm9yLm1lc3NhZ2UsIG5ldyBHcnBjTWV0YWRhdGEoKGVycm9yIGFzIGFueSkubWV0YWRhdGEpKSk7XG4gICAgICAgICAgICBvYnMuY29tcGxldGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JzLm5leHQobmV3IEdycGNEYXRhRXZlbnQoZGF0YSBhcyBhbnkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICAvLyB0YWtlIG9ubHkgc3RhdHVzIDAgYmVjYXVzZSB1bmFyeSBlcnJvciBhbHJlYWR5IGluY2x1ZGVzIG5vbi16ZXJvIHN0YXR1c2VzXG4gICAgICBzdHJlYW0ub24oJ3N0YXR1cycsIHN0YXR1cyA9PiBzdGF0dXMuY29kZSA9PT0gMCA/IG9icy5uZXh0KG5ldyBHcnBjU3RhdHVzRXZlbnQoc3RhdHVzLmNvZGUsIHN0YXR1cy5kZXRhaWxzLCBuZXcgR3JwY01ldGFkYXRhKHN0YXR1cy5tZXRhZGF0YSkpKSA6IG51bGwpO1xuICAgICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiBvYnMuY29tcGxldGUoKSk7XG5cbiAgICAgIHJldHVybiAoKSA9PiBzdHJlYW0uY2FuY2VsKCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXJ2ZXJTdHJlYW08USBleHRlbmRzIEdycGNNZXNzYWdlLCBTIGV4dGVuZHMgR3JwY01lc3NhZ2U+KFxuICAgIHBhdGg6IHN0cmluZyxcbiAgICByZXE6IFEsXG4gICAgbWV0YWRhdGE6IEdycGNNZXRhZGF0YSxcbiAgICByZXFjbHNzOiBHcnBjTWVzc2FnZUNsYXNzPFE+LFxuICAgIHJlc2Nsc3M6IEdycGNNZXNzYWdlQ2xhc3M8Uz4sXG4gICk6IE9ic2VydmFibGU8R3JwY0V2ZW50PFM+PiB7XG4gICAgY29uc3QgZGVzY3JpcHRvciA9IG5ldyBNZXRob2REZXNjcmlwdG9yKFxuICAgICAgcGF0aCxcbiAgICAgICdzZXJ2ZXJfc3RyZWFtaW5nJyxcbiAgICAgIHJlcWNsc3MsXG4gICAgICByZXNjbHNzLFxuICAgICAgKHJlcXVlc3Q6IFEpID0+IHJlcXVlc3Quc2VyaWFsaXplQmluYXJ5KCksXG4gICAgICByZXNjbHNzLmRlc2VyaWFsaXplQmluYXJ5LFxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzID0+IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuY2xpZW50LnNlcnZlclN0cmVhbWluZyhcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5ob3N0ICsgcGF0aCxcbiAgICAgICAgcmVxLFxuICAgICAgICBtZXRhZGF0YT8udG9PYmplY3QoKSA/PyB7fSxcbiAgICAgICAgZGVzY3JpcHRvcixcbiAgICAgICk7XG5cbiAgICAgIHN0cmVhbS5vbignc3RhdHVzJywgc3RhdHVzID0+IG9icy5uZXh0KG5ldyBHcnBjU3RhdHVzRXZlbnQoc3RhdHVzLmNvZGUsIHN0YXR1cy5kZXRhaWxzLCBuZXcgR3JwY01ldGFkYXRhKHN0YXR1cy5tZXRhZGF0YSkpKSk7XG4gICAgICBzdHJlYW0ub24oJ2Vycm9yJywgZXJyb3IgPT4ge1xuICAgICAgICBvYnMubmV4dChuZXcgR3JwY1N0YXR1c0V2ZW50KGVycm9yLmNvZGUsIGVycm9yLm1lc3NhZ2UsIG5ldyBHcnBjTWV0YWRhdGEoKGVycm9yIGFzIGFueSkubWV0YWRhdGEpKSk7XG4gICAgICAgIG9icy5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG4gICAgICBzdHJlYW0ub24oJ2RhdGEnLCBkYXRhID0+IG9icy5uZXh0KG5ldyBHcnBjRGF0YUV2ZW50KGRhdGEgYXMgYW55KSkpO1xuICAgICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiBvYnMuY29tcGxldGUoKSk7XG5cbiAgICAgIHJldHVybiAoKSA9PiBzdHJlYW0uY2FuY2VsKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbGllbnRTdHJlYW0gPSAoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDbGllbnQgc3RyZWFtaW5nIG5vdCBzdXBwb3J0ZWQnKTtcbiAgfTtcblxuICBiaWRpU3RyZWFtID0gKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignQmlkaXJlY3Rpb25hbCBzdHJlYW1pbmcgbm90IHN1cHBvcnRlZCcpO1xuICB9O1xuXG59XG4iXX0=