import { ModuleWithProviders } from '@angular/core';
import { GrpcWorkerClientSettings } from './grpc-worker-client';
import * as i0 from "@angular/core";
export interface GrpcWorkerClientRootOptions {
    worker?: Worker;
    settings?: GrpcWorkerClientSettings;
}
export interface GrpcWorkerClientChildOptions {
    worker?: Worker;
    settings?: GrpcWorkerClientSettings;
}
export declare class GrpcWorkerClientModule {
    /**
     * Create GrpcWorkerClientModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options?: GrpcWorkerClientRootOptions): ModuleWithProviders<GrpcWorkerClientModule>;
    /**
     * Create GrpcWorkerClientModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options?: GrpcWorkerClientChildOptions): ModuleWithProviders<GrpcWorkerClientModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrpcWorkerClientModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GrpcWorkerClientModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GrpcWorkerClientModule>;
}
