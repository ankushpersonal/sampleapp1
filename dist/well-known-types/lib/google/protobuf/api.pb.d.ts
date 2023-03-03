import { GrpcMessage, RecursivePartial, ToProtobufJSONOptions } from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleProtobuf001 from '../../google/protobuf/source-context.pb';
import * as googleProtobuf002 from '../../google/protobuf/type.pb';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Api implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Api;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Api): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Api, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Api, _writer: BinaryWriter): void;
    private _name;
    private _methods?;
    private _options?;
    private _version;
    private _sourceContext?;
    private _mixins?;
    private _syntax;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Api to deeply clone from
     */
    constructor(_value?: RecursivePartial<Api.AsObject>);
    get name(): string;
    set name(value: string);
    get methods(): Method[] | undefined;
    set methods(value: Method[] | undefined);
    get options(): googleProtobuf002.Option[] | undefined;
    set options(value: googleProtobuf002.Option[] | undefined);
    get version(): string;
    set version(value: string);
    get sourceContext(): googleProtobuf001.SourceContext | undefined;
    set sourceContext(value: googleProtobuf001.SourceContext | undefined);
    get mixins(): Mixin[] | undefined;
    set mixins(value: Mixin[] | undefined);
    get syntax(): googleProtobuf002.Syntax;
    set syntax(value: googleProtobuf002.Syntax);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Api.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Api.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Api.AsProtobufJSON;
}
export declare module Api {
    /**
     * Standard JavaScript object representation for Api
     */
    interface AsObject {
        name: string;
        methods?: Method.AsObject[];
        options?: googleProtobuf002.Option.AsObject[];
        version: string;
        sourceContext?: googleProtobuf001.SourceContext.AsObject;
        mixins?: Mixin.AsObject[];
        syntax: googleProtobuf002.Syntax;
    }
    /**
     * Protobuf JSON representation for Api
     */
    interface AsProtobufJSON {
        name: string;
        methods: Method.AsProtobufJSON[] | null;
        options: googleProtobuf002.Option.AsProtobufJSON[] | null;
        version: string;
        sourceContext: googleProtobuf001.SourceContext.AsProtobufJSON | null;
        mixins: Mixin.AsProtobufJSON[] | null;
        syntax: string;
    }
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Method implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Method;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Method): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Method, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Method, _writer: BinaryWriter): void;
    private _name;
    private _requestTypeUrl;
    private _requestStreaming;
    private _responseTypeUrl;
    private _responseStreaming;
    private _options?;
    private _syntax;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Method to deeply clone from
     */
    constructor(_value?: RecursivePartial<Method.AsObject>);
    get name(): string;
    set name(value: string);
    get requestTypeUrl(): string;
    set requestTypeUrl(value: string);
    get requestStreaming(): boolean;
    set requestStreaming(value: boolean);
    get responseTypeUrl(): string;
    set responseTypeUrl(value: string);
    get responseStreaming(): boolean;
    set responseStreaming(value: boolean);
    get options(): googleProtobuf002.Option[] | undefined;
    set options(value: googleProtobuf002.Option[] | undefined);
    get syntax(): googleProtobuf002.Syntax;
    set syntax(value: googleProtobuf002.Syntax);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Method.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Method.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Method.AsProtobufJSON;
}
export declare module Method {
    /**
     * Standard JavaScript object representation for Method
     */
    interface AsObject {
        name: string;
        requestTypeUrl: string;
        requestStreaming: boolean;
        responseTypeUrl: string;
        responseStreaming: boolean;
        options?: googleProtobuf002.Option.AsObject[];
        syntax: googleProtobuf002.Syntax;
    }
    /**
     * Protobuf JSON representation for Method
     */
    interface AsProtobufJSON {
        name: string;
        requestTypeUrl: string;
        requestStreaming: boolean;
        responseTypeUrl: string;
        responseStreaming: boolean;
        options: googleProtobuf002.Option.AsProtobufJSON[] | null;
        syntax: string;
    }
}
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export declare class Mixin implements GrpcMessage {
    static id: string;
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource): Mixin;
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: Mixin): void;
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance: Mixin, _reader: BinaryReader): void;
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance: Mixin, _writer: BinaryWriter): void;
    private _name;
    private _root;
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Mixin to deeply clone from
     */
    constructor(_value?: RecursivePartial<Mixin.AsObject>);
    get name(): string;
    set name(value: string);
    get root(): string;
    set root(value: string);
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary(): Uint8Array;
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): Mixin.AsObject;
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON(): Mixin.AsObject;
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(options?: ToProtobufJSONOptions): Mixin.AsProtobufJSON;
}
export declare module Mixin {
    /**
     * Standard JavaScript object representation for Mixin
     */
    interface AsObject {
        name: string;
        root: string;
    }
    /**
     * Protobuf JSON representation for Mixin
     */
    interface AsProtobufJSON {
        name: string;
        root: string;
    }
}
