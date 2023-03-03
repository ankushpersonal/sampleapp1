import { Inject, Injectable, Optional } from '@angular/core';
import { GrpcCallType } from '@ngx-grpc/common';
import { isObservable } from 'rxjs';
import { GRPC_INTERCEPTORS } from './injection-tokens';
import * as i0 from "@angular/core";
/**
 * Core gRPC transport class. Implements creation and binding of RPCs to the clients.
 * There is a root GrpcHandler that handles all initial requests;
 * however for every interception a new instance of GrpcHandler is created and passed to the interceptor
 */
export class GrpcHandler {
    constructor(configuredInterceptors) {
        this.interceptors = !configuredInterceptors ? [] : Array.isArray(configuredInterceptors) ? configuredInterceptors : [configuredInterceptors];
    }
    /**
     * Handles the gRPC request passing it through the interceptors array
     * Recursively calls all interceptors with a new instance of the GrpcHandler
     *
     * @param request a GrpcRequest to execute
     * @returns Observable of events returned by the GrpcClient implementation
     */
    handle(request) {
        const interceptors = (this.interceptors || []).slice();
        const interceptor = interceptors.shift();
        if (interceptor) {
            return interceptor.intercept(request, new GrpcHandler(interceptors));
        }
        switch (request.type) {
            case GrpcCallType.unary: return request.client.unary(request.path, this.message(request.requestData), request.requestMetadata, request.requestClass, request.responseClass);
            case GrpcCallType.serverStream: return request.client.serverStream(request.path, this.message(request.requestData), request.requestMetadata, request.requestClass, request.responseClass);
            case GrpcCallType.clientStream: return request.client.clientStream(request.path, this.stream(request.requestData), request.requestMetadata, request.requestClass, request.responseClass);
            case GrpcCallType.bidiStream: return request.client.bidiStream(request.path, this.stream(request.requestData), request.requestMetadata, request.requestClass, request.responseClass);
        }
    }
    message(p) {
        if (!isObservable(p)) {
            return p;
        }
        throw new Error('Expected Message, got Observable');
    }
    stream(p) {
        if (isObservable(p)) {
            return p;
        }
        throw new Error('Expected Observable, got message');
    }
}
GrpcHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcHandler, deps: [{ token: GRPC_INTERCEPTORS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcHandler });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcHandler, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GRPC_INTERCEPTORS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGliL2dycGMtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBdUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRixPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRWhELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUV2RDs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLFdBQVc7SUFJdEIsWUFDeUMsc0JBQTJEO1FBRWxHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0ksQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBK0MsT0FBMEI7UUFDN0UsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZELE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV6QyxJQUFJLFdBQVcsRUFBRTtZQUNmLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUVELFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNwQixLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUNsRCxPQUFPLENBQUMsSUFBSSxFQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUNqQyxPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLENBQUMsYUFBYSxDQUN0QixDQUFDO1lBQ0YsS0FBSyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FDaEUsT0FBTyxDQUFDLElBQUksRUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFDakMsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLFlBQVksRUFDcEIsT0FBTyxDQUFDLGFBQWEsQ0FDdEIsQ0FBQztZQUNGLEtBQUssWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQ2hFLE9BQU8sQ0FBQyxJQUFJLEVBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQ2hDLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxZQUFZLEVBQ3BCLE9BQU8sQ0FBQyxhQUFhLENBQ3RCLENBQUM7WUFDRixLQUFLLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUM1RCxPQUFPLENBQUMsSUFBSSxFQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUNoQyxPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLENBQUMsYUFBYSxDQUN0QixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8sT0FBTyxDQUF3QixDQUFvQjtRQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVPLE1BQU0sQ0FBd0IsQ0FBb0I7UUFDeEQsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUN0RCxDQUFDOzt3R0F2RVUsV0FBVyxrQkFLQSxpQkFBaUI7NEdBTDVCLFdBQVc7MkZBQVgsV0FBVztrQkFEdkIsVUFBVTs7MEJBTU4sUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcnBjQ2FsbFR5cGUsIEdycGNFdmVudCwgR3JwY01lc3NhZ2UsIEdycGNSZXF1ZXN0IH0gZnJvbSAnQG5neC1ncnBjL2NvbW1vbic7XG5pbXBvcnQgeyBpc09ic2VydmFibGUsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEdycGNJbnRlcmNlcHRvciB9IGZyb20gJy4vZ3JwYy1pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBHUlBDX0lOVEVSQ0VQVE9SUyB9IGZyb20gJy4vaW5qZWN0aW9uLXRva2Vucyc7XG5cbi8qKlxuICogQ29yZSBnUlBDIHRyYW5zcG9ydCBjbGFzcy4gSW1wbGVtZW50cyBjcmVhdGlvbiBhbmQgYmluZGluZyBvZiBSUENzIHRvIHRoZSBjbGllbnRzLlxuICogVGhlcmUgaXMgYSByb290IEdycGNIYW5kbGVyIHRoYXQgaGFuZGxlcyBhbGwgaW5pdGlhbCByZXF1ZXN0cztcbiAqIGhvd2V2ZXIgZm9yIGV2ZXJ5IGludGVyY2VwdGlvbiBhIG5ldyBpbnN0YW5jZSBvZiBHcnBjSGFuZGxlciBpcyBjcmVhdGVkIGFuZCBwYXNzZWQgdG8gdGhlIGludGVyY2VwdG9yXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcnBjSGFuZGxlciB7XG5cbiAgcHJpdmF0ZSBpbnRlcmNlcHRvcnM6IEdycGNJbnRlcmNlcHRvcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoR1JQQ19JTlRFUkNFUFRPUlMpIGNvbmZpZ3VyZWRJbnRlcmNlcHRvcnM6IEdycGNJbnRlcmNlcHRvciB8IEdycGNJbnRlcmNlcHRvcltdLFxuICApIHtcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9ICFjb25maWd1cmVkSW50ZXJjZXB0b3JzID8gW10gOiBBcnJheS5pc0FycmF5KGNvbmZpZ3VyZWRJbnRlcmNlcHRvcnMpID8gY29uZmlndXJlZEludGVyY2VwdG9ycyA6IFtjb25maWd1cmVkSW50ZXJjZXB0b3JzXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBnUlBDIHJlcXVlc3QgcGFzc2luZyBpdCB0aHJvdWdoIHRoZSBpbnRlcmNlcHRvcnMgYXJyYXlcbiAgICogUmVjdXJzaXZlbHkgY2FsbHMgYWxsIGludGVyY2VwdG9ycyB3aXRoIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBHcnBjSGFuZGxlclxuICAgKlxuICAgKiBAcGFyYW0gcmVxdWVzdCBhIEdycGNSZXF1ZXN0IHRvIGV4ZWN1dGVcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBldmVudHMgcmV0dXJuZWQgYnkgdGhlIEdycGNDbGllbnQgaW1wbGVtZW50YXRpb25cbiAgICovXG4gIGhhbmRsZTxRIGV4dGVuZHMgR3JwY01lc3NhZ2UsIFMgZXh0ZW5kcyBHcnBjTWVzc2FnZT4ocmVxdWVzdDogR3JwY1JlcXVlc3Q8USwgUz4pOiBPYnNlcnZhYmxlPEdycGNFdmVudDxTPj4ge1xuICAgIGNvbnN0IGludGVyY2VwdG9ycyA9ICh0aGlzLmludGVyY2VwdG9ycyB8fCBbXSkuc2xpY2UoKTtcbiAgICBjb25zdCBpbnRlcmNlcHRvciA9IGludGVyY2VwdG9ycy5zaGlmdCgpO1xuXG4gICAgaWYgKGludGVyY2VwdG9yKSB7XG4gICAgICByZXR1cm4gaW50ZXJjZXB0b3IuaW50ZXJjZXB0KHJlcXVlc3QsIG5ldyBHcnBjSGFuZGxlcihpbnRlcmNlcHRvcnMpKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xuICAgICAgY2FzZSBHcnBjQ2FsbFR5cGUudW5hcnk6IHJldHVybiByZXF1ZXN0LmNsaWVudC51bmFyeShcbiAgICAgICAgcmVxdWVzdC5wYXRoLFxuICAgICAgICB0aGlzLm1lc3NhZ2UocmVxdWVzdC5yZXF1ZXN0RGF0YSksXG4gICAgICAgIHJlcXVlc3QucmVxdWVzdE1ldGFkYXRhLFxuICAgICAgICByZXF1ZXN0LnJlcXVlc3RDbGFzcyxcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZUNsYXNzLFxuICAgICAgKTtcbiAgICAgIGNhc2UgR3JwY0NhbGxUeXBlLnNlcnZlclN0cmVhbTogcmV0dXJuIHJlcXVlc3QuY2xpZW50LnNlcnZlclN0cmVhbShcbiAgICAgICAgcmVxdWVzdC5wYXRoLFxuICAgICAgICB0aGlzLm1lc3NhZ2UocmVxdWVzdC5yZXF1ZXN0RGF0YSksXG4gICAgICAgIHJlcXVlc3QucmVxdWVzdE1ldGFkYXRhLFxuICAgICAgICByZXF1ZXN0LnJlcXVlc3RDbGFzcyxcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZUNsYXNzLFxuICAgICAgKTtcbiAgICAgIGNhc2UgR3JwY0NhbGxUeXBlLmNsaWVudFN0cmVhbTogcmV0dXJuIHJlcXVlc3QuY2xpZW50LmNsaWVudFN0cmVhbShcbiAgICAgICAgcmVxdWVzdC5wYXRoLFxuICAgICAgICB0aGlzLnN0cmVhbShyZXF1ZXN0LnJlcXVlc3REYXRhKSxcbiAgICAgICAgcmVxdWVzdC5yZXF1ZXN0TWV0YWRhdGEsXG4gICAgICAgIHJlcXVlc3QucmVxdWVzdENsYXNzLFxuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlQ2xhc3MsXG4gICAgICApO1xuICAgICAgY2FzZSBHcnBjQ2FsbFR5cGUuYmlkaVN0cmVhbTogcmV0dXJuIHJlcXVlc3QuY2xpZW50LmJpZGlTdHJlYW0oXG4gICAgICAgIHJlcXVlc3QucGF0aCxcbiAgICAgICAgdGhpcy5zdHJlYW0ocmVxdWVzdC5yZXF1ZXN0RGF0YSksXG4gICAgICAgIHJlcXVlc3QucmVxdWVzdE1ldGFkYXRhLFxuICAgICAgICByZXF1ZXN0LnJlcXVlc3RDbGFzcyxcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZUNsYXNzLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1lc3NhZ2U8USBleHRlbmRzIEdycGNNZXNzYWdlPihwOiBRIHwgT2JzZXJ2YWJsZTxRPik6IFEge1xuICAgIGlmICghaXNPYnNlcnZhYmxlKHApKSB7XG4gICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIE1lc3NhZ2UsIGdvdCBPYnNlcnZhYmxlJyk7XG4gIH1cblxuICBwcml2YXRlIHN0cmVhbTxRIGV4dGVuZHMgR3JwY01lc3NhZ2U+KHA6IFEgfCBPYnNlcnZhYmxlPFE+KTogT2JzZXJ2YWJsZTxRPiB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZShwKSkge1xuICAgICAgcmV0dXJuIHA7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBPYnNlcnZhYmxlLCBnb3QgbWVzc2FnZScpO1xuICB9XG5cbn1cbiJdfQ==