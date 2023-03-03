/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcEvent,
  GrpcMetadata,
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors,
} from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './app-service.pb';
import { GRPC_APP_SERVICE_CLIENT_SETTINGS } from './app-service.pbconf';
/**
 * Service client implementation for kubota.autonomous.services.komms.app.v1.AppService
 */
@Injectable({ providedIn: 'any' })
export class AppServiceClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /kubota.autonomous.services.komms.app.v1.AppService/Authenticate
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.AppServiceAuthenticateResponse>>
     */
    authenticate: (
      requestData: thisProto.AppServiceAuthenticateRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.AppServiceAuthenticateResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/kubota.autonomous.services.komms.app.v1.AppService/Authenticate',
        requestData,
        requestMetadata,
        requestClass: thisProto.AppServiceAuthenticateRequest,
        responseClass: thisProto.AppServiceAuthenticateResponse,
      });
    },
    /**
     * Unary call: /kubota.autonomous.services.komms.app.v1.AppService/AuthenticateRefresh
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.AppServiceAuthenticateRefreshResponse>>
     */
    authenticateRefresh: (
      requestData: thisProto.AppServiceAuthenticateRefreshRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<
      GrpcEvent<thisProto.AppServiceAuthenticateRefreshResponse>
    > => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/kubota.autonomous.services.komms.app.v1.AppService/AuthenticateRefresh',
        requestData,
        requestMetadata,
        requestClass: thisProto.AppServiceAuthenticateRefreshRequest,
        responseClass: thisProto.AppServiceAuthenticateRefreshResponse,
      });
    },
  };

  constructor(
    @Optional() @Inject(GRPC_APP_SERVICE_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient(
      'kubota.autonomous.services.komms.app.v1.AppService',
      settings
    );
  }

  /**
   * Unary call @/kubota.autonomous.services.komms.app.v1.AppService/Authenticate
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.AppServiceAuthenticateResponse>
   */
  authenticate(
    requestData: thisProto.AppServiceAuthenticateRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.AppServiceAuthenticateResponse> {
    return this.$raw
      .authenticate(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/kubota.autonomous.services.komms.app.v1.AppService/AuthenticateRefresh
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.AppServiceAuthenticateRefreshResponse>
   */
  authenticateRefresh(
    requestData: thisProto.AppServiceAuthenticateRefreshRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.AppServiceAuthenticateRefreshResponse> {
    return this.$raw
      .authenticateRefresh(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
