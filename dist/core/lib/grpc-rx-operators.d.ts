import { GrpcDataEvent, GrpcEvent, GrpcMessage, GrpcStatusEvent } from '@ngx-grpc/common';
import { Observable } from 'rxjs';
/**
 * RxJS operator
 * When applied to gRPC events emits error for status events with a non-zero code (includes throwStatusErrors)
 *
 * @return Observable of gRPC events
 */
export declare function throwStatusErrors<T extends GrpcMessage>(): (source$: Observable<GrpcEvent<T>>) => Observable<GrpcStatusEvent | GrpcDataEvent<T>>;
/**
 * RxJS operator
 * When applied to gRPC events stream extracts and returns only messages
 *
 * @return Observable of messages
 */
export declare function takeMessages<T extends GrpcMessage>(): (source$: Observable<GrpcEvent<T>>) => Observable<T>;
