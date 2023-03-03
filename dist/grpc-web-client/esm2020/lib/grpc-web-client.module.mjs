import { NgModule } from '@angular/core';
import { GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';
import { GrpcWebClientFactory } from './grpc-web-client';
import { GRPC_WEB_CLIENT_DEFAULT_SETTINGS } from './tokens';
import * as i0 from "@angular/core";
export class GrpcWebClientModule {
    /**
     * Create GrpcWebClientModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options) {
        const providers = [{ provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory }];
        if (options?.settings) {
            providers.push({ provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcWebClientModule, providers };
    }
    /**
     * Create GrpcWebClientModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options) {
        const providers = [{ provide: GRPC_CLIENT_FACTORY, useClass: GrpcWebClientFactory }];
        if (options?.settings) {
            providers.push({ provide: GRPC_WEB_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcWebClientModule, providers };
    }
}
GrpcWebClientModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GrpcWebClientModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientModule });
GrpcWebClientModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWebClientModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy13ZWItY2xpZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL2dycGMtd2ViLWNsaWVudC9zcmMvbGliL2dycGMtd2ViLWNsaWVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixRQUFRLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLG9CQUFvQixFQUF5QixNQUFNLG1CQUFtQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUFXNUQsTUFBTSxPQUFPLG1CQUFtQjtJQUU5Qjs7O09BR0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWtDO1FBQ3RELE1BQU0sU0FBUyxHQUFlLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUVqRyxJQUFJLE9BQU8sRUFBRSxRQUFRLEVBQUU7WUFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDM0Y7UUFFRCxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQW1DO1FBQ3hELE1BQU0sU0FBUyxHQUFlLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUVqRyxJQUFJLE9BQU8sRUFBRSxRQUFRLEVBQUU7WUFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDM0Y7UUFFRCxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ3RELENBQUM7O2dIQTVCVSxtQkFBbUI7aUhBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdSUENfQ0xJRU5UX0ZBQ1RPUlkgfSBmcm9tICdAbmd4LWdycGMvY29yZSc7XG5pbXBvcnQgeyBHcnBjV2ViQ2xpZW50RmFjdG9yeSwgR3JwY1dlYkNsaWVudFNldHRpbmdzIH0gZnJvbSAnLi9ncnBjLXdlYi1jbGllbnQnO1xuaW1wb3J0IHsgR1JQQ19XRUJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JwY1dlYkNsaWVudFJvb3RPcHRpb25zIHtcbiAgc2V0dGluZ3M/OiBHcnBjV2ViQ2xpZW50U2V0dGluZ3M7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JwY1dlYkNsaWVudENoaWxkT3B0aW9ucyB7XG4gIHNldHRpbmdzPzogR3JwY1dlYkNsaWVudFNldHRpbmdzO1xufVxuXG5ATmdNb2R1bGUoKVxuZXhwb3J0IGNsYXNzIEdycGNXZWJDbGllbnRNb2R1bGUge1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgR3JwY1dlYkNsaWVudE1vZHVsZSBmb3IgdXNpbmcgaW4gQXBwTW9kdWxlIChhcHBsaWNhdGlvbiByb290IG1vZHVsZSlcbiAgICogWW91IGNhbiBwcm92aWRlIHRoZSBvcHRpb25zIGhlcmUgaW5zdGVhZCBvZiBpbmplY3RpbmcgY29ycmVzcG9uZGluZyB0b2tlbnMgc2VwYXJhdGVseVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KG9wdGlvbnM/OiBHcnBjV2ViQ2xpZW50Um9vdE9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEdycGNXZWJDbGllbnRNb2R1bGU+IHtcbiAgICBjb25zdCBwcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbeyBwcm92aWRlOiBHUlBDX0NMSUVOVF9GQUNUT1JZLCB1c2VDbGFzczogR3JwY1dlYkNsaWVudEZhY3RvcnkgfV07XG5cbiAgICBpZiAob3B0aW9ucz8uc2V0dGluZ3MpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKHsgcHJvdmlkZTogR1JQQ19XRUJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MsIHVzZVZhbHVlOiBvcHRpb25zLnNldHRpbmdzIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7IG5nTW9kdWxlOiBHcnBjV2ViQ2xpZW50TW9kdWxlLCBwcm92aWRlcnMgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgR3JwY1dlYkNsaWVudE1vZHVsZSBmb3IgdXNpbmcgaW4gY2hpbGRyZW4gbW9kdWxlcyAoaW5jbC4gbGF6eSBtb2R1bGVzKVxuICAgKiBZb3UgY2FuIHByb3ZpZGUgdGhlIG9wdGlvbnMgaGVyZSBpbnN0ZWFkIG9mIGluamVjdGluZyBjb3JyZXNwb25kaW5nIHRva2VucyBzZXBhcmF0ZWx5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGZvckNoaWxkKG9wdGlvbnM/OiBHcnBjV2ViQ2xpZW50Q2hpbGRPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxHcnBjV2ViQ2xpZW50TW9kdWxlPiB7XG4gICAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW3sgcHJvdmlkZTogR1JQQ19DTElFTlRfRkFDVE9SWSwgdXNlQ2xhc3M6IEdycGNXZWJDbGllbnRGYWN0b3J5IH1dO1xuXG4gICAgaWYgKG9wdGlvbnM/LnNldHRpbmdzKSB7XG4gICAgICBwcm92aWRlcnMucHVzaCh7IHByb3ZpZGU6IEdSUENfV0VCX0NMSUVOVF9ERUZBVUxUX1NFVFRJTkdTLCB1c2VWYWx1ZTogb3B0aW9ucy5zZXR0aW5ncyB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBuZ01vZHVsZTogR3JwY1dlYkNsaWVudE1vZHVsZSwgcHJvdmlkZXJzIH07XG4gIH1cblxufVxuIl19