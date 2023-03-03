import { NgModule } from '@angular/core';
import { GRPC_CLIENT_FACTORY } from '@ngx-grpc/core';
import { GrpcWorkerClientFactory } from './grpc-worker-client';
import { GrpcWorkerGateway } from './grpc-worker-gateway';
import { GRPC_WORKER, GRPC_WORKER_CLIENT_DEFAULT_SETTINGS } from './tokens';
import * as i0 from "@angular/core";
export class GrpcWorkerClientModule {
    /**
     * Create GrpcWorkerClientModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options) {
        const providers = [
            GrpcWorkerGateway,
            { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWorkerClientFactory },
        ];
        if (options?.worker) {
            providers.push({ provide: GRPC_WORKER, useValue: options.worker });
        }
        if (options?.settings) {
            providers.push({ provide: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcWorkerClientModule, providers };
    }
    /**
     * Create GrpcWorkerClientModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options) {
        const providers = [
            GrpcWorkerGateway,
            { provide: GRPC_CLIENT_FACTORY, useClass: GrpcWorkerClientFactory },
        ];
        if (options?.worker) {
            providers.push({ provide: GRPC_WORKER, useValue: options.worker });
        }
        if (options?.settings) {
            providers.push({ provide: GRPC_WORKER_CLIENT_DEFAULT_SETTINGS, useValue: options.settings });
        }
        return { ngModule: GrpcWorkerClientModule, providers };
    }
}
GrpcWorkerClientModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GrpcWorkerClientModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientModule });
GrpcWorkerClientModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcWorkerClientModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy13b3JrZXItY2xpZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL3dvcmtlci1jbGllbnQvc3JjL2xpYi9ncnBjLXdvcmtlci1jbGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx1QkFBdUIsRUFBNEIsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sVUFBVSxDQUFDOztBQWE1RSxNQUFNLE9BQU8sc0JBQXNCO0lBRWpDOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBcUM7UUFDekQsTUFBTSxTQUFTLEdBQWU7WUFDNUIsaUJBQWlCO1lBQ2pCLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTtTQUNwRSxDQUFDO1FBRUYsSUFBSSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNwRTtRQUVELElBQUksT0FBTyxFQUFFLFFBQVEsRUFBRTtZQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM5RjtRQUVELE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBc0M7UUFDM0QsTUFBTSxTQUFTLEdBQWU7WUFDNUIsaUJBQWlCO1lBQ2pCLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRTtTQUNwRSxDQUFDO1FBRUYsSUFBSSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ25CLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNwRTtRQUVELElBQUksT0FBTyxFQUFFLFFBQVEsRUFBRTtZQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM5RjtRQUVELE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDekQsQ0FBQzs7bUhBMUNVLHNCQUFzQjtvSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFEbEMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR1JQQ19DTElFTlRfRkFDVE9SWSB9IGZyb20gJ0BuZ3gtZ3JwYy9jb3JlJztcbmltcG9ydCB7IEdycGNXb3JrZXJDbGllbnRGYWN0b3J5LCBHcnBjV29ya2VyQ2xpZW50U2V0dGluZ3MgfSBmcm9tICcuL2dycGMtd29ya2VyLWNsaWVudCc7XG5pbXBvcnQgeyBHcnBjV29ya2VyR2F0ZXdheSB9IGZyb20gJy4vZ3JwYy13b3JrZXItZ2F0ZXdheSc7XG5pbXBvcnQgeyBHUlBDX1dPUktFUiwgR1JQQ19XT1JLRVJfQ0xJRU5UX0RFRkFVTFRfU0VUVElOR1MgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JwY1dvcmtlckNsaWVudFJvb3RPcHRpb25zIHtcbiAgd29ya2VyPzogV29ya2VyO1xuICBzZXR0aW5ncz86IEdycGNXb3JrZXJDbGllbnRTZXR0aW5ncztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcnBjV29ya2VyQ2xpZW50Q2hpbGRPcHRpb25zIHtcbiAgd29ya2VyPzogV29ya2VyO1xuICBzZXR0aW5ncz86IEdycGNXb3JrZXJDbGllbnRTZXR0aW5ncztcbn1cblxuQE5nTW9kdWxlKClcbmV4cG9ydCBjbGFzcyBHcnBjV29ya2VyQ2xpZW50TW9kdWxlIHtcblxuICAvKipcbiAgICogQ3JlYXRlIEdycGNXb3JrZXJDbGllbnRNb2R1bGUgZm9yIHVzaW5nIGluIEFwcE1vZHVsZSAoYXBwbGljYXRpb24gcm9vdCBtb2R1bGUpXG4gICAqIFlvdSBjYW4gcHJvdmlkZSB0aGUgb3B0aW9ucyBoZXJlIGluc3RlYWQgb2YgaW5qZWN0aW5nIGNvcnJlc3BvbmRpbmcgdG9rZW5zIHNlcGFyYXRlbHlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChvcHRpb25zPzogR3JwY1dvcmtlckNsaWVudFJvb3RPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxHcnBjV29ya2VyQ2xpZW50TW9kdWxlPiB7XG4gICAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW1xuICAgICAgR3JwY1dvcmtlckdhdGV3YXksXG4gICAgICB7IHByb3ZpZGU6IEdSUENfQ0xJRU5UX0ZBQ1RPUlksIHVzZUNsYXNzOiBHcnBjV29ya2VyQ2xpZW50RmFjdG9yeSB9LFxuICAgIF07XG5cbiAgICBpZiAob3B0aW9ucz8ud29ya2VyKSB7XG4gICAgICBwcm92aWRlcnMucHVzaCh7IHByb3ZpZGU6IEdSUENfV09SS0VSLCB1c2VWYWx1ZTogb3B0aW9ucy53b3JrZXIgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LnNldHRpbmdzKSB7XG4gICAgICBwcm92aWRlcnMucHVzaCh7IHByb3ZpZGU6IEdSUENfV09SS0VSX0NMSUVOVF9ERUZBVUxUX1NFVFRJTkdTLCB1c2VWYWx1ZTogb3B0aW9ucy5zZXR0aW5ncyB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBuZ01vZHVsZTogR3JwY1dvcmtlckNsaWVudE1vZHVsZSwgcHJvdmlkZXJzIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIEdycGNXb3JrZXJDbGllbnRNb2R1bGUgZm9yIHVzaW5nIGluIGNoaWxkcmVuIG1vZHVsZXMgKGluY2wuIGxhenkgbW9kdWxlcylcbiAgICogWW91IGNhbiBwcm92aWRlIHRoZSBvcHRpb25zIGhlcmUgaW5zdGVhZCBvZiBpbmplY3RpbmcgY29ycmVzcG9uZGluZyB0b2tlbnMgc2VwYXJhdGVseVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBmb3JDaGlsZChvcHRpb25zPzogR3JwY1dvcmtlckNsaWVudENoaWxkT3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8R3JwY1dvcmtlckNsaWVudE1vZHVsZT4ge1xuICAgIGNvbnN0IHByb3ZpZGVyczogUHJvdmlkZXJbXSA9IFtcbiAgICAgIEdycGNXb3JrZXJHYXRld2F5LFxuICAgICAgeyBwcm92aWRlOiBHUlBDX0NMSUVOVF9GQUNUT1JZLCB1c2VDbGFzczogR3JwY1dvcmtlckNsaWVudEZhY3RvcnkgfSxcbiAgICBdO1xuXG4gICAgaWYgKG9wdGlvbnM/Lndvcmtlcikge1xuICAgICAgcHJvdmlkZXJzLnB1c2goeyBwcm92aWRlOiBHUlBDX1dPUktFUiwgdXNlVmFsdWU6IG9wdGlvbnMud29ya2VyIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5zZXR0aW5ncykge1xuICAgICAgcHJvdmlkZXJzLnB1c2goeyBwcm92aWRlOiBHUlBDX1dPUktFUl9DTElFTlRfREVGQVVMVF9TRVRUSU5HUywgdXNlVmFsdWU6IG9wdGlvbnMuc2V0dGluZ3MgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbmdNb2R1bGU6IEdycGNXb3JrZXJDbGllbnRNb2R1bGUsIHByb3ZpZGVycyB9O1xuICB9XG5cbn1cbiJdfQ==