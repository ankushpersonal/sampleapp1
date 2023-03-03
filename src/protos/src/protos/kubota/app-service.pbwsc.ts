/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcCallType } from '@ngx-grpc/common';
import { GrpcWorkerServiceClientDef } from '@ngx-grpc/worker';
import * as thisProto from './app-service.pb';

/**
 * Client definition for use in worker
 */
export const GrpcWorkerAppServiceClientDef: GrpcWorkerServiceClientDef = {
  serviceId: 'kubota.autonomous.services.komms.app.v1.AppService',
  methods: {
    '/kubota.autonomous.services.komms.app.v1.AppService/Authenticate': {
      type: GrpcCallType.unary,
      reqclss: thisProto.AppServiceAuthenticateRequest,
      resclss: thisProto.AppServiceAuthenticateResponse,
    },
    '/kubota.autonomous.services.komms.app.v1.AppService/AuthenticateRefresh': {
      type: GrpcCallType.unary,
      reqclss: thisProto.AppServiceAuthenticateRefreshRequest,
      resclss: thisProto.AppServiceAuthenticateRefreshResponse,
    },
  },
};
