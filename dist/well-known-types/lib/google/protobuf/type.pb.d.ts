import { GrpcMessage, RecursivePartial, ToProtobufJSONOptions } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf000 from '../../google/protobuf/any.pb';
import * as googleProtobuf001 from '../../google/protobuf/source-context.pb';
export declare enum Syntax {
    SYNTAX_PROTO2 = 0,
    SYNTAX_PROTO3 = 1
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Type implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Type;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Type): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Type, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Type, _writer: BinaryWriter): void;
    private _name;
    private _fields?;
    private _oneofs;
    private _options?;
    private _sourceContext?;
    private _syntax;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Type to deeply clone from
     */
    constructor(_value?: RecursivePartial<Type.AsObject>);
    get name(): string;
    set name(value: string);
    get fields(): Field[] | undefined;
    set fields(value: Field[] | undefined);
    get oneofs(): string[];
    set oneofs(value: string[]);
    get options(): Option[] | undefined;
    set options(value: Option[] | undefined);
    get sourceContext(): googleProtobuf001.SourceContext | undefined;
    set sourceContext(value: googleProtobuf001.SourceContext | undefined);
    get syntax(): Syntax;
    set syntax(value: Syntax);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Type.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Type.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Type.AsProtobufJSON;
}
export declare module Type {
    /**
     * Standard JavaScript object representation for Type
     */
    interface AsObject {
        name: string;
        fields?: Field.AsObject[];
        oneofs: string[];
        options?: Option.AsObject[];
        sourceContext?: googleProtobuf001.SourceContext.AsObject;
        syntax: Syntax;
    }
    /**
     * Protobuf JSON representation for Type
     */
    interface AsProtobufJSON {
        name: string;
        fields: Field.AsProtobufJSON[] | null;
        oneofs: string[];
        options: Option.AsProtobufJSON[] | null;
        sourceContext: googleProtobuf001.SourceContext.AsProtobufJSON | null;
        syntax: string;
    }
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Field implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Field;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Field): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Field, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Field, _writer: BinaryWriter): void;
    private _kind;
    private _cardinality;
    private _number;
    private _name;
    private _typeUrl;
    private _oneofIndex;
    private _packed;
    private _options?;
    private _jsonName;
    private _defaultValue;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Field to deeply clone from
     */
    constructor(_value?: RecursivePartial<Field.AsObject>);
    get kind(): Field.Kind;
    set kind(value: Field.Kind);
    get cardinality(): Field.Cardinality;
    set cardinality(value: Field.Cardinality);
    get number(): number;
    set number(value: number);
    get name(): string;
    set name(value: string);
    get typeUrl(): string;
    set typeUrl(value: string);
    get oneofIndex(): number;
    set oneofIndex(value: number);
    get packed(): boolean;
    set packed(value: boolean);
    get options(): Option[] | undefined;
    set options(value: Option[] | undefined);
    get jsonName(): string;
    set jsonName(value: string);
    get defaultValue(): string;
    set defaultValue(value: string);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Field.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Field.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Field.AsProtobufJSON;
}
export declare module Field {
    /**
     * Standard JavaScript object representation for Field
     */
    interface AsObject {
        kind: Field.Kind;
        cardinality: Field.Cardinality;
        number: number;
        name: string;
        typeUrl: string;
        oneofIndex: number;
        packed: boolean;
        options?: Option.AsObject[];
        jsonName: string;
        defaultValue: string;
    }
    /**
     * Protobuf JSON representation for Field
     */
    interface AsProtobufJSON {
        kind: string;
        cardinality: string;
        number: number;
        name: string;
        typeUrl: string;
        oneofIndex: number;
        packed: boolean;
        options: Option.AsProtobufJSON[] | null;
        jsonName: string;
        defaultValue: string;
    }
    enum Kind {
        TYPE_UNKNOWN = 0,
        TYPE_DOUBLE = 1,
        TYPE_FLOAT = 2,
        TYPE_INT64 = 3,
        TYPE_UINT64 = 4,
        TYPE_INT32 = 5,
        TYPE_FIXED64 = 6,
        TYPE_FIXED32 = 7,
        TYPE_BOOL = 8,
        TYPE_STRING = 9,
        TYPE_GROUP = 10,
        TYPE_MESSAGE = 11,
        TYPE_BYTES = 12,
        TYPE_UINT32 = 13,
        TYPE_ENUM = 14,
        TYPE_SFIXED32 = 15,
        TYPE_SFIXED64 = 16,
        TYPE_SINT32 = 17,
        TYPE_SINT64 = 18
    }
    enum Cardinality {
        CARDINALITY_UNKNOWN = 0,
        CARDINALITY_OPTIONAL = 1,
        CARDINALITY_REQUIRED = 2,
        CARDINALITY_REPEATED = 3
    }
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Enum implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Enum;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Enum): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Enum, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Enum, _writer: BinaryWriter): void;
    private _name;
    private _enumvalue?;
    private _options?;
    private _sourceContext?;
    private _syntax;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Enum to deeply clone from
     */
    constructor(_value?: RecursivePartial<Enum.AsObject>);
    get name(): string;
    set name(value: string);
    get enumvalue(): EnumValue[] | undefined;
    set enumvalue(value: EnumValue[] | undefined);
    get options(): Option[] | undefined;
    set options(value: Option[] | undefined);
    get sourceContext(): googleProtobuf001.SourceContext | undefined;
    set sourceContext(value: googleProtobuf001.SourceContext | undefined);
    get syntax(): Syntax;
    set syntax(value: Syntax);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Enum.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Enum.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Enum.AsProtobufJSON;
}
export declare module Enum {
    /**
     * Standard JavaScript object representation for Enum
     */
    interface AsObject {
        name: string;
        enumvalue?: EnumValue.AsObject[];
        options?: Option.AsObject[];
        sourceContext?: googleProtobuf001.SourceContext.AsObject;
        syntax: Syntax;
    }
    /**
     * Protobuf JSON representation for Enum
     */
    interface AsProtobufJSON {
        name: string;
        enumvalue: EnumValue.AsProtobufJSON[] | null;
        options: Option.AsProtobufJSON[] | null;
        sourceContext: googleProtobuf001.SourceContext.AsProtobufJSON | null;
        syntax: string;
    }
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class EnumValue implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): EnumValue;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: EnumValue): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: EnumValue, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: EnumValue, _writer: BinaryWriter): void;
    private _name;
    private _number;
    private _options?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of EnumValue to deeply clone from
     */
    constructor(_value?: RecursivePartial<EnumValue.AsObject>);
    get name(): string;
    set name(value: string);
    get number(): number;
    set number(value: number);
    get options(): Option[] | undefined;
    set options(value: Option[] | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): EnumValue.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): EnumValue.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): EnumValue.AsProtobufJSON;
}
export declare module EnumValue {
    /**
     * Standard JavaScript object representation for EnumValue
     */
    interface AsObject {
        name: string;
        number: number;
        options?: Option.AsObject[];
    }
    /**
     * Protobuf JSON representation for EnumValue
     */
    interface AsProtobufJSON {
        name: string;
        number: number;
        options: Option.AsProtobufJSON[] | null;
    }
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Option implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Option;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Option): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Option, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Option, _writer: BinaryWriter): void;
    private _name;
    private _value?;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Option to deeply clone from
     */
    constructor(_value?: RecursivePartial<Option.AsObject>);
    get name(): string;
    set name(value: string);
    get value(): googleProtobuf000.Any | undefined;
    set value(value: googleProtobuf000.Any | undefined);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Option.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Option.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Option.AsProtobufJSON;
}
export declare module Option {
    /**
     * Standard JavaScript object representation for Option
     */
    interface AsObject {
        name: string;
        value?: googleProtobuf000.Any.AsObject;
    }
    /**
     * Protobuf JSON representation for Option
     */
    interface AsProtobufJSON {
        name: string;
        value: googleProtobuf000.Any.AsProtobufJSON | null;
    }
}
