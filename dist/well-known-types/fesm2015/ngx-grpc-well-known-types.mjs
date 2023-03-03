import { BinaryReader, BinaryWriter } from 'google-protobuf';
import { uint8ArrayToBase64 } from '@ngx-grpc/common';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Any {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Any to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.typeUrl = _value.typeUrl;
        this.value = _value.value;
        Any.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Any();
        Any.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Create a new Any instance with a packed message
     */
    static pack(msg) {
        const any = new Any();
        any.pack(msg);
        return any;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.typeUrl = _instance.typeUrl || '';
        _instance.value = _instance.value || new Uint8Array();
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.typeUrl = _reader.readString();
                    break;
                case 2:
                    _instance.value = _reader.readBytes();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Any.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.typeUrl) {
            _writer.writeString(1, _instance.typeUrl);
        }
        if (_instance.value && _instance.value.length) {
            _writer.writeBytes(2, _instance.value);
        }
    }
    get typeUrl() {
        return this._typeUrl;
    }
    set typeUrl(value) {
        this._typeUrl = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Any.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            typeUrl: this.typeUrl,
            value: this.value ? this.value.subarray(0) : new Uint8Array(),
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        if (!(options === null || options === void 0 ? void 0 : options.messagePool)) {
            throw new Error(`Message pool is required to cast Any to JSON`);
        }
        const msg = this.unpack(options.messagePool);
        if (!msg) {
            return { '@type': this.typeUrl };
        }
        const json = msg.toProtobufJSON(options);
        if (typeof json !== 'object') {
            return { '@type': this.typeUrl, value: json };
        }
        return Object.assign(Object.assign({}, json), { '@type': this.typeUrl });
    }
    /**
     * Get the packed message id based on typeUrl.
     * If no typeUrl is provided null is returned.
     */
    getPackedMessageId() {
        if (!this.typeUrl) {
            return null;
        }
        if (!this.typeUrl.startsWith(Any.prefix)) {
            throw new Error(`Type URL does not start with ${Any.prefix}`);
        }
        return this.typeUrl.substr(Any.prefix.length);
    }
    /**
     * Get the type of the packed message.
     * Requires predefined GrpcMessagePool with expected message types within.
     * If no type is found within the pool the error is thrown, unless throwWhenNotInThePool is set to false; in this case null will be returned.
     */
    getPackedMessageType(messagePool, throwWhenNotInThePool = true) {
        const id = this.getPackedMessageId();
        if (!id) {
            return null;
        }
        const msgClass = messagePool.get(id);
        if (!msgClass) {
            if (throwWhenNotInThePool) {
                throw new Error(`Message with identifier '${this.typeUrl}' is not present in message pool`);
            }
            else {
                return null;
            }
        }
        return msgClass;
    }
    /**
     * Unpack the current value into a message.
     * Requires predefined GrpcMessagePool with expected message types within.
     * If no type is found within the pool the error is thrown.
     */
    unpack(messagePool) {
        const messageClass = this.getPackedMessageType(messagePool);
        if (!messageClass) {
            throw new Error(`Message type cannot be resolved`);
        }
        if (!this.value) {
            throw new Error(`Cannot unpack value that is unset`);
        }
        return messageClass.deserializeBinary(this.value);
    }
    /**
     * Pack the given message into current Any instance
     */
    pack(msg) {
        const { id } = msg.constructor;
        if (!id) {
            throw new Error(`Message is invalid or does not have an id`);
        }
        this.typeUrl = `${Any.prefix}${id}`;
        this.value = msg.serializeBinary();
    }
}
Any.id = 'google.protobuf.Any';
Any.prefix = 'type.googleapis.com/';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class SourceContext {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of SourceContext to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.fileName = _value.fileName;
        SourceContext.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new SourceContext();
        SourceContext.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.fileName = _instance.fileName || '';
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.fileName = _reader.readString();
                    break;
                default:
                    _reader.skipField();
            }
        }
        SourceContext.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.fileName) {
            _writer.writeString(1, _instance.fileName);
        }
    }
    get fileName() {
        return this._fileName;
    }
    set fileName(value) {
        this._fileName = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        SourceContext.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            fileName: this.fileName,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            fileName: this.fileName,
        };
    }
}
SourceContext.id = 'google.protobuf.SourceContext';

var Syntax;
(function (Syntax) {
    Syntax[Syntax["SYNTAX_PROTO2"] = 0] = "SYNTAX_PROTO2";
    Syntax[Syntax["SYNTAX_PROTO3"] = 1] = "SYNTAX_PROTO3";
})(Syntax || (Syntax = {}));
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Type {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Type to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.name = _value.name;
        this.fields = (_value.fields || []).map((m) => new Field(m));
        this.oneofs = (_value.oneofs || []).slice();
        this.options = (_value.options || []).map((m) => new Option(m));
        this.sourceContext = _value.sourceContext
            ? new SourceContext(_value.sourceContext)
            : undefined;
        this.syntax = _value.syntax;
        Type.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Type();
        Type.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.name = _instance.name || '';
        _instance.fields = _instance.fields || [];
        _instance.oneofs = _instance.oneofs || [];
        _instance.options = _instance.options || [];
        _instance.sourceContext = _instance.sourceContext || undefined;
        _instance.syntax = _instance.syntax || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.name = _reader.readString();
                    break;
                case 2:
                    const messageInitializer2 = new Field();
                    _reader.readMessage(messageInitializer2, Field.deserializeBinaryFromReader);
                    (_instance.fields = _instance.fields || []).push(messageInitializer2);
                    break;
                case 3:
                    (_instance.oneofs = _instance.oneofs || []).push(_reader.readString());
                    break;
                case 4:
                    const messageInitializer4 = new Option();
                    _reader.readMessage(messageInitializer4, Option.deserializeBinaryFromReader);
                    (_instance.options = _instance.options || []).push(messageInitializer4);
                    break;
                case 5:
                    _instance.sourceContext = new SourceContext();
                    _reader.readMessage(_instance.sourceContext, SourceContext.deserializeBinaryFromReader);
                    break;
                case 6:
                    _instance.syntax = _reader.readEnum();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Type.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.name) {
            _writer.writeString(1, _instance.name);
        }
        if (_instance.fields && _instance.fields.length) {
            _writer.writeRepeatedMessage(2, _instance.fields, Field.serializeBinaryToWriter);
        }
        if (_instance.oneofs && _instance.oneofs.length) {
            _writer.writeRepeatedString(3, _instance.oneofs);
        }
        if (_instance.options && _instance.options.length) {
            _writer.writeRepeatedMessage(4, _instance.options, Option.serializeBinaryToWriter);
        }
        if (_instance.sourceContext) {
            _writer.writeMessage(5, _instance.sourceContext, SourceContext.serializeBinaryToWriter);
        }
        if (_instance.syntax) {
            _writer.writeEnum(6, _instance.syntax);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = value;
    }
    get oneofs() {
        return this._oneofs;
    }
    set oneofs(value) {
        this._oneofs = value;
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }
    get sourceContext() {
        return this._sourceContext;
    }
    set sourceContext(value) {
        this._sourceContext = value;
    }
    get syntax() {
        return this._syntax;
    }
    set syntax(value) {
        this._syntax = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Type.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            name: this.name,
            fields: (this.fields || []).map((m) => m.toObject()),
            oneofs: (this.oneofs || []).slice(),
            options: (this.options || []).map((m) => m.toObject()),
            sourceContext: this.sourceContext
                ? this.sourceContext.toObject()
                : undefined,
            syntax: this.syntax,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            name: this.name,
            fields: (this.fields || []).map((m) => m.toProtobufJSON(options)),
            oneofs: (this.oneofs || []).slice(),
            options: (this.options || []).map((m) => m.toProtobufJSON(options)),
            sourceContext: this.sourceContext
                ? this.sourceContext.toProtobufJSON(options)
                : null,
            syntax: Syntax[this.syntax === null || this.syntax === undefined ? 0 : this.syntax],
        };
    }
}
Type.id = 'google.protobuf.Type';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Field {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Field to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.kind = _value.kind;
        this.cardinality = _value.cardinality;
        this.number = _value.number;
        this.name = _value.name;
        this.typeUrl = _value.typeUrl;
        this.oneofIndex = _value.oneofIndex;
        this.packed = _value.packed;
        this.options = (_value.options || []).map((m) => new Option(m));
        this.jsonName = _value.jsonName;
        this.defaultValue = _value.defaultValue;
        Field.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Field();
        Field.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.kind = _instance.kind || 0;
        _instance.cardinality = _instance.cardinality || 0;
        _instance.number = _instance.number || 0;
        _instance.name = _instance.name || '';
        _instance.typeUrl = _instance.typeUrl || '';
        _instance.oneofIndex = _instance.oneofIndex || 0;
        _instance.packed = _instance.packed || false;
        _instance.options = _instance.options || [];
        _instance.jsonName = _instance.jsonName || '';
        _instance.defaultValue = _instance.defaultValue || '';
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.kind = _reader.readEnum();
                    break;
                case 2:
                    _instance.cardinality = _reader.readEnum();
                    break;
                case 3:
                    _instance.number = _reader.readInt32();
                    break;
                case 4:
                    _instance.name = _reader.readString();
                    break;
                case 6:
                    _instance.typeUrl = _reader.readString();
                    break;
                case 7:
                    _instance.oneofIndex = _reader.readInt32();
                    break;
                case 8:
                    _instance.packed = _reader.readBool();
                    break;
                case 9:
                    const messageInitializer9 = new Option();
                    _reader.readMessage(messageInitializer9, Option.deserializeBinaryFromReader);
                    (_instance.options = _instance.options || []).push(messageInitializer9);
                    break;
                case 10:
                    _instance.jsonName = _reader.readString();
                    break;
                case 11:
                    _instance.defaultValue = _reader.readString();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Field.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.kind) {
            _writer.writeEnum(1, _instance.kind);
        }
        if (_instance.cardinality) {
            _writer.writeEnum(2, _instance.cardinality);
        }
        if (_instance.number) {
            _writer.writeInt32(3, _instance.number);
        }
        if (_instance.name) {
            _writer.writeString(4, _instance.name);
        }
        if (_instance.typeUrl) {
            _writer.writeString(6, _instance.typeUrl);
        }
        if (_instance.oneofIndex) {
            _writer.writeInt32(7, _instance.oneofIndex);
        }
        if (_instance.packed) {
            _writer.writeBool(8, _instance.packed);
        }
        if (_instance.options && _instance.options.length) {
            _writer.writeRepeatedMessage(9, _instance.options, Option.serializeBinaryToWriter);
        }
        if (_instance.jsonName) {
            _writer.writeString(10, _instance.jsonName);
        }
        if (_instance.defaultValue) {
            _writer.writeString(11, _instance.defaultValue);
        }
    }
    get kind() {
        return this._kind;
    }
    set kind(value) {
        this._kind = value;
    }
    get cardinality() {
        return this._cardinality;
    }
    set cardinality(value) {
        this._cardinality = value;
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get typeUrl() {
        return this._typeUrl;
    }
    set typeUrl(value) {
        this._typeUrl = value;
    }
    get oneofIndex() {
        return this._oneofIndex;
    }
    set oneofIndex(value) {
        this._oneofIndex = value;
    }
    get packed() {
        return this._packed;
    }
    set packed(value) {
        this._packed = value;
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }
    get jsonName() {
        return this._jsonName;
    }
    set jsonName(value) {
        this._jsonName = value;
    }
    get defaultValue() {
        return this._defaultValue;
    }
    set defaultValue(value) {
        this._defaultValue = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Field.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            kind: this.kind,
            cardinality: this.cardinality,
            number: this.number,
            name: this.name,
            typeUrl: this.typeUrl,
            oneofIndex: this.oneofIndex,
            packed: this.packed,
            options: (this.options || []).map((m) => m.toObject()),
            jsonName: this.jsonName,
            defaultValue: this.defaultValue,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            kind: Field.Kind[this.kind === null || this.kind === undefined ? 0 : this.kind],
            cardinality: Field.Cardinality[this.cardinality === null || this.cardinality === undefined
                ? 0
                : this.cardinality],
            number: this.number,
            name: this.name,
            typeUrl: this.typeUrl,
            oneofIndex: this.oneofIndex,
            packed: this.packed,
            options: (this.options || []).map((m) => m.toProtobufJSON(options)),
            jsonName: this.jsonName,
            defaultValue: this.defaultValue,
        };
    }
}
Field.id = 'google.protobuf.Field';
(function (Field) {
    let Kind;
    (function (Kind) {
        Kind[Kind["TYPE_UNKNOWN"] = 0] = "TYPE_UNKNOWN";
        Kind[Kind["TYPE_DOUBLE"] = 1] = "TYPE_DOUBLE";
        Kind[Kind["TYPE_FLOAT"] = 2] = "TYPE_FLOAT";
        Kind[Kind["TYPE_INT64"] = 3] = "TYPE_INT64";
        Kind[Kind["TYPE_UINT64"] = 4] = "TYPE_UINT64";
        Kind[Kind["TYPE_INT32"] = 5] = "TYPE_INT32";
        Kind[Kind["TYPE_FIXED64"] = 6] = "TYPE_FIXED64";
        Kind[Kind["TYPE_FIXED32"] = 7] = "TYPE_FIXED32";
        Kind[Kind["TYPE_BOOL"] = 8] = "TYPE_BOOL";
        Kind[Kind["TYPE_STRING"] = 9] = "TYPE_STRING";
        Kind[Kind["TYPE_GROUP"] = 10] = "TYPE_GROUP";
        Kind[Kind["TYPE_MESSAGE"] = 11] = "TYPE_MESSAGE";
        Kind[Kind["TYPE_BYTES"] = 12] = "TYPE_BYTES";
        Kind[Kind["TYPE_UINT32"] = 13] = "TYPE_UINT32";
        Kind[Kind["TYPE_ENUM"] = 14] = "TYPE_ENUM";
        Kind[Kind["TYPE_SFIXED32"] = 15] = "TYPE_SFIXED32";
        Kind[Kind["TYPE_SFIXED64"] = 16] = "TYPE_SFIXED64";
        Kind[Kind["TYPE_SINT32"] = 17] = "TYPE_SINT32";
        Kind[Kind["TYPE_SINT64"] = 18] = "TYPE_SINT64";
    })(Kind = Field.Kind || (Field.Kind = {}));
    let Cardinality;
    (function (Cardinality) {
        Cardinality[Cardinality["CARDINALITY_UNKNOWN"] = 0] = "CARDINALITY_UNKNOWN";
        Cardinality[Cardinality["CARDINALITY_OPTIONAL"] = 1] = "CARDINALITY_OPTIONAL";
        Cardinality[Cardinality["CARDINALITY_REQUIRED"] = 2] = "CARDINALITY_REQUIRED";
        Cardinality[Cardinality["CARDINALITY_REPEATED"] = 3] = "CARDINALITY_REPEATED";
    })(Cardinality = Field.Cardinality || (Field.Cardinality = {}));
})(Field || (Field = {}));
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Enum {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Enum to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.name = _value.name;
        this.enumvalue = (_value.enumvalue || []).map((m) => new EnumValue(m));
        this.options = (_value.options || []).map((m) => new Option(m));
        this.sourceContext = _value.sourceContext
            ? new SourceContext(_value.sourceContext)
            : undefined;
        this.syntax = _value.syntax;
        Enum.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Enum();
        Enum.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.name = _instance.name || '';
        _instance.enumvalue = _instance.enumvalue || [];
        _instance.options = _instance.options || [];
        _instance.sourceContext = _instance.sourceContext || undefined;
        _instance.syntax = _instance.syntax || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.name = _reader.readString();
                    break;
                case 2:
                    const messageInitializer2 = new EnumValue();
                    _reader.readMessage(messageInitializer2, EnumValue.deserializeBinaryFromReader);
                    (_instance.enumvalue = _instance.enumvalue || []).push(messageInitializer2);
                    break;
                case 3:
                    const messageInitializer3 = new Option();
                    _reader.readMessage(messageInitializer3, Option.deserializeBinaryFromReader);
                    (_instance.options = _instance.options || []).push(messageInitializer3);
                    break;
                case 4:
                    _instance.sourceContext = new SourceContext();
                    _reader.readMessage(_instance.sourceContext, SourceContext.deserializeBinaryFromReader);
                    break;
                case 5:
                    _instance.syntax = _reader.readEnum();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Enum.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.name) {
            _writer.writeString(1, _instance.name);
        }
        if (_instance.enumvalue && _instance.enumvalue.length) {
            _writer.writeRepeatedMessage(2, _instance.enumvalue, EnumValue.serializeBinaryToWriter);
        }
        if (_instance.options && _instance.options.length) {
            _writer.writeRepeatedMessage(3, _instance.options, Option.serializeBinaryToWriter);
        }
        if (_instance.sourceContext) {
            _writer.writeMessage(4, _instance.sourceContext, SourceContext.serializeBinaryToWriter);
        }
        if (_instance.syntax) {
            _writer.writeEnum(5, _instance.syntax);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get enumvalue() {
        return this._enumvalue;
    }
    set enumvalue(value) {
        this._enumvalue = value;
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }
    get sourceContext() {
        return this._sourceContext;
    }
    set sourceContext(value) {
        this._sourceContext = value;
    }
    get syntax() {
        return this._syntax;
    }
    set syntax(value) {
        this._syntax = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Enum.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            name: this.name,
            enumvalue: (this.enumvalue || []).map((m) => m.toObject()),
            options: (this.options || []).map((m) => m.toObject()),
            sourceContext: this.sourceContext
                ? this.sourceContext.toObject()
                : undefined,
            syntax: this.syntax,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            name: this.name,
            enumvalue: (this.enumvalue || []).map((m) => m.toProtobufJSON(options)),
            options: (this.options || []).map((m) => m.toProtobufJSON(options)),
            sourceContext: this.sourceContext
                ? this.sourceContext.toProtobufJSON(options)
                : null,
            syntax: Syntax[this.syntax === null || this.syntax === undefined ? 0 : this.syntax],
        };
    }
}
Enum.id = 'google.protobuf.Enum';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class EnumValue {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of EnumValue to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.name = _value.name;
        this.number = _value.number;
        this.options = (_value.options || []).map((m) => new Option(m));
        EnumValue.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new EnumValue();
        EnumValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.name = _instance.name || '';
        _instance.number = _instance.number || 0;
        _instance.options = _instance.options || [];
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.name = _reader.readString();
                    break;
                case 2:
                    _instance.number = _reader.readInt32();
                    break;
                case 3:
                    const messageInitializer3 = new Option();
                    _reader.readMessage(messageInitializer3, Option.deserializeBinaryFromReader);
                    (_instance.options = _instance.options || []).push(messageInitializer3);
                    break;
                default:
                    _reader.skipField();
            }
        }
        EnumValue.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.name) {
            _writer.writeString(1, _instance.name);
        }
        if (_instance.number) {
            _writer.writeInt32(2, _instance.number);
        }
        if (_instance.options && _instance.options.length) {
            _writer.writeRepeatedMessage(3, _instance.options, Option.serializeBinaryToWriter);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        EnumValue.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            name: this.name,
            number: this.number,
            options: (this.options || []).map((m) => m.toObject()),
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            name: this.name,
            number: this.number,
            options: (this.options || []).map((m) => m.toProtobufJSON(options)),
        };
    }
}
EnumValue.id = 'google.protobuf.EnumValue';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Option {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Option to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.name = _value.name;
        this.value = _value.value
            ? new Any(_value.value)
            : undefined;
        Option.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Option();
        Option.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.name = _instance.name || '';
        _instance.value = _instance.value || undefined;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.name = _reader.readString();
                    break;
                case 2:
                    _instance.value = new Any();
                    _reader.readMessage(_instance.value, Any.deserializeBinaryFromReader);
                    break;
                default:
                    _reader.skipField();
            }
        }
        Option.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.name) {
            _writer.writeString(1, _instance.name);
        }
        if (_instance.value) {
            _writer.writeMessage(2, _instance.value, Any.serializeBinaryToWriter);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Option.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            name: this.name,
            value: this.value ? this.value.toObject() : undefined,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            name: this.name,
            value: this.value ? this.value.toProtobufJSON(options) : null,
        };
    }
}
Option.id = 'google.protobuf.Option';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Api {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Api to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.name = _value.name;
        this.methods = (_value.methods || []).map((m) => new Method(m));
        this.options = (_value.options || []).map((m) => new Option(m));
        this.version = _value.version;
        this.sourceContext = _value.sourceContext
            ? new SourceContext(_value.sourceContext)
            : undefined;
        this.mixins = (_value.mixins || []).map((m) => new Mixin(m));
        this.syntax = _value.syntax;
        Api.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Api();
        Api.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.name = _instance.name || '';
        _instance.methods = _instance.methods || [];
        _instance.options = _instance.options || [];
        _instance.version = _instance.version || '';
        _instance.sourceContext = _instance.sourceContext || undefined;
        _instance.mixins = _instance.mixins || [];
        _instance.syntax = _instance.syntax || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.name = _reader.readString();
                    break;
                case 2:
                    const messageInitializer2 = new Method();
                    _reader.readMessage(messageInitializer2, Method.deserializeBinaryFromReader);
                    (_instance.methods = _instance.methods || []).push(messageInitializer2);
                    break;
                case 3:
                    const messageInitializer3 = new Option();
                    _reader.readMessage(messageInitializer3, Option.deserializeBinaryFromReader);
                    (_instance.options = _instance.options || []).push(messageInitializer3);
                    break;
                case 4:
                    _instance.version = _reader.readString();
                    break;
                case 5:
                    _instance.sourceContext = new SourceContext();
                    _reader.readMessage(_instance.sourceContext, SourceContext.deserializeBinaryFromReader);
                    break;
                case 6:
                    const messageInitializer6 = new Mixin();
                    _reader.readMessage(messageInitializer6, Mixin.deserializeBinaryFromReader);
                    (_instance.mixins = _instance.mixins || []).push(messageInitializer6);
                    break;
                case 7:
                    _instance.syntax = _reader.readEnum();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Api.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.name) {
            _writer.writeString(1, _instance.name);
        }
        if (_instance.methods && _instance.methods.length) {
            _writer.writeRepeatedMessage(2, _instance.methods, Method.serializeBinaryToWriter);
        }
        if (_instance.options && _instance.options.length) {
            _writer.writeRepeatedMessage(3, _instance.options, Option.serializeBinaryToWriter);
        }
        if (_instance.version) {
            _writer.writeString(4, _instance.version);
        }
        if (_instance.sourceContext) {
            _writer.writeMessage(5, _instance.sourceContext, SourceContext.serializeBinaryToWriter);
        }
        if (_instance.mixins && _instance.mixins.length) {
            _writer.writeRepeatedMessage(6, _instance.mixins, Mixin.serializeBinaryToWriter);
        }
        if (_instance.syntax) {
            _writer.writeEnum(7, _instance.syntax);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get methods() {
        return this._methods;
    }
    set methods(value) {
        this._methods = value;
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }
    get version() {
        return this._version;
    }
    set version(value) {
        this._version = value;
    }
    get sourceContext() {
        return this._sourceContext;
    }
    set sourceContext(value) {
        this._sourceContext = value;
    }
    get mixins() {
        return this._mixins;
    }
    set mixins(value) {
        this._mixins = value;
    }
    get syntax() {
        return this._syntax;
    }
    set syntax(value) {
        this._syntax = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Api.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            name: this.name,
            methods: (this.methods || []).map((m) => m.toObject()),
            options: (this.options || []).map((m) => m.toObject()),
            version: this.version,
            sourceContext: this.sourceContext
                ? this.sourceContext.toObject()
                : undefined,
            mixins: (this.mixins || []).map((m) => m.toObject()),
            syntax: this.syntax,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            name: this.name,
            methods: (this.methods || []).map((m) => m.toProtobufJSON(options)),
            options: (this.options || []).map((m) => m.toProtobufJSON(options)),
            version: this.version,
            sourceContext: this.sourceContext
                ? this.sourceContext.toProtobufJSON(options)
                : null,
            mixins: (this.mixins || []).map((m) => m.toProtobufJSON(options)),
            syntax: Syntax[this.syntax === null || this.syntax === undefined ? 0 : this.syntax],
        };
    }
}
Api.id = 'google.protobuf.Api';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Method {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Method to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.name = _value.name;
        this.requestTypeUrl = _value.requestTypeUrl;
        this.requestStreaming = _value.requestStreaming;
        this.responseTypeUrl = _value.responseTypeUrl;
        this.responseStreaming = _value.responseStreaming;
        this.options = (_value.options || []).map((m) => new Option(m));
        this.syntax = _value.syntax;
        Method.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Method();
        Method.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.name = _instance.name || '';
        _instance.requestTypeUrl = _instance.requestTypeUrl || '';
        _instance.requestStreaming = _instance.requestStreaming || false;
        _instance.responseTypeUrl = _instance.responseTypeUrl || '';
        _instance.responseStreaming = _instance.responseStreaming || false;
        _instance.options = _instance.options || [];
        _instance.syntax = _instance.syntax || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.name = _reader.readString();
                    break;
                case 2:
                    _instance.requestTypeUrl = _reader.readString();
                    break;
                case 3:
                    _instance.requestStreaming = _reader.readBool();
                    break;
                case 4:
                    _instance.responseTypeUrl = _reader.readString();
                    break;
                case 5:
                    _instance.responseStreaming = _reader.readBool();
                    break;
                case 6:
                    const messageInitializer6 = new Option();
                    _reader.readMessage(messageInitializer6, Option.deserializeBinaryFromReader);
                    (_instance.options = _instance.options || []).push(messageInitializer6);
                    break;
                case 7:
                    _instance.syntax = _reader.readEnum();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Method.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.name) {
            _writer.writeString(1, _instance.name);
        }
        if (_instance.requestTypeUrl) {
            _writer.writeString(2, _instance.requestTypeUrl);
        }
        if (_instance.requestStreaming) {
            _writer.writeBool(3, _instance.requestStreaming);
        }
        if (_instance.responseTypeUrl) {
            _writer.writeString(4, _instance.responseTypeUrl);
        }
        if (_instance.responseStreaming) {
            _writer.writeBool(5, _instance.responseStreaming);
        }
        if (_instance.options && _instance.options.length) {
            _writer.writeRepeatedMessage(6, _instance.options, Option.serializeBinaryToWriter);
        }
        if (_instance.syntax) {
            _writer.writeEnum(7, _instance.syntax);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get requestTypeUrl() {
        return this._requestTypeUrl;
    }
    set requestTypeUrl(value) {
        this._requestTypeUrl = value;
    }
    get requestStreaming() {
        return this._requestStreaming;
    }
    set requestStreaming(value) {
        this._requestStreaming = value;
    }
    get responseTypeUrl() {
        return this._responseTypeUrl;
    }
    set responseTypeUrl(value) {
        this._responseTypeUrl = value;
    }
    get responseStreaming() {
        return this._responseStreaming;
    }
    set responseStreaming(value) {
        this._responseStreaming = value;
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
    }
    get syntax() {
        return this._syntax;
    }
    set syntax(value) {
        this._syntax = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Method.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            name: this.name,
            requestTypeUrl: this.requestTypeUrl,
            requestStreaming: this.requestStreaming,
            responseTypeUrl: this.responseTypeUrl,
            responseStreaming: this.responseStreaming,
            options: (this.options || []).map((m) => m.toObject()),
            syntax: this.syntax,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            name: this.name,
            requestTypeUrl: this.requestTypeUrl,
            requestStreaming: this.requestStreaming,
            responseTypeUrl: this.responseTypeUrl,
            responseStreaming: this.responseStreaming,
            options: (this.options || []).map((m) => m.toProtobufJSON(options)),
            syntax: Syntax[this.syntax === null || this.syntax === undefined ? 0 : this.syntax],
        };
    }
}
Method.id = 'google.protobuf.Method';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Mixin {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Mixin to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.name = _value.name;
        this.root = _value.root;
        Mixin.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Mixin();
        Mixin.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.name = _instance.name || '';
        _instance.root = _instance.root || '';
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.name = _reader.readString();
                    break;
                case 2:
                    _instance.root = _reader.readString();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Mixin.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.name) {
            _writer.writeString(1, _instance.name);
        }
        if (_instance.root) {
            _writer.writeString(2, _instance.root);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get root() {
        return this._root;
    }
    set root(value) {
        this._root = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Mixin.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            name: this.name,
            root: this.root,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {
            name: this.name,
            root: this.root,
        };
    }
}
Mixin.id = 'google.protobuf.Mixin';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Duration {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Duration to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.seconds = _value.seconds;
        this.nanos = _value.nanos;
        Duration.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Duration();
        Duration.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.seconds = _instance.seconds || '0';
        _instance.nanos = _instance.nanos || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.seconds = _reader.readInt64String();
                    break;
                case 2:
                    _instance.nanos = _reader.readInt32();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Duration.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.seconds) {
            _writer.writeInt64String(1, _instance.seconds);
        }
        if (_instance.nanos) {
            _writer.writeInt32(2, _instance.nanos);
        }
    }
    get seconds() {
        return this._seconds;
    }
    set seconds(value) {
        this._seconds = value;
    }
    get nanos() {
        return this._nanos;
    }
    set nanos(value) {
        this._nanos = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Duration.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            seconds: this.seconds,
            nanos: this.nanos,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return parseInt(this.seconds || '0') + (this.nanos || 0) / 1e9 + 's';
    }
}
Duration.id = 'google.protobuf.Duration';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Empty {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Empty to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        Empty.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Empty();
        Empty.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) { }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                default:
                    _reader.skipField();
            }
        }
        Empty.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) { }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Empty.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {};
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return {};
    }
}
Empty.id = 'google.protobuf.Empty';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class FieldMask {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of FieldMask to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.paths = (_value.paths || []).slice();
        FieldMask.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new FieldMask();
        FieldMask.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.paths = _instance.paths || [];
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    (_instance.paths = _instance.paths || []).push(_reader.readString());
                    break;
                default:
                    _reader.skipField();
            }
        }
        FieldMask.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.paths && _instance.paths.length) {
            _writer.writeRepeatedString(1, _instance.paths);
        }
    }
    get paths() {
        return this._paths;
    }
    set paths(value) {
        this._paths = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        FieldMask.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            paths: (this.paths || []).slice(),
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.paths.join(',');
    }
}
FieldMask.id = 'google.protobuf.FieldMask';

var NullValue;
(function (NullValue) {
    NullValue[NullValue["NULL_VALUE"] = 0] = "NULL_VALUE";
})(NullValue || (NullValue = {}));
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Struct {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Struct to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        (this.fields = _value.fields
            ? Object.keys(_value.fields).reduce((r, k) => (Object.assign(Object.assign({}, r), { [k]: _value.fields[k] ? new Value(_value.fields[k]) : undefined })), {})
            : {}),
            Struct.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Struct();
        Struct.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.fields = _instance.fields || {};
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    const msg_1 = {};
                    _reader.readMessage(msg_1, Struct.FieldsEntry.deserializeBinaryFromReader);
                    _instance.fields = _instance.fields || {};
                    _instance.fields[msg_1.key] = msg_1.value;
                    break;
                default:
                    _reader.skipField();
            }
        }
        Struct.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (!!_instance.fields) {
            const keys_1 = Object.keys(_instance.fields);
            if (keys_1.length) {
                const repeated_1 = keys_1
                    .map((key) => ({ key: key, value: _instance.fields[key] }))
                    .reduce((r, v) => [...r, v], []);
                _writer.writeRepeatedMessage(1, repeated_1, Struct.FieldsEntry.serializeBinaryToWriter);
            }
        }
    }
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Struct.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            fields: this.fields
                ? Object.keys(this.fields).reduce((r, k) => (Object.assign(Object.assign({}, r), { [k]: this.fields[k] ? this.fields[k].toObject() : undefined })), {})
                : {},
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.fields
            ? Object.keys(this.fields).reduce((r, k) => (Object.assign(Object.assign({}, r), { [k]: this.fields[k] ? this.fields[k].toProtobufJSON(options) : {} })), {})
            : {};
    }
}
Struct.id = 'google.protobuf.Struct';
(function (Struct) {
    /**
     * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
     */
    class FieldsEntry {
        /**
         * Message constructor. Initializes the properties and applies default Protobuf values if necessary
         * @param _value initial values object or instance of FieldsEntry to deeply clone from
         */
        constructor(_value) {
            _value = _value || {};
            this.key = _value.key;
            this.value = _value.value ? new Value(_value.value) : undefined;
            FieldsEntry.refineValues(this);
        }
        /**
         * Deserialize binary data to message
         * @param instance message instance
         */
        static deserializeBinary(bytes) {
            const instance = new FieldsEntry();
            FieldsEntry.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
            return instance;
        }
        /**
         * Check all the properties and set default protobuf values if necessary
         * @param _instance message instance
         */
        static refineValues(_instance) {
            _instance.key = _instance.key || '';
            _instance.value = _instance.value || undefined;
        }
        /**
         * Deserializes / reads binary message into message instance using provided binary reader
         * @param _instance message instance
         * @param _reader binary reader instance
         */
        static deserializeBinaryFromReader(_instance, _reader) {
            while (_reader.nextField()) {
                if (_reader.isEndGroup())
                    break;
                switch (_reader.getFieldNumber()) {
                    case 1:
                        _instance.key = _reader.readString();
                        break;
                    case 2:
                        _instance.value = new Value();
                        _reader.readMessage(_instance.value, Value.deserializeBinaryFromReader);
                        break;
                    default:
                        _reader.skipField();
                }
            }
            FieldsEntry.refineValues(_instance);
        }
        /**
         * Serializes a message to binary format using provided binary reader
         * @param _instance message instance
         * @param _writer binary writer instance
         */
        static serializeBinaryToWriter(_instance, _writer) {
            if (_instance.key) {
                _writer.writeString(1, _instance.key);
            }
            if (_instance.value) {
                _writer.writeMessage(2, _instance.value, Value.serializeBinaryToWriter);
            }
        }
        get key() {
            return this._key;
        }
        set key(value) {
            this._key = value;
        }
        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
        }
        /**
         * Serialize message to binary data
         * @param instance message instance
         */
        serializeBinary() {
            const writer = new BinaryWriter();
            FieldsEntry.serializeBinaryToWriter(this, writer);
            return writer.getResultBuffer();
        }
        /**
         * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
         */
        toObject() {
            return {
                key: this.key,
                value: this.value ? this.value.toObject() : undefined,
            };
        }
        /**
         * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
         */
        toJSON() {
            return this.toObject();
        }
        /**
         * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
         * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
         * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
         */
        toProtobufJSON(
        // @ts-ignore
        options) {
            return {
                key: this.key,
                value: this.value ? this.value.toProtobufJSON(options) : null,
            };
        }
    }
    FieldsEntry.id = 'google.protobuf.Struct.FieldsEntry';
    Struct.FieldsEntry = FieldsEntry;
})(Struct || (Struct = {}));
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Value {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Value to deeply clone from
     */
    constructor(_value) {
        this._kind = Value.KindCase.none;
        _value = _value || {};
        this.nullValue = _value.nullValue;
        this.numberValue = _value.numberValue;
        this.stringValue = _value.stringValue;
        this.boolValue = _value.boolValue;
        this.structValue = _value.structValue
            ? new Struct(_value.structValue)
            : undefined;
        this.listValue = _value.listValue
            ? new ListValue(_value.listValue)
            : undefined;
        Value.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Value();
        Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) { }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.nullValue = _reader.readEnum();
                    break;
                case 2:
                    _instance.numberValue = _reader.readDouble();
                    break;
                case 3:
                    _instance.stringValue = _reader.readString();
                    break;
                case 4:
                    _instance.boolValue = _reader.readBool();
                    break;
                case 5:
                    _instance.structValue = new Struct();
                    _reader.readMessage(_instance.structValue, Struct.deserializeBinaryFromReader);
                    break;
                case 6:
                    _instance.listValue = new ListValue();
                    _reader.readMessage(_instance.listValue, ListValue.deserializeBinaryFromReader);
                    break;
                default:
                    _reader.skipField();
            }
        }
        Value.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.nullValue || _instance.nullValue === 0) {
            _writer.writeEnum(1, _instance.nullValue);
        }
        if (_instance.numberValue || _instance.numberValue === 0) {
            _writer.writeDouble(2, _instance.numberValue);
        }
        if (_instance.stringValue || _instance.stringValue === '') {
            _writer.writeString(3, _instance.stringValue);
        }
        if (_instance.boolValue || _instance.boolValue === false) {
            _writer.writeBool(4, _instance.boolValue);
        }
        if (_instance.structValue) {
            _writer.writeMessage(5, _instance.structValue, Struct.serializeBinaryToWriter);
        }
        if (_instance.listValue) {
            _writer.writeMessage(6, _instance.listValue, ListValue.serializeBinaryToWriter);
        }
    }
    get nullValue() {
        return this._nullValue;
    }
    set nullValue(value) {
        if (value !== undefined && value !== null) {
            this._numberValue =
                this._stringValue =
                    this._boolValue =
                        this._structValue =
                            this._listValue =
                                undefined;
            this._kind = Value.KindCase.nullValue;
        }
        this._nullValue = value;
    }
    get numberValue() {
        return this._numberValue;
    }
    set numberValue(value) {
        if (value !== undefined && value !== null) {
            this._nullValue =
                this._stringValue =
                    this._boolValue =
                        this._structValue =
                            this._listValue =
                                undefined;
            this._kind = Value.KindCase.numberValue;
        }
        this._numberValue = value;
    }
    get stringValue() {
        return this._stringValue;
    }
    set stringValue(value) {
        if (value !== undefined && value !== null) {
            this._nullValue =
                this._numberValue =
                    this._boolValue =
                        this._structValue =
                            this._listValue =
                                undefined;
            this._kind = Value.KindCase.stringValue;
        }
        this._stringValue = value;
    }
    get boolValue() {
        return this._boolValue;
    }
    set boolValue(value) {
        if (value !== undefined && value !== null) {
            this._nullValue =
                this._numberValue =
                    this._stringValue =
                        this._structValue =
                            this._listValue =
                                undefined;
            this._kind = Value.KindCase.boolValue;
        }
        this._boolValue = value;
    }
    get structValue() {
        return this._structValue;
    }
    set structValue(value) {
        if (value !== undefined && value !== null) {
            this._nullValue =
                this._numberValue =
                    this._stringValue =
                        this._boolValue =
                            this._listValue =
                                undefined;
            this._kind = Value.KindCase.structValue;
        }
        this._structValue = value;
    }
    get listValue() {
        return this._listValue;
    }
    set listValue(value) {
        if (value !== undefined && value !== null) {
            this._nullValue =
                this._numberValue =
                    this._stringValue =
                        this._boolValue =
                            this._structValue =
                                undefined;
            this._kind = Value.KindCase.listValue;
        }
        this._listValue = value;
    }
    get kind() {
        return this._kind;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Value.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            nullValue: this.nullValue,
            numberValue: this.numberValue,
            stringValue: this.stringValue,
            boolValue: this.boolValue,
            structValue: this.structValue ? this.structValue.toObject() : undefined,
            listValue: this.listValue ? this.listValue.toObject() : undefined,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        switch (this.kind) {
            case Value.KindCase.nullValue:
                return null;
            case Value.KindCase.numberValue:
                return this.numberValue;
            case Value.KindCase.stringValue:
                return this.stringValue;
            case Value.KindCase.boolValue:
                return this.boolValue;
            case Value.KindCase.structValue:
                return this.structValue
                    ? this.structValue.toProtobufJSON(options)
                    : null;
            case Value.KindCase.listValue:
                return this.listValue ? this.listValue.toProtobufJSON(options) : null;
            default:
                return null; // yes, according to standard should throw error, but no, it's not going to happen here
        }
    }
}
Value.id = 'google.protobuf.Value';
(function (Value) {
    let KindCase;
    (function (KindCase) {
        KindCase[KindCase["none"] = 0] = "none";
        KindCase[KindCase["nullValue"] = 1] = "nullValue";
        KindCase[KindCase["numberValue"] = 2] = "numberValue";
        KindCase[KindCase["stringValue"] = 3] = "stringValue";
        KindCase[KindCase["boolValue"] = 4] = "boolValue";
        KindCase[KindCase["structValue"] = 5] = "structValue";
        KindCase[KindCase["listValue"] = 6] = "listValue";
    })(KindCase = Value.KindCase || (Value.KindCase = {}));
})(Value || (Value = {}));
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class ListValue {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of ListValue to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.values = (_value.values || []).map((m) => new Value(m));
        ListValue.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new ListValue();
        ListValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.values = _instance.values || [];
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    const messageInitializer1 = new Value();
                    _reader.readMessage(messageInitializer1, Value.deserializeBinaryFromReader);
                    (_instance.values = _instance.values || []).push(messageInitializer1);
                    break;
                default:
                    _reader.skipField();
            }
        }
        ListValue.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.values && _instance.values.length) {
            _writer.writeRepeatedMessage(1, _instance.values, Value.serializeBinaryToWriter);
        }
    }
    get values() {
        return this._values;
    }
    set values(value) {
        this._values = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        ListValue.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            values: (this.values || []).map((m) => m.toObject()),
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return (this.values || []).map((v) => v ? v.toProtobufJSON(options) : null);
    }
}
ListValue.id = 'google.protobuf.ListValue';

/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Timestamp {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Timestamp to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.seconds = _value.seconds;
        this.nanos = _value.nanos;
        Timestamp.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Timestamp();
        Timestamp.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    static fromDate(date) {
        const timestamp = new Timestamp();
        timestamp.fromDate(date);
        return timestamp;
    }
    static fromISOString(isoDate) {
        const timestamp = new Timestamp();
        timestamp.fromISOString(isoDate);
        return timestamp;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.seconds = _instance.seconds || '0';
        _instance.nanos = _instance.nanos || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.seconds = _reader.readInt64String();
                    break;
                case 2:
                    _instance.nanos = _reader.readInt32();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Timestamp.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.seconds) {
            _writer.writeInt64String(1, _instance.seconds);
        }
        if (_instance.nanos) {
            _writer.writeInt32(2, _instance.nanos);
        }
    }
    get seconds() {
        return this._seconds;
    }
    set seconds(value) {
        this._seconds = value;
    }
    get nanos() {
        return this._nanos;
    }
    set nanos(value) {
        this._nanos = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Timestamp.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            seconds: this.seconds,
            nanos: this.nanos,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.toISOString();
    }
    fromDate(date) {
        this.seconds = '' + Math.floor(date.getTime() / 1e3);
        this.nanos = date.getMilliseconds() * 1e6;
    }
    toDate() {
        return new Date(parseInt(this.seconds || '0') * 1e3 + (this.nanos || 0) / 1e6);
    }
    fromISOString(isoDate) {
        this.fromDate(new Date(isoDate));
    }
    toISOString() {
        return this.toDate().toISOString();
    }
}
Timestamp.id = 'google.protobuf.Timestamp';

/* tslint:disable */
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class DoubleValue {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of DoubleValue to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        DoubleValue.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new DoubleValue();
        DoubleValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readDouble();
                    break;
                default:
                    _reader.skipField();
            }
        }
        DoubleValue.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value) {
            _writer.writeDouble(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        DoubleValue.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value;
    }
}
DoubleValue.id = 'google.protobuf.DoubleValue';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class FloatValue {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of FloatValue to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        FloatValue.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new FloatValue();
        FloatValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readFloat();
                    break;
                default:
                    _reader.skipField();
            }
        }
        FloatValue.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value) {
            _writer.writeFloat(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        FloatValue.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value;
    }
}
FloatValue.id = 'google.protobuf.FloatValue';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Int64Value {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Int64Value to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        Int64Value.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Int64Value();
        Int64Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || '0';
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readInt64String();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Int64Value.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value) {
            _writer.writeInt64String(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Int64Value.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value;
    }
}
Int64Value.id = 'google.protobuf.Int64Value';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class UInt64Value {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of UInt64Value to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        UInt64Value.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new UInt64Value();
        UInt64Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || '0';
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readUint64String();
                    break;
                default:
                    _reader.skipField();
            }
        }
        UInt64Value.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value) {
            _writer.writeUint64String(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        UInt64Value.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value;
    }
}
UInt64Value.id = 'google.protobuf.UInt64Value';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class Int32Value {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Int32Value to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        Int32Value.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new Int32Value();
        Int32Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readInt32();
                    break;
                default:
                    _reader.skipField();
            }
        }
        Int32Value.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value) {
            _writer.writeInt32(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        Int32Value.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value;
    }
}
Int32Value.id = 'google.protobuf.Int32Value';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class UInt32Value {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of UInt32Value to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        UInt32Value.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new UInt32Value();
        UInt32Value.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || 0;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readUint32();
                    break;
                default:
                    _reader.skipField();
            }
        }
        UInt32Value.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value) {
            _writer.writeUint32(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        UInt32Value.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value;
    }
}
UInt32Value.id = 'google.protobuf.UInt32Value';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class BoolValue {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of BoolValue to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        BoolValue.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new BoolValue();
        BoolValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || false;
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readBool();
                    break;
                default:
                    _reader.skipField();
            }
        }
        BoolValue.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value) {
            _writer.writeBool(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        BoolValue.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value;
    }
}
BoolValue.id = 'google.protobuf.BoolValue';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class StringValue {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of StringValue to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        StringValue.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new StringValue();
        StringValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || '';
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readString();
                    break;
                default:
                    _reader.skipField();
            }
        }
        StringValue.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value) {
            _writer.writeString(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        StringValue.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value,
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value;
    }
}
StringValue.id = 'google.protobuf.StringValue';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
class BytesValue {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of BytesValue to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        this.value = _value.value;
        BytesValue.refineValues(this);
    }
    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes) {
        const instance = new BytesValue();
        BytesValue.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
        return instance;
    }
    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance) {
        _instance.value = _instance.value || new Uint8Array();
    }
    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(_instance, _reader) {
        while (_reader.nextField()) {
            if (_reader.isEndGroup())
                break;
            switch (_reader.getFieldNumber()) {
                case 1:
                    _instance.value = _reader.readBytes();
                    break;
                default:
                    _reader.skipField();
            }
        }
        BytesValue.refineValues(_instance);
    }
    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(_instance, _writer) {
        if (_instance.value && _instance.value.length) {
            _writer.writeBytes(1, _instance.value);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
        const writer = new BinaryWriter();
        BytesValue.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
    }
    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject() {
        return {
            value: this.value ? this.value.subarray(0) : new Uint8Array(),
        };
    }
    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
        return this.toObject();
    }
    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
    // @ts-ignore
    options) {
        return this.value ? uint8ArrayToBase64(this.value) : '';
    }
}
BytesValue.id = 'google.protobuf.BytesValue';

/*
 * Public API Surface of well-known-types
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Any, Api, BoolValue, BytesValue, DoubleValue, Duration, Empty, Enum, EnumValue, Field, FieldMask, FloatValue, Int32Value, Int64Value, ListValue, Method, Mixin, NullValue, Option, SourceContext, StringValue, Struct, Syntax, Timestamp, Type, UInt32Value, UInt64Value, Value };
//# sourceMappingURL=ngx-grpc-well-known-types.mjs.map
