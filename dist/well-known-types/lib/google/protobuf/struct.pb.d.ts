import { GrpcMessage, RecursivePartial, ToProtobufJSONOptions } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
export declare enum NullValue {
    NULL_VALUE = 0
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Struct implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Struct;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Struct): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Struct, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Struct, _writer: BinaryWriter): void;
    private _fields;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Struct to deeply clone from
     */
    constructor(_value?: RecursivePartial<Struct.AsObject>);
    get fields(): {
        [prop: string]: Value;
    };
    set fields(value: {
        [prop: string]: Value;
    });
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Struct.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Struct.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Struct.AsProtobufJSON;
}
export declare module Struct {
    /**
     * Standard JavaScript object representation for Struct
     */
    interface AsObject {
        fields: {
            [prop: string]: Value;
        };
    }
    /**
     * Protobuf JSON representation for Struct
     */
    type AsProtobufJSON = {
        [prop: string]: Value.AsProtobufJSON;
    };
    /**
     * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
     */
    class FieldsEntry implements GrpcMessage {
        static id: string;
        /**
         * Deserialize binary data to message
         * @param instance message instance
         */
        static deserializeBinary(bytes: ByteSource): FieldsEntry;
        /**
         * Check all the properties and set default protobuf values if necessary
         * @param _instance message instance
         */
        static refineValues(_instance: FieldsEntry): void;
        /**
         * Deserializes / reads binary message into message instance using provided binary reader
         * @param _instance message instance
         * @param _reader binary reader instance
         */
        static deserializeBinaryFromReader(_instance: FieldsEntry, _reader: BinaryReader): void;
        /**
         * Serializes a message to binary format using provided binary reader
         * @param _instance message instance
         * @param _writer binary writer instance
         */
        static serializeBinaryToWriter(_instance: FieldsEntry, _writer: BinaryWriter): void;
        private _key;
        private _value?;
        /**
         * Message constructor. Initializes the properties and applies default Protobuf values if necessary
         * @param _value initial values object or instance of FieldsEntry to deeply clone from
         */
        constructor(_value?: RecursivePartial<FieldsEntry.AsObject>);
        get key(): string;
        set key(value: string);
        get value(): Value | undefined;
        set value(value: Value | undefined);
        /**
         * Serialize message to binary data
         * @param instance message instance
         */
        serializeBinary(): Uint8Array;
        /**
         * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
         */
        toObject(): FieldsEntry.AsObject;
        /**
         * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
         */
        toJSON(): FieldsEntry.AsObject;
        /**
         * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
         * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
         * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
         */
        toProtobufJSON(options?: ToProtobufJSONOptions): FieldsEntry.AsProtobufJSON;
    }
    module FieldsEntry {
        /**
         * Standard JavaScript object representation for FieldsEntry
         */
        interface AsObject {
            key: string;
            value?: Value.AsObject;
        }
        /**
         * Protobuf JSON representation for FieldsEntry
         */
        interface AsProtobufJSON {
            key: string;
            value: Value.AsProtobufJSON | null;
        }
    }
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Value implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Value;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Value): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Value, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Value, _writer: BinaryWriter): void;
    private _nullValue;
    private _numberValue;
    private _stringValue;
    private _boolValue;
    private _structValue?;
    private _listValue?;
    private _kind;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Value to deeply clone from
     */
    constructor(_value?: RecursivePartial<Value.AsObject>);
    get nullValue(): NullValue;
    set nullValue(value: NullValue);
    get numberValue(): number;
    set numberValue(value: number);
    get stringValue(): string;
    set stringValue(value: string);
    get boolValue(): boolean;
    set boolValue(value: boolean);
    get structValue(): Struct | undefined;
    set structValue(value: Struct | undefined);
    get listValue(): ListValue | undefined;
    set listValue(value: ListValue | undefined);
    get kind(): Value.KindCase;
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Value.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Value.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Value.AsProtobufJSON;
}
export declare module Value {
    /**
     * Standard JavaScript object representation for Value
     */
    interface AsObject {
        nullValue: NullValue;
        numberValue: number;
        stringValue: string;
        boolValue: boolean;
        structValue?: Struct.AsObject;
        listValue?: ListValue.AsObject;
    }
    /**
     * Protobuf JSON representation for Value
     */
    type AsProtobufJSON = null | string | number | boolean | Struct.AsProtobufJSON | Value.AsProtobufJSON[];
    enum KindCase {
        none = 0,
        nullValue = 1,
        numberValue = 2,
        stringValue = 3,
        boolValue = 4,
        structValue = 5,
        listValue = 6
    }
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class ListValue implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): ListValue;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: ListValue): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: ListValue, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: ListValue, _writer: BinaryWriter): void;
    private _values?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of ListValue to deeply clone from
     */
    constructor(_value?: RecursivePartial<ListValue.AsObject>);
    get values(): Value[] | undefined;
    set values(value: Value[] | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): ListValue.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): ListValue.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): ListValue.AsProtobufJSON;
}
export declare module ListValue {
    /**
     * Standard JavaScript object representation for ListValue
     */
    interface AsObject {
        values?: Value.AsObject[];
    }
    /**
     * Protobuf JSON representation for ListValue
     */
    type AsProtobufJSON = Value.AsProtobufJSON[];
}
