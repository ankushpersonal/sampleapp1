import { NgModule } from '@angular/core';
import { GrpcHandler } from './grpc-handler';
import * as i0 from "@angular/core";
export class GrpcCoreModule {
    /**
     * Create GrpcCoreModule for using in AppModule (application root module)
     */
    static forRoot() {
        return {
            ngModule: GrpcCoreModule,
            providers: [
                GrpcHandler,
            ],
        };
    }
    /**
     * Create GrpcCoreModule for using in children modules (incl. lazy modules)
     */
    static forChild() {
        return {
            ngModule: GrpcCoreModule,
            providers: [
                GrpcHandler,
            ],
        };
    }
}
GrpcCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GrpcCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcCoreModule });
GrpcCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcCoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.3", ngImport: i0, type: GrpcCoreModule, decorators: [{
            type: NgModule
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JwYy1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2xpYi9ncnBjLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHN0MsTUFBTSxPQUFPLGNBQWM7SUFFekI7O09BRUc7SUFDSSxNQUFNLENBQUMsT0FBTztRQUNuQixPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7YUFDWjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsUUFBUTtRQUNwQixPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULFdBQVc7YUFDWjtTQUNGLENBQUM7SUFDSixDQUFDOzsyR0F4QlUsY0FBYzs0R0FBZCxjQUFjOzRHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcnBjSGFuZGxlciB9IGZyb20gJy4vZ3JwYy1oYW5kbGVyJztcblxuQE5nTW9kdWxlKClcbmV4cG9ydCBjbGFzcyBHcnBjQ29yZU1vZHVsZSB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBHcnBjQ29yZU1vZHVsZSBmb3IgdXNpbmcgaW4gQXBwTW9kdWxlIChhcHBsaWNhdGlvbiByb290IG1vZHVsZSlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEdycGNDb3JlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBHcnBjQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBHcnBjSGFuZGxlcixcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgR3JwY0NvcmVNb2R1bGUgZm9yIHVzaW5nIGluIGNoaWxkcmVuIG1vZHVsZXMgKGluY2wuIGxhenkgbW9kdWxlcylcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxHcnBjQ29yZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogR3JwY0NvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgR3JwY0hhbmRsZXIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxufVxuIl19