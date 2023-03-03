import { GrpcMessage } from './grpc-message';
import { GrpcMessageClass } from './grpc-message-class';
/**
 * A message pool for using with `google.protobuf.Any`.
 * Pass the array of messages to be registered within the pool and give this pool to `toProtobufJSON` or to `unpack`.
 */
export declare class GrpcMessagePool {
    private index;
    constructor(messages: GrpcMessageClass<GrpcMessage>[]);
    add(messages: GrpcMessageClass<GrpcMessage>[]): void;
    get(id: string): GrpcMessageClass<GrpcMessage>;
}
