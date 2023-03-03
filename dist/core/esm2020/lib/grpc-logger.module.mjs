import { NgModule } from '@angular/core';
import { GrpcLoggerInterceptor, GRPC_LOGGER_SETTINGS } from './grpc-logger-interceptor';
import { GRPC_INTERCEPTORS } from './injection-tokens';
import * as i0 from "@angular/core";
export class GrpcLoggerModule {
    /**
     * Create GrpcLoggerModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options) {
        const providers = [{ provide: GRPC_INTERCEPTORS, useClass: GrpcLoggerInterceptor, multi: true }];
        if (options?.settings) {
            providers.push({ provide: GRPC_LOGGER_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcLoggerModule, providers };
    }
    /**
     * Create GrpcCoreModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options) {
        const providers = [{ provide: GRPC_INTERCEPTORS, useClass: GrpcLoggerInterceptor, multi: true }];
        if (options?.settings) {
            providers.push({ provide: GRPC_LOGGER_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcLoggerModule, providers };
    }
}
GrpcLoggerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GrpcLoggerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerModule });
GrpcLoggerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcLoggerModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy1sb2dnZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGliL2dycGMtbG9nZ2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQXNCLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBV3ZELE1BQU0sT0FBTyxnQkFBZ0I7SUFFM0I7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUErQjtRQUNuRCxNQUFNLFNBQVMsR0FBZSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU3RyxJQUFJLE9BQU8sRUFBRSxRQUFRLEVBQUU7WUFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDL0U7UUFFRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQWdDO1FBQ3JELE1BQU0sU0FBUyxHQUFlLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTdHLElBQUksT0FBTyxFQUFFLFFBQVEsRUFBRTtZQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMvRTtRQUVELE9BQU8sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDbkQsQ0FBQzs7NkdBNUJVLGdCQUFnQjs4R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JwY0xvZ2dlckludGVyY2VwdG9yLCBHcnBjTG9nZ2VyU2V0dGluZ3MsIEdSUENfTE9HR0VSX1NFVFRJTkdTIH0gZnJvbSAnLi9ncnBjLWxvZ2dlci1pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBHUlBDX0lOVEVSQ0VQVE9SUyB9IGZyb20gJy4vaW5qZWN0aW9uLXRva2Vucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JwY0xvZ2dlclJvb3RPcHRpb25zIHtcbiAgc2V0dGluZ3M6IEdycGNMb2dnZXJTZXR0aW5ncztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcnBjTG9nZ2VyQ2hpbGRPcHRpb25zIHtcbiAgc2V0dGluZ3M6IEdycGNMb2dnZXJTZXR0aW5ncztcbn1cblxuQE5nTW9kdWxlKClcbmV4cG9ydCBjbGFzcyBHcnBjTG9nZ2VyTW9kdWxlIHtcblxuICAvKipcbiAgICogQ3JlYXRlIEdycGNMb2dnZXJNb2R1bGUgZm9yIHVzaW5nIGluIEFwcE1vZHVsZSAoYXBwbGljYXRpb24gcm9vdCBtb2R1bGUpXG4gICAqIFlvdSBjYW4gcHJvdmlkZSB0aGUgb3B0aW9ucyBoZXJlIGluc3RlYWQgb2YgaW5qZWN0aW5nIGNvcnJlc3BvbmRpbmcgdG9rZW5zIHNlcGFyYXRlbHlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogR3JwY0xvZ2dlclJvb3RPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxHcnBjTG9nZ2VyTW9kdWxlPiB7XG4gICAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW3sgcHJvdmlkZTogR1JQQ19JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBHcnBjTG9nZ2VySW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH1dO1xuXG4gICAgaWYgKG9wdGlvbnM/LnNldHRpbmdzKSB7XG4gICAgICBwcm92aWRlcnMucHVzaCh7IHByb3ZpZGU6IEdSUENfTE9HR0VSX1NFVFRJTkdTLCB1c2VWYWx1ZTogb3B0aW9ucy5zZXR0aW5ncyB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBuZ01vZHVsZTogR3JwY0xvZ2dlck1vZHVsZSwgcHJvdmlkZXJzIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIEdycGNDb3JlTW9kdWxlIGZvciB1c2luZyBpbiBjaGlsZHJlbiBtb2R1bGVzIChpbmNsLiBsYXp5IG1vZHVsZXMpXG4gICAqIFlvdSBjYW4gcHJvdmlkZSB0aGUgb3B0aW9ucyBoZXJlIGluc3RlYWQgb2YgaW5qZWN0aW5nIGNvcnJlc3BvbmRpbmcgdG9rZW5zIHNlcGFyYXRlbHlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQob3B0aW9ucz86IEdycGNMb2dnZXJDaGlsZE9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEdycGNMb2dnZXJNb2R1bGU+IHtcbiAgICBjb25zdCBwcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbeyBwcm92aWRlOiBHUlBDX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEdycGNMb2dnZXJJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfV07XG5cbiAgICBpZiAob3B0aW9ucz8uc2V0dGluZ3MpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKHsgcHJvdmlkZTogR1JQQ19MT0dHRVJfU0VUVElOR1MsIHVzZVZhbHVlOiBvcHRpb25zLnNldHRpbmdzIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7IG5nTW9kdWxlOiBHcnBjTG9nZ2VyTW9kdWxlLCBwcm92aWRlcnMgfTtcbiAgfVxuXG59XG4iXX0=