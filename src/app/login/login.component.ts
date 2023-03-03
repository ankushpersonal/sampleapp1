import { Component } from '@angular/core';
import { HeroServiceClient } from 'src/protos/src/protos/hero/hero.pbsc';
import { HeroById, Hero } from 'src/protos/src/protos/hero/hero.pb';
import { AppServiceClient } from 'src/protos/src/protos/kubota/app-service.pbsc';
import { AppServiceAuthenticateRequest, AppServiceAuthenticateResponse } from 'src/protos/src/protos/kubota/app-service.pb';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public client: HeroServiceClient, public appsvc: AppServiceClient) { }

  callFunction() {
    const request = this.findRequest();
    this.client.findOne(request)
    .subscribe(res => {
      console.log(res);
    })
  }

  callFunc2() {
    const authRequest = this.authRequest();
    this.appsvc.authenticate(authRequest)
    .subscribe(response => {
      console.log(response);
    });
  }

  authRequest() {
    const auth = new AppServiceAuthenticateRequest();
    auth.username = "komms-admin";
    auth.password = "sdfwd";
    return auth;
  }
  findRequest() {
    const herobyid = new HeroById();
    herobyid.id = 2;
    return herobyid;
  }

}
