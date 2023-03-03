import { ModuleWithProviders } from '@angular/core';
import { GrpcWebClientSettings } from './grpc-web-client';
import * as i0 from "@angular/core";
export interface GrpcWebClientRootOptions {
    settings?: GrpcWebClientSettings;
}
export interface GrpcWebClientChildOptions {
    settings?: GrpcWebClientSettings;
}
export declare class GrpcWebClientModule {
    /**
     * Create GrpcWebClientModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options?: GrpcWebClientRootOptions): ModuleWithProviders<GrpcWebClientModule>;
    /**
     * Create GrpcWebClientModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options?: GrpcWebClientChildOptions): ModuleWithProviders<GrpcWebClientModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrpcWebClientModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GrpcWebClientModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GrpcWebClientModule>;
}
