import { GrpcMessage, RecursivePartial, ToProtobufJSONOptions } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Timestamp implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Timestamp;
    static fromDate(date: Date): Timestamp;
    static fromISOString(isoDate: string): Timestamp;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Timestamp): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Timestamp, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Timestamp, _writer: BinaryWriter): void;
    private _seconds;
    private _nanos;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Timestamp to deeply clone from
     */
    constructor(_value?: RecursivePartial<Timestamp.AsObject>);
    get seconds(): string;
    set seconds(value: string);
    get nanos(): number;
    set nanos(value: number);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Timestamp.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Timestamp.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Timestamp.AsProtobufJSON;
    fromDate(date: Date): void;
    toDate(): Date;
    fromISOString(isoDate: string): void;
    toISOString(): string;
}
export declare module Timestamp {
    /**
     * Standard JavaScript object representation for Timestamp
     */
    interface AsObject {
        seconds: string;
        nanos: number;
    }
    /**
     * Protobuf JSON representation for Timestamp
     */
    type AsProtobufJSON = string;
}
