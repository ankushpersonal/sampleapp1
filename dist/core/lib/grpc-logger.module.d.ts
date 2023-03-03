import { ModuleWithProviders } from '@angular/core';
import { GrpcLoggerSettings } from './grpc-logger-interceptor';
import * as i0 from "@angular/core";
export interface GrpcLoggerRootOptions {
    settings: GrpcLoggerSettings;
}
export interface GrpcLoggerChildOptions {
    settings: GrpcLoggerSettings;
}
export declare class GrpcLoggerModule {
    /**
     * Create GrpcLoggerModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options?: GrpcLoggerRootOptions): ModuleWithProviders<GrpcLoggerModule>;
    /**
     * Create GrpcCoreModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options?: GrpcLoggerChildOptions): ModuleWithProviders<GrpcLoggerModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrpcLoggerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GrpcLoggerModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GrpcLoggerModule>;
}
