import { GrpcMessage, GrpcMessageClass, GrpcMessagePool, RecursivePartial, ToProtobufJSONOptions } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Any implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Any;
    private static prefix;
    /**
     * Create a new Any instance with a packed message
     */
    static pack(msg: GrpcMessage): Any;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Any): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Any, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Any, _writer: BinaryWriter): void;
    private _typeUrl;
    private _value;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Any to deeply clone from
     */
    constructor(_value?: RecursivePartial<Any.AsObject>);
    get typeUrl(): string;
    set typeUrl(value: string);
    get value(): Uint8Array;
    set value(value: Uint8Array);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Any.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Any.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Any.AsProtobufJSON;
    /**
     * Get the packed message id based on typeUrl.
     * If no typeUrl is provided null is returned.
     */
    getPackedMessageId(): string;
    /**
     * Get the type of the packed message.
     * Requires predefined GrpcMessagePool with expected message types within.
     * If no type is found within the pool the error is thrown, unless throwWhenNotInThePool is set to false; in this case null will be returned.
     */
    getPackedMessageType(messagePool: GrpcMessagePool, throwWhenNotInThePool?: boolean): GrpcMessageClass<GrpcMessage>;
    /**
     * Unpack the current value into a message.
     * Requires predefined GrpcMessagePool with expected message types within.
     * If no type is found within the pool the error is thrown.
     */
    unpack<M extends GrpcMessage>(messagePool: GrpcMessagePool): M;
    /**
     * Pack the given message into current Any instance
     */
    pack(msg: GrpcMessage): void;
}
export declare module Any {
    /**
     * Standard JavaScript object representation for Any
     */
    interface AsObject {
        typeUrl: string;
        value: Uint8Array;
    }
    /**
     * Protobuf JSON representation for Any
     */
    type AsProtobufJSON = {
        '@type': string;
        value?: string;
        [prop: string]: any;
    };
}
