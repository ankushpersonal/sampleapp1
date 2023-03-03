/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { GrpcCallType } from '@ngx-grpc/common';
import { GrpcWorkerServiceClientDef } from '@ngx-grpc/worker';
import * as thisProto from './hero.pb';

/**
 * Client definition for use in worker
 */
export const GrpcWorkerHeroServiceClientDef: GrpcWorkerServiceClientDef = {
  serviceId: 'hero.HeroService',
  methods: {
    '/hero.HeroService/FindOne': {
      type: GrpcCallType.unary,
      reqclss: thisProto.HeroById,
      resclss: thisProto.Hero,
    },
  },
};
