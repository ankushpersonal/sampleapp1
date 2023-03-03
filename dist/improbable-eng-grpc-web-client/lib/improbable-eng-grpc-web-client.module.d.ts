import { ModuleWithProviders } from '@angular/core';
import { ImprobableEngGrpcWebClientSettings } from './improbable-eng-grpc-web-client';
import * as i0 from "@angular/core";
export interface ImprobableEngGrpcWebClientRootOptions {
    settings?: ImprobableEngGrpcWebClientSettings;
}
export interface ImprobableEngGrpcWebClientChildOptions {
    settings?: ImprobableEngGrpcWebClientSettings;
}
export declare class ImprobableEngGrpcWebClientModule {
    /**
     * Create ImprobableEngGrpcWebClientModule for using in AppModule (application root module)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forRoot(options?: ImprobableEngGrpcWebClientRootOptions): ModuleWithProviders<ImprobableEngGrpcWebClientModule>;
    /**
     * Create ImprobableEngGrpcWebClientModule for using in children modules (incl. lazy modules)
     * You can provide the options here instead of injecting corresponding tokens separately
     */
    static forChild(options?: ImprobableEngGrpcWebClientChildOptions): ModuleWithProviders<ImprobableEngGrpcWebClientModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImprobableEngGrpcWebClientModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ImprobableEngGrpcWebClientModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ImprobableEngGrpcWebClientModule>;
}
