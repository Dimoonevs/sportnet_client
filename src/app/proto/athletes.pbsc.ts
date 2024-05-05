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
  GrpcMetadata
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors
} from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './athletes.pb';
import { GRPC_ATHLETE_SERVICE_CLIENT_SETTINGS } from './athletes.pbconf';
/**
 * Service client implementation for athletes.AthleteService
 */
@Injectable({ providedIn: 'any' })
export class AthleteServiceClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /athletes.AthleteService/CreateAthlete
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.AthleteResponse>>
     */
    createAthlete: (
      requestData: thisProto.AthleteRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.AthleteResponse>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/athletes.AthleteService/CreateAthlete',
        requestData,
        requestMetadata,
        requestClass: thisProto.AthleteRequest,
        responseClass: thisProto.AthleteResponse
      });
    },
    /**
     * Server streaming: /athletes.AthleteService/GetAthletes
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.AthleteRequest>>
     */
    getAthletes: (
      requestData: thisProto.GetAthletesRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.AthleteRequest>> => {
      return this.handler.handle({
        type: GrpcCallType.serverStream,
        client: this.client,
        path: '/athletes.AthleteService/GetAthletes',
        requestData,
        requestMetadata,
        requestClass: thisProto.GetAthletesRequest,
        responseClass: thisProto.AthleteRequest
      });
    }
  };

  constructor(
    @Optional() @Inject(GRPC_ATHLETE_SERVICE_CLIENT_SETTINGS) settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient(
      'athletes.AthleteService',
      settings
    );
  }

  /**
   * Unary call @/athletes.AthleteService/CreateAthlete
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.AthleteResponse>
   */
  createAthlete(
    requestData: thisProto.AthleteRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.AthleteResponse> {
    return this.$raw
      .createAthlete(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Server streaming @/athletes.AthleteService/GetAthletes
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.AthleteRequest>
   */
  getAthletes(
    requestData: thisProto.GetAthletesRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.AthleteRequest> {
    return this.$raw
      .getAthletes(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
