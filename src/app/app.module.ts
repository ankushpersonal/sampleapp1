import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeroServiceClient } from 'src/protos/src/protos/hero/hero.pbsc';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { GrpcWebClientModule } from '@ngx-grpc/grpc-web-client';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GrpcCoreModule.forChild(),
    GrpcWebClientModule.forChild({
      settings: { host: 'http://localhost:8080' },
    }),
  ],
  providers: [
    HeroServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
