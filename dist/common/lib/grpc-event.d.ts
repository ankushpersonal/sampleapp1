import { GrpcMessage } from './grpc-message';
import { GrpcMetadata } from './grpc-metadata';
/**
 * Data event. This event is emitted when the new message arrives from the server
 */
export declare class GrpcDataEvent<T extends GrpcMessage> {
    data: T;
    constructor(data: T);
}
/**
 * Status event. This event is emitted when the new status and metadata arrives from the server
 */
export declare class GrpcStatusEvent {
    statusCode: number;
    statusMessage: string;
    metadata: GrpcMetadata;
    constructor(statusCode: number, statusMessage: string, metadata: GrpcMetadata);
}
/**
 * GrpcEvent can be either data or status event
 */
export declare type GrpcEvent<T extends GrpcMessage> = GrpcDataEvent<T> | GrpcStatusEvent;
