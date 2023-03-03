import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { GrpcDataEvent } from '@ngx-grpc/common';
import { isObservable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
/**
 * A configuration for GrpcLoggerInterceptor
 *
 * Example:
 *
 * ```
 * providers: [
 *   { provide: GRPC_LOGGER_SETTINGS, useValue: { enabled: true } },
 * ]
 * ```
 *
 * or more complex:
 *
 * ```
 * providers: [
 *   { provide: GRPC_LOGGER_SETTINGS, useFactory: () => { enabled: localStorage.getItem('GRPC_LOGGER_SETTINGS') === 'true' || !environment.prod } },
 * ]
 * ```
 */
export const GRPC_LOGGER_SETTINGS = new InjectionToken('GRPC_LOGGER_SETTINGS');
/**
 * Interceptor that implements logging of every request to the browser console
 *
 * Can be enabled / disabled by GRPC_LOGGER_ENABLED injection token
 */
export class GrpcLoggerInterceptor {
    constructor(settings = {}) {
        this.clientDataStyle = 'color: #eb0edc;';
        this.dataStyle = 'color: #5c7ced;';
        this.errorStyle = 'color: #f00505;';
        this.statusOkStyle = 'color: #0ffcf5;';
        this.settings = {
            enabled: settings.enabled ?? true,
            logClientSettings: settings.logClientSettings ?? true,
            logMetadata: settings.logMetadata ?? true,
            logStatusCodeOk: settings.logStatusCodeOk ?? false,
            requestMapper: settings.requestMapper ?? ((msg) => msg.toObject()),
            responseMapper: settings.responseMapper ?? ((msg) => msg.toObject()),
        };
    }
    intercept(request, next) {
        if (this.settings.enabled) {
            const id = ++GrpcLoggerInterceptor.requestId;
            const start = Date.now();
            // check if client streaming, then push each value separately
            if (isObservable(request.requestData)) {
                request.requestData = request.requestData.pipe(tap(msg => {
                    console.groupCollapsed(`%c#${id}: ${Date.now() - start}ms -> ${request.path}`, this.clientDataStyle);
                    console.log('%c>>', this.clientDataStyle, this.settings.requestMapper(msg));
                    console.groupEnd();
                }));
            }
            // handle unary calls and server streaming in the same manner
            return next.handle(request).pipe(tap(event => {
                const style = event instanceof GrpcDataEvent ? this.dataStyle : event.statusCode !== 0 ? this.errorStyle : this.statusOkStyle;
                const openGroup = () => console.groupCollapsed(`%c#${id}: ${Date.now() - start}ms -> ${request.path}`, style);
                const printSettings = () => {
                    if (this.settings.logClientSettings) {
                        console.log('%csc', style, request.client.getSettings());
                    }
                };
                const printMetadata = () => {
                    if (this.settings.logMetadata) {
                        console.log('%c**', style, request.requestMetadata.toObject());
                    }
                };
                const printRequest = () => console.log('%c>>', style, isObservable(request.requestData) ? '<see above>' : this.settings.requestMapper(request.requestData));
                const closeGroup = () => console.groupEnd();
                if (event instanceof GrpcDataEvent) {
                    openGroup();
                    printSettings();
                    printRequest();
                    printMetadata();
                    console.log('%c<<', style, this.settings.responseMapper(event.data));
                    closeGroup();
                }
                else if (event.statusCode !== 0) {
                    openGroup();
                    printSettings();
                    printRequest();
                    printMetadata();
                    console.log('%c<<', style, event);
                    closeGroup();
                }
                else if (event.statusCode === 0 && this.settings.logStatusCodeOk) {
                    openGroup();
                    printSettings();
                    printRequest();
                    printMetadata();
                    console.log('%c<<', style, event);
                    closeGroup();
                }
            }));
        }
        return next.handle(request);
    }
}
GrpcLoggerInterceptor.requestId = 0;
GrpcLoggerInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerInterceptor, deps: [{ token: GRPC_LOGGER_SETTINGS, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
GrpcLoggerInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [GRPC_LOGGER_SETTINGS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy1sb2dnZXItaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saWIvZ3JwYy1sb2dnZXItaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsYUFBYSxFQUF1QyxNQUFNLGtCQUFrQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxZQUFZLEVBQWtCLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBUyxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFJNUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFxQy9FOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBV2hDLFlBQXNELFdBQStCLEVBQUU7UUFQL0Usb0JBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUNwQyxjQUFTLEdBQUcsaUJBQWlCLENBQUM7UUFDOUIsZUFBVSxHQUFHLGlCQUFpQixDQUFDO1FBQy9CLGtCQUFhLEdBQUcsaUJBQWlCLENBQUM7UUFLeEMsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxJQUFJLElBQUk7WUFDakMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixJQUFJLElBQUk7WUFDckQsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXLElBQUksSUFBSTtZQUN6QyxlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQWUsSUFBSSxLQUFLO1lBQ2xELGFBQWEsRUFBRSxRQUFRLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFnQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMs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OzJCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcnBjRGF0YUV2ZW50LCBHcnBjRXZlbnQsIEdycGNNZXNzYWdlLCBHcnBjUmVxdWVzdCB9IGZyb20gJ0BuZ3gtZ3JwYy9jb21tb24nO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEdycGNIYW5kbGVyIH0gZnJvbSAnLi9ncnBjLWhhbmRsZXInO1xuaW1wb3J0IHsgR3JwY0ludGVyY2VwdG9yIH0gZnJvbSAnLi9ncnBjLWludGVyY2VwdG9yJztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gZm9yIEdycGNMb2dnZXJJbnRlcmNlcHRvclxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBwcm92aWRlcnM6IFtcbiAqICAgeyBwcm92aWRlOiBHUlBDX0xPR0dFUl9TRVRUSU5HUywgdXNlVmFsdWU6IHsgZW5hYmxlZDogdHJ1ZSB9IH0sXG4gKiBdXG4gKiBgYGBcbiAqXG4gKiBvciBtb3JlIGNvbXBsZXg6XG4gKlxuICogYGBgXG4gKiBwcm92aWRlcnM6IFtcbiAqICAgeyBwcm92aWRlOiBHUlBDX0xPR0dFUl9TRVRUSU5HUywgdXNlRmFjdG9yeTogKCkgPT4geyBlbmFibGVkOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnR1JQQ19MT0dHRVJfU0VUVElOR1MnKSA9PT0gJ3RydWUnIHx8ICFlbnZpcm9ubWVudC5wcm9kIH0gfSxcbiAqIF1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgR1JQQ19MT0dHRVJfU0VUVElOR1MgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0dSUENfTE9HR0VSX1NFVFRJTkdTJyk7XG5cblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gZGVmaW5pdGlvbiBmb3IgR3JwY0xvZ2dlckludGVyY2VwdG9yXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3JwY0xvZ2dlclNldHRpbmdzIHtcbiAgLyoqXG4gICAqIEVuYWJsZXMgLyBkaXNhYmxlcyB0aGUgb3V0cHV0LCBkZWZhdWx0IHRydWVcbiAgICovXG4gIGVuYWJsZWQ/OiBib29sZWFuO1xuICAvKipcbiAgICogSW5jbHVkZXMgY2xpZW50IHNldHRpbmdzIGludG8gdGhlIGxvZ3MsIGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgbG9nQ2xpZW50U2V0dGluZ3M/OiBib29sZWFuO1xuICAvKipcbiAgICogSW5jbHVkZXMgcmVxdWVzdCBtZXRhZGF0YSBpbnRvIHRoZSBsb2dzLCBkZWZhdWx0IHRydWVcbiAgICovXG4gIGxvZ01ldGFkYXRhPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIExvZ3MgZXZlbnRzIHdpdGggc3RhdHVzIGNvZGUgT0sgKDApLCBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBsb2dTdGF0dXNDb2RlT2s/OiBib29sZWFuO1xuICAvKipcbiAgICogUmVxdWVzdCBtYXBwZXIgZnVuY3Rpb24sIGRlZmluZXMgd2hhdCBvdXRwdXQgaXMgZ2VuZXJhdGVkIGZvciB0aGUgZ2l2ZW4gbWVzc2FnZS5cbiAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMgYChtc2cpID0+IG1zZy50b09iamVjdCgpYC5cbiAgICogQWNjb3JkaW5nIHRvIHlvdXIgcHJlZmVyZW5jZXMgeW91IG1pZ2h0IGNob29zZSBlLmcuIGAobXNnKSA9PiBtc2cudG9Qcm90b2J1ZkpTT04oKWAgaW5zdGVhZC5cbiAgICovXG4gIHJlcXVlc3RNYXBwZXI/OiAobXNnOiBHcnBjTWVzc2FnZSkgPT4gYW55O1xuICAvKipcbiAgICogUmVzcG9uc2UgbWFwcGVyIGZ1bmN0aW9uLCBkZWZpbmVzIHdoYXQgb3V0cHV0IGlzIGdlbmVyYXRlZCBmb3IgdGhlIGdpdmVuIG1lc3NhZ2UuXG4gICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIGAobXNnKSA9PiBtc2cudG9PYmplY3QoKWAuXG4gICAqIEFjY29yZGluZyB0byB5b3VyIHByZWZlcmVuY2VzIHlvdSBtaWdodCBjaG9vc2UgZS5nLiBgKG1zZykgPT4gbXNnLnRvUHJvdG9idWZKU09OKClgIGluc3RlYWQuXG4gICAqL1xuICByZXNwb25zZU1hcHBlcj86IChtc2c6IEdycGNNZXNzYWdlKSA9PiBhbnk7XG59XG5cbi8qKlxuICogSW50ZXJjZXB0b3IgdGhhdCBpbXBsZW1lbnRzIGxvZ2dpbmcgb2YgZXZlcnkgcmVxdWVzdCB0byB0aGUgYnJvd3NlciBjb25zb2xlXG4gKlxuICogQ2FuIGJlIGVuYWJsZWQgLyBkaXNhYmxlZCBieSBHUlBDX0xPR0dFUl9FTkFCTEVEIGluamVjdGlvbiB0b2tlblxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR3JwY0xvZ2dlckludGVyY2VwdG9yIGltcGxlbWVudHMgR3JwY0ludGVyY2VwdG9yIHtcblxuICBwcml2YXRlIHN0YXRpYyByZXF1ZXN0SWQgPSAwO1xuXG4gIHByaXZhdGUgY2xpZW50RGF0YVN0eWxlID0gJ2NvbG9yOiAjZWIwZWRjOyc7XG4gIHByaXZhdGUgZGF0YVN0eWxlID0gJ2NvbG9yOiAjNWM3Y2VkOyc7XG4gIHByaXZhdGUgZXJyb3JTdHlsZSA9ICdjb2xvcjogI2YwMDUwNTsnO1xuICBwcml2YXRlIHN0YXR1c09rU3R5bGUgPSAnY29sb3I6ICMwZmZjZjU7JztcblxuICBwcml2YXRlIHNldHRpbmdzOiBHcnBjTG9nZ2VyU2V0dGluZ3M7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChHUlBDX0xPR0dFUl9TRVRUSU5HUykgc2V0dGluZ3M6IEdycGNMb2dnZXJTZXR0aW5ncyA9IHt9KSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGVuYWJsZWQ6IHNldHRpbmdzLmVuYWJsZWQgPz8gdHJ1ZSxcbiAgICAgIGxvZ0NsaWVudFNldHRpbmdzOiBzZXR0aW5ncy5sb2dDbGllbnRTZXR0aW5ncyA/PyB0cnVlLFxuICAgICAgbG9nTWV0YWRhdGE6IHNldHRpbmdzLmxvZ01ldGFkYXRhID8/IHRydWUsXG4gICAgICBsb2dTdGF0dXNDb2RlT2s6IHNldHRpbmdzLmxvZ1N0YXR1c0NvZGVPayA/PyBmYWxzZSxcbiAgICAgIHJlcXVlc3RNYXBwZXI6IHNldHRpbmdzLnJlcXVlc3RNYXBwZXIgPz8gKChtc2c6IEdycGNNZXNzYWdlKSA9PiBtc2cudG9PYmplY3QoKSksXG4gICAgICByZXNwb25zZU1hcHBlcjogc2V0dGluZ3MucmVzcG9uc2VNYXBwZXIgPz8gKChtc2c6IEdycGNNZXNzYWdlKSA9PiBtc2cudG9PYmplY3QoKSksXG4gICAgfTtcbiAgfVxuXG4gIGludGVyY2VwdDxRIGV4dGVuZHMgR3JwY01lc3NhZ2UsIFMgZXh0ZW5kcyBHcnBjTWVzc2FnZT4ocmVxdWVzdDogR3JwY1JlcXVlc3Q8USwgUz4sIG5leHQ6IEdycGNIYW5kbGVyKTogT2JzZXJ2YWJsZTxHcnBjRXZlbnQ8Uz4+IHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVkKSB7XG4gICAgICBjb25zdCBpZCA9ICsrR3JwY0xvZ2dlckludGVyY2VwdG9yLnJlcXVlc3RJZDtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgICAgLy8gY2hlY2sgaWYgY2xpZW50IHN0cmVhbWluZywgdGhlbiBwdXNoIGVhY2ggdmFsdWUgc2VwYXJhdGVseVxuICAgICAgaWYgKGlzT2JzZXJ2YWJsZShyZXF1ZXN0LnJlcXVlc3REYXRhKSkge1xuICAgICAgICByZXF1ZXN0LnJlcXVlc3REYXRhID0gcmVxdWVzdC5yZXF1ZXN0RGF0YS5waXBlKFxuICAgICAgICAgIHRhcChtc2cgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZChgJWMjJHtpZH06ICR7RGF0ZS5ub3coKSAtIHN0YXJ0fW1zIC0+ICR7cmVxdWVzdC5wYXRofWAsIHRoaXMuY2xpZW50RGF0YVN0eWxlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCclYz4+JywgdGhpcy5jbGllbnREYXRhU3R5bGUsIHRoaXMuc2V0dGluZ3MucmVxdWVzdE1hcHBlcihtc2cpKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIHVuYXJ5IGNhbGxzIGFuZCBzZXJ2ZXIgc3RyZWFtaW5nIGluIHRoZSBzYW1lIG1hbm5lclxuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICAgIHRhcChldmVudCA9PiB7XG4gICAgICAgICAgY29uc3Qgc3R5bGUgPSBldmVudCBpbnN0YW5jZW9mIEdycGNEYXRhRXZlbnQgPyB0aGlzLmRhdGFTdHlsZSA6IGV2ZW50LnN0YXR1c0NvZGUgIT09IDAgPyB0aGlzLmVycm9yU3R5bGUgOiB0aGlzLnN0YXR1c09rU3R5bGU7XG5cbiAgICAgICAgICBjb25zdCBvcGVuR3JvdXAgPSAoKSA9PiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGAlYyMke2lkfTogJHtEYXRlLm5vdygpIC0gc3RhcnR9bXMgLT4gJHtyZXF1ZXN0LnBhdGh9YCwgc3R5bGUpO1xuXG4gICAgICAgICAgY29uc3QgcHJpbnRTZXR0aW5ncyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxvZ0NsaWVudFNldHRpbmdzKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCclY3NjJywgc3R5bGUsIHJlcXVlc3QuY2xpZW50LmdldFNldHRpbmdzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBwcmludE1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MubG9nTWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJyVjKionLCBzdHlsZSwgcmVxdWVzdC5yZXF1ZXN0TWV0YWRhdGEudG9PYmplY3QoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHByaW50UmVxdWVzdCA9ICgpID0+IGNvbnNvbGUubG9nKCclYz4+Jywgc3R5bGUsIGlzT2JzZXJ2YWJsZShyZXF1ZXN0LnJlcXVlc3REYXRhKSA/ICc8c2VlIGFib3ZlPicgOiB0aGlzLnNldHRpbmdzLnJlcXVlc3RNYXBwZXIocmVxdWVzdC5yZXF1ZXN0RGF0YSkpO1xuXG4gICAgICAgICAgY29uc3QgY2xvc2VHcm91cCA9ICgpID0+IGNvbnNvbGUuZ3JvdXBFbmQoKTtcblxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEdycGNEYXRhRXZlbnQpIHtcbiAgICAgICAgICAgIG9wZW5Hcm91cCgpO1xuICAgICAgICAgICAgcHJpbnRTZXR0aW5ncygpO1xuICAgICAgICAgICAgcHJpbnRSZXF1ZXN0KCk7XG4gICAgICAgICAgICBwcmludE1ldGFkYXRhKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnJWM8PCcsIHN0eWxlLCB0aGlzLnNldHRpbmdzLnJlc3BvbnNlTWFwcGVyKGV2ZW50LmRhdGEpKTtcbiAgICAgICAgICAgIGNsb3NlR3JvdXAoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnN0YXR1c0NvZGUgIT09IDApIHtcbiAgICAgICAgICAgIG9wZW5Hcm91cCgpO1xuICAgICAgICAgICAgcHJpbnRTZXR0aW5ncygpO1xuICAgICAgICAgICAgcHJpbnRSZXF1ZXN0KCk7XG4gICAgICAgICAgICBwcmludE1ldGFkYXRhKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnJWM8PCcsIHN0eWxlLCBldmVudCk7XG4gICAgICAgICAgICBjbG9zZUdyb3VwKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5zdGF0dXNDb2RlID09PSAwICYmIHRoaXMuc2V0dGluZ3MubG9nU3RhdHVzQ29kZU9rKSB7XG4gICAgICAgICAgICBvcGVuR3JvdXAoKTtcbiAgICAgICAgICAgIHByaW50U2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHByaW50UmVxdWVzdCgpO1xuICAgICAgICAgICAgcHJpbnRNZXRhZGF0YSgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJyVjPDwnLCBzdHlsZSwgZXZlbnQpO1xuICAgICAgICAgICAgY2xvc2VHcm91cCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxuXG59XG4iXX0=