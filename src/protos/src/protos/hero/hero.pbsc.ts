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
import * as thisProto from './hero.pb';
import { GRPC_HERO_SERVICE_CLIENT_SETTINGS } from './hero.pbconf';
/**
 * Service client implementation for hero.HeroService
 */
@Injectable({ providedIn: 'any' })
export class HeroServiceClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /hero.HeroService/FindOne
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.Hero>>
     */
    findOne: (
      requestData: thisProto.HeroById,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.Hero>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/hero.HeroService/FindOne',
        requestData,
        requestMetadata,
        requestClass: thisProto.HeroById,
        responseClass: thisProto.Hero,
      });
    },
  };

  constructor(
    @Optional() @Inject(GRPC_HERO_SERVICE_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient('hero.HeroService', settings);
  }

  /**
   * Unary call @/hero.HeroService/FindOne
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.Hero>
   */
  findOne(
    requestData: thisProto.HeroById,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.Hero> {
    return this.$raw
      .findOne(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
