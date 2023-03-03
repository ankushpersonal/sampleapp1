import { BinaryReader, BinaryWriter } from 'google-protobuf';
export var NullValue;
(function (NullValue) {
    NullValue[NullValue["NULL_VALUE"] = 0] = "NULL_VALUE";
})(NullValue || (NullValue = {}));
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Struct {
    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of Struct to deeply clone from
     */
    constructor(_value) {
        _value = _value || {};
        (this.fields = _value.fields
            ? Object.keys(_value.fields).reduce((r, k) => ({
                ...r,
                [k]: _value.fields[k] ? new Value(_value.fields[k]) : undefined,
            }), {})
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
                ? Object.keys(this.fields).reduce((r, k) => ({
                    ...r,
                    [k]: this.fields[k] ? this.fields[k].toObject() : undefined,
                }), {})
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
            ? Object.keys(this.fields).reduce((r, k) => ({
                ...r,
                [k]: this.fields[k] ? this.fields[k].toProtobufJSON(options) : {},
            }), {})
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
export class Value {
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
export class ListValue {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydWN0LnBiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2VsbC1rbm93bi10eXBlcy9zcmMvbGliL2dvb2dsZS9wcm90b2J1Zi9zdHJ1Y3QucGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV0EsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxNQUFNLENBQU4sSUFBWSxTQUVYO0FBRkQsV0FBWSxTQUFTO0lBQ25CLHFEQUFjLENBQUE7QUFDaEIsQ0FBQyxFQUZXLFNBQVMsS0FBVCxTQUFTLFFBRXBCO0FBQ0Q7O0dBRUc7QUFDSCxNQUFNLE9BQU8sTUFBTTtJQXlFakI7OztPQUdHO0lBQ0gsWUFBWSxNQUEwQztRQUNwRCxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTyxDQUFDLE1BQU07WUFDM0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNULEdBQUcsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU8sQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU8sQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzthQUNwRSxDQUFDLEVBQ0YsRUFBRSxDQUNIO1lBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNMLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQXRGRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBaUI7UUFDeEMsTUFBTSxRQUFRLEdBQUcsSUFB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QzlCLENBQUM7U0FDSDtJQUNILENBQUM7SUFhRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksTUFBTSxDQUFDLEtBQTBCO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlO1FBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDTixPQUFPO1lBQ0wsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNyRCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsY0FBYztJQUNaLGFBQWE7SUFDYixPQUErQjtRQUUvQixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNuQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDckMsQ0FBQztJQUNKLENBQUM7O0FBeEhNLFlBQUUsR0FBRywyQkFBMkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8gQHRzLW5vY2hlY2tcbi8vXG4vLyBUSElTIElTIEEgR0VORVJBVEVEIEZJTEVcbi8vIERPIE5PVCBNT0RJRlkgSVQhIFlPVVIgQ0hBTkdFUyBXSUxMIEJFIExPU1RcbmltcG9ydCB7XG4gIEdycGNNZXNzYWdlLFxuICBSZWN1cnNpdmVQYXJ0aWFsLFxuICBUb1Byb3RvYnVmSlNPTk9wdGlvbnMsXG59IGZyb20gJ0BuZ3gtZ3JwYy9jb21tb24nO1xuaW1wb3J0IHsgQmluYXJ5UmVhZGVyLCBCaW5hcnlXcml0ZXIsIEJ5dGVTb3VyY2UgfSBmcm9tICdnb29nbGUtcHJvdG9idWYnO1xuZXhwb3J0IGVudW0gTnVsbFZhbHVlIHtcbiAgTlVMTF9WQUxVRSA9IDAsXG59XG4vKipcbiAqIFdlbGwga25vd24gdHlwZSwgbW9yZSBhdCBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9wcm90b2NvbC1idWZmZXJzL2RvY3MvcmVmZXJlbmNlL2dvb2dsZS5wcm90b2J1ZlxuICovXG5leHBvcnQgY2xhc3MgU3RydWN0IGltcGxlbWVudHMgR3JwY01lc3NhZ2Uge1xuICBzdGF0aWMgaWQgPSAnZ29vZ2xlLnByb3RvYnVmLlN0cnVjdCc7XG5cbiAgLyoqXG4gICAqIERlc2VyaWFsaXplIGJpbmFyeSBkYXRhIHRvIG1lc3NhZ2VcbiAgICogQHBhcmFtIGluc3RhbmNlIG1lc3NhZ2UgaW5zdGFuY2VcbiAgICovXG4gIHN0YXRpYyBkZXNlcmlhbGl6ZUJpbmFyeShieXRlczogQnl0ZVNvdXJjZSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFN0cnVjdCgpO1xuICAgIFN0cnVjdC5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIoaW5zdGFuY2UsIG5ldyBCaW5hcnlSZWFkZXIoYnl0ZXMpKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgYWxsIHRoZSBwcm9wZXJ0aWVzIGFuZCBzZXQgZGVmYXVsdCBwcm90b2J1ZiB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAqIEBwYXJhbSBfaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIHJlZmluZVZhbHVlcyhfaW5zdGFuY2U6IFN0cnVjdCkge1xuICAgIF9pbnN0YW5jZS5maWVsZHMgPSBfaW5zdGFuY2UuZmllbGRzIHx8IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VyaWFsaXplcyAvIHJlYWRzIGJpbmFyeSBtZXNzYWdlIGludG8gbWVzc2FnZSBpbnN0YW5jZSB1c2luZyBwcm92aWRlZCBiaW5hcnkgcmVhZGVyXG4gICAqIEBwYXJhbSBfaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gX3JlYWRlciBiaW5hcnkgcmVhZGVyIGluc3RhbmNlXG4gICAqL1xuICBzdGF0aWMgZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKF9pbnN0YW5jZTogU3RydWN0LCBfcmVhZGVyOiBCaW5hcnlSZWFkZXIpIHtcbiAgICB3aGlsZSAoX3JlYWRlci5uZXh0RmllbGQoKSkge1xuICAgICAgaWYgKF9yZWFkZXIuaXNFbmRHcm91cCgpKSBicmVhaztcblxuICAgICAgc3dpdGNoIChfcmVhZGVyLmdldEZpZWxkTnVtYmVyKCkpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGNvbnN0IG1zZ18xID0ge30gYXMgYW55O1xuICAgICAgICAgIF9yZWFkZXIucmVhZE1lc3NhZ2UoXG4gICAgICAgICAgICBtc2dfMSxcbiAgICAgICAgICAgIFN0cnVjdC5GaWVsZHNFbnRyeS5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXJcbiAgICAgICAgICApO1xuICAgICAgICAgIF9pbnN0YW5jZS5maWVsZHMgPSBfaW5zdGFuY2UuZmllbGRzIHx8IHt9O1xuICAgICAgICAgIF9pbnN0YW5jZS5maWVsZHNbbXNnXzEua2V5XSA9IG1zZ18xLnZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIF9yZWFkZXIuc2tpcEZpZWxkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgU3RydWN0LnJlZmluZVZhbHVlcyhfaW5zdGFuY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgYSBtZXNzYWdlIHRvIGJpbmFyeSBmb3JtYXQgdXNpbmcgcHJvdmlkZWQgYmluYXJ5IHJlYWRlclxuICAgKiBAcGFyYW0gX2luc3RhbmNlIG1lc3NhZ2UgaW5zdGFuY2VcbiAgICogQHBhcmFtIF93cml0ZXIgYmluYXJ5IHdyaXRlciBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIHNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyKF9pbnN0YW5jZTogU3RydWN0LCBfd3JpdGVyOiBCaW5hcnlXcml0ZXIpIHtcbiAgICBpZiAoISFfaW5zdGFuY2UuZmllbGRzKSB7XG4gICAgICBjb25zdCBrZXlzXzEgPSBPYmplY3Qua2V5cyhfaW5zdGFuY2UuZmllbGRzIGFzIGFueSk7XG5cbiAgICAgIGlmIChrZXlzXzEubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHJlcGVhdGVkXzEgPSBrZXlzXzFcbiAgICAgICAgICAubWFwKChrZXkpID0+ICh7IGtleToga2V5LCB2YWx1ZTogKF9pbnN0YW5jZS5maWVsZHMgYXMgYW55KVtrZXldIH0pKVxuICAgICAgICAgIC5yZWR1Y2UoKHIsIHYpID0+IFsuLi5yLCB2XSwgW10gYXMgYW55W10pO1xuXG4gICAgICAgIF93cml0ZXIud3JpdGVSZXBlYXRlZE1lc3NhZ2UoXG4gICAgICAgICAgMSxcbiAgICAgICAgICByZXBlYXRlZF8xLFxuICAgICAgICAgIFN0cnVjdC5GaWVsZHNFbnRyeS5zZXJpYWxpemVCaW5hcnlUb1dyaXRlclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpZWxkczogeyBbcHJvcDogc3RyaW5nXTogVmFsdWUgfTtcblxuICAvKipcbiAgICogTWVzc2FnZSBjb25zdHJ1Y3Rvci4gSW5pdGlhbGl6ZXMgdGhlIHByb3BlcnRpZXMgYW5kIGFwcGxpZXMgZGVmYXVsdCBQcm90b2J1ZiB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAqIEBwYXJhbSBfdmFsdWUgaW5pdGlhbCB2YWx1ZXMgb2JqZWN0IG9yIGluc3RhbmNlIG9mIFN0cnVjdCB0byBkZWVwbHkgY2xvbmUgZnJvbVxuICAgKi9cbiAgY29uc3RydWN0b3IoX3ZhbHVlPzogUmVjdXJzaXZlUGFydGlhbDxTdHJ1Y3QuQXNPYmplY3Q+KSB7XG4gICAgX3ZhbHVlID0gX3ZhbHVlIHx8IHt9O1xuICAgICh0aGlzLmZpZWxkcyA9IF92YWx1ZSEuZmllbGRzXG4gICAgICA/IE9iamVjdC5rZXlzKF92YWx1ZSEuZmllbGRzKS5yZWR1Y2UoXG4gICAgICAgICAgKHIsIGspID0+ICh7XG4gICAgICAgICAgICAuLi5yLFxuICAgICAgICAgICAgW2tdOiBfdmFsdWUhLmZpZWxkcyFba10gPyBuZXcgVmFsdWUoX3ZhbHVlIS5maWVsZHMhW2tdKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB7fVxuICAgICAgICApXG4gICAgICA6IHt9KSxcbiAgICAgIFN0cnVjdC5yZWZpbmVWYWx1ZXModGhpcyk7XG4gIH1cbiAgZ2V0IGZpZWxkcygpOiB7IFtwcm9wOiBzdHJpbmddOiBWYWx1ZSB9IHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzO1xuICB9XG4gIHNldCBmaWVsZHModmFsdWU6IHsgW3Byb3A6IHN0cmluZ106IFZhbHVlIH0pIHtcbiAgICB0aGlzLl9maWVsZHMgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemUgbWVzc2FnZSB0byBiaW5hcnkgZGF0YVxuICAgKiBAcGFyYW0gaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKi9cbiAgc2VyaWFsaXplQmluYXJ5KCkge1xuICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoKTtcbiAgICBTdHJ1Y3Quc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgICByZXR1cm4gd3JpdGVyLmdldFJlc3VsdEJ1ZmZlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhc3QgbWVzc2FnZSB0byBzdGFuZGFyZCBKYXZhU2NyaXB0IG9iamVjdCAoYWxsIG5vbi1wcmltaXRpdmUgdmFsdWVzIGFyZSBkZWVwbHkgY2xvbmVkKVxuICAgKi9cbiAgdG9PYmplY3QoKTogU3RydWN0LkFzT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgZmllbGRzOiB0aGlzLmZpZWxkc1xuICAgICAgICA/IE9iamVjdC5rZXlzKHRoaXMuZmllbGRzKS5yZWR1Y2UoXG4gICAgICAgICAgICAociwgaykgPT4gKHtcbiAgICAgICAgICAgICAgLi4ucixcbiAgICAgICAgICAgICAgW2tdOiB0aGlzLmZpZWxkcyFba10gPyB0aGlzLmZpZWxkcyFba10udG9PYmplY3QoKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgIDoge30sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gc3VwcG9ydCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgcmVwbGljYXRlcyB0aGUgc3RydWN0dXJlIG9mIHRvT2JqZWN0KClcbiAgICovXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy50b09iamVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhc3QgbWVzc2FnZSB0byBKU09OIHVzaW5nIHByb3RvYnVmIEpTT04gbm90YXRpb246IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3Byb3RvY29sLWJ1ZmZlcnMvZG9jcy9wcm90bzMjanNvblxuICAgKiBBdHRlbnRpb246IG91dHB1dCBkaWZmZXJzIGZyb20gdG9PYmplY3QoKSBlLmcuIGVudW1zIGFyZSByZXByZXNlbnRlZCBhcyBuYW1lcyBhbmQgbm90IGFzIG51bWJlcnMsIFRpbWVzdGFtcCBpcyBhbiBJU08gRGF0ZSBzdHJpbmcgZm9ybWF0IGV0Yy5cbiAgICogSWYgdGhlIG1lc3NhZ2UgaXRzZWxmIG9yIHNvbWUgb2YgZGVzY2VuZGFudCBtZXNzYWdlcyBpcyBnb29nbGUucHJvdG9idWYuQW55LCB5b3UgTVVTVCBwcm92aWRlIGEgbWVzc2FnZSBwb29sIGFzIG9wdGlvbnMuIElmIG5vdCwgdGhlIG1lc3NhZ2VQb29sIGlzIG5vdCByZXF1aXJlZFxuICAgKi9cbiAgdG9Qcm90b2J1ZkpTT04oXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9wdGlvbnM/OiBUb1Byb3RvYnVmSlNPTk9wdGlvbnNcbiAgKTogU3RydWN0LkFzUHJvdG9idWZKU09OIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZHNcbiAgICAgID8gT2JqZWN0LmtleXModGhpcy5maWVsZHMpLnJlZHVjZShcbiAgICAgICAgICAociwgaykgPT4gKHtcbiAgICAgICAgICAgIC4uLnIsXG4gICAgICAgICAgICBba106IHRoaXMuZmllbGRzIVtrXSA/IHRoaXMuZmllbGRzIVtrXS50b1Byb3RvYnVmSlNPTihvcHRpb25zKSA6IHt9LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgIDoge307XG4gIH1cbn1cbmV4cG9ydCBtb2R1bGUgU3RydWN0IHtcbiAgLyoqXG4gICAqIFN0YW5kYXJkIEphdmFTY3JpcHQgb2JqZWN0IHJlcHJlc2VudGF0aW9uIGZvciBTdHJ1Y3RcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQXNPYmplY3Qge1xuICAgIGZpZWxkczogeyBbcHJvcDogc3RyaW5nXTogVmFsdWUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm90b2J1ZiBKU09OIHJlcHJlc2VudGF0aW9uIGZvciBTdHJ1Y3RcbiAgICovXG4gIGV4cG9ydCB0eXBlIEFzUHJvdG9idWZKU09OID0geyBbcHJvcDogc3RyaW5nXTogVmFsdWUuQXNQcm90b2J1ZkpTT04gfTtcblxuICAvKipcbiAgICogV2VsbCBrbm93biB0eXBlLCBtb3JlIGF0IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3Byb3RvY29sLWJ1ZmZlcnMvZG9jcy9yZWZlcmVuY2UvZ29vZ2xlLnByb3RvYnVmXG4gICAqL1xuICBleHBvcnQgY2xhc3MgRmllbGRzRW50cnkgaW1wbGVtZW50cyBHcnBjTWVzc2FnZSB7XG4gICAgc3RhdGljIGlkID0gJ2dvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QuRmllbGRzRW50cnknO1xuXG4gICAgLyoqXG4gICAgICogRGVzZXJpYWxpemUgYmluYXJ5IGRhdGEgdG8gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBpbnN0YW5jZSBtZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGRlc2VyaWFsaXplQmluYXJ5KGJ5dGVzOiBCeXRlU291cmNlKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBGaWVsZHNFbnRyeSgpO1xuICAgICAgRmllbGRzRW50cnkuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKFxuICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgbmV3IEJpbmFyeVJlYWRlcihieXRlcylcbiAgICAgICk7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgYWxsIHRoZSBwcm9wZXJ0aWVzIGFuZCBzZXQgZGVmYXVsdCBwcm90b2J1ZiB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAgICogQHBhcmFtIF9pbnN0YW5jZSBtZXNzYWdlIGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIHJlZmluZVZhbHVlcyhfaW5zdGFuY2U6IEZpZWxkc0VudHJ5KSB7XG4gICAgICBfaW5zdGFuY2Uua2V5ID0gX2luc3RhbmNlLmtleSB8fCAnJztcbiAgICAgIF9pbnN0YW5jZS52YWx1ZSA9IF9pbnN0YW5jZS52YWx1ZSB8fCB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzZXJpYWxpemVzIC8gcmVhZHMgYmluYXJ5IG1lc3NhZ2UgaW50byBtZXNzYWdlIGluc3RhbmNlIHVzaW5nIHByb3ZpZGVkIGJpbmFyeSByZWFkZXJcbiAgICAgKiBAcGFyYW0gX2luc3RhbmNlIG1lc3NhZ2UgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gX3JlYWRlciBiaW5hcnkgcmVhZGVyIGluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlcihcbiAgICAgIF9pbnN0YW5jZTogRmllbGRzRW50cnksXG4gICAgICBfcmVhZGVyOiBCaW5hcnlSZWFkZXJcbiAgICApIHtcbiAgICAgIHdoaWxlIChfcmVhZGVyLm5leHRGaWVsZCgpKSB7XG4gICAgICAgIGlmIChfcmVhZGVyLmlzRW5kR3JvdXAoKSkgYnJlYWs7XG5cbiAgICAgICAgc3dpdGNoIChfcmVhZGVyLmdldEZpZWxkTnVtYmVyKCkpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBfaW5zdGFuY2Uua2V5ID0gX3JlYWRlci5yZWFkU3RyaW5nKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBfaW5zdGFuY2UudmFsdWUgPSBuZXcgVmFsdWUoKTtcbiAgICAgICAgICAgIF9yZWFkZXIucmVhZE1lc3NhZ2UoXG4gICAgICAgICAgICAgIF9pbnN0YW5jZS52YWx1ZSxcbiAgICAgICAgICAgICAgVmFsdWUuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIF9yZWFkZXIuc2tpcEZpZWxkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgRmllbGRzRW50cnkucmVmaW5lVmFsdWVzKF9pbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplcyBhIG1lc3NhZ2UgdG8gYmluYXJ5IGZvcm1hdCB1c2luZyBwcm92aWRlZCBiaW5hcnkgcmVhZGVyXG4gICAgICogQHBhcmFtIF9pbnN0YW5jZSBtZXNzYWdlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIF93cml0ZXIgYmluYXJ5IHdyaXRlciBpbnN0YW5jZVxuICAgICAqL1xuICAgIHN0YXRpYyBzZXJpYWxpemVCaW5hcnlUb1dyaXRlcihcbiAgICAgIF9pbnN0YW5jZTogRmllbGRzRW50cnksXG4gICAgICBfd3JpdGVyOiBCaW5hcnlXcml0ZXJcbiAgICApIHtcbiAgICAgIGlmIChfaW5zdGFuY2Uua2V5KSB7XG4gICAgICAgIF93cml0ZXIud3JpdGVTdHJpbmcoMSwgX2luc3RhbmNlLmtleSk7XG4gICAgICB9XG4gICAgICBpZiAoX2luc3RhbmNlLnZhbHVlKSB7XG4gICAgICAgIF93cml0ZXIud3JpdGVNZXNzYWdlKFxuICAgICAgICAgIDIsXG4gICAgICAgICAgX2luc3RhbmNlLnZhbHVlIGFzIGFueSxcbiAgICAgICAgICBWYWx1ZS5zZXJpYWxpemVCaW5hcnlUb1dyaXRlclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2tleTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3ZhbHVlPzogVmFsdWU7XG5cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlIGNvbnN0cnVjdG9yLiBJbml0aWFsaXplcyB0aGUgcHJvcGVydGllcyBhbmQgYXBwbGllcyBkZWZhdWx0IFByb3RvYnVmIHZhbHVlcyBpZiBuZWNlc3NhcnlcbiAgICAgKiBAcGFyYW0gX3ZhbHVlIGluaXRpYWwgdmFsdWVzIG9iamVjdCBvciBpbnN0YW5jZSBvZiBGaWVsZHNFbnRyeSB0byBkZWVwbHkgY2xvbmUgZnJvbVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKF92YWx1ZT86IFJlY3Vyc2l2ZVBhcnRpYWw8RmllbGRzRW50cnkuQXNPYmplY3Q+KSB7XG4gICAgICBfdmFsdWUgPSBfdmFsdWUgfHwge307XG4gICAgICB0aGlzLmtleSA9IF92YWx1ZS5rZXk7XG4gICAgICB0aGlzLnZhbHVlID0gX3ZhbHVlLnZhbHVlID8gbmV3IFZhbHVlKF92YWx1ZS52YWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICBGaWVsZHNFbnRyeS5yZWZpbmVWYWx1ZXModGhpcyk7XG4gICAgfVxuICAgIGdldCBrZXkoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiB0aGlzLl9rZXk7XG4gICAgfVxuICAgIHNldCBrZXkodmFsdWU6IHN0cmluZykge1xuICAgICAgdGhpcy5fa2V5ID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpOiBWYWx1ZSB8IHVuZGVmaW5lZCB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVmFsdWUgfCB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIG1lc3NhZ2UgdG8gYmluYXJ5IGRhdGFcbiAgICAgKiBAcGFyYW0gaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNlcmlhbGl6ZUJpbmFyeSgpIHtcbiAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoKTtcbiAgICAgIEZpZWxkc0VudHJ5LnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyKHRoaXMsIHdyaXRlcik7XG4gICAgICByZXR1cm4gd3JpdGVyLmdldFJlc3VsdEJ1ZmZlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhc3QgbWVzc2FnZSB0byBzdGFuZGFyZCBKYXZhU2NyaXB0IG9iamVjdCAoYWxsIG5vbi1wcmltaXRpdmUgdmFsdWVzIGFyZSBkZWVwbHkgY2xvbmVkKVxuICAgICAqL1xuICAgIHRvT2JqZWN0KCk6IEZpZWxkc0VudHJ5LkFzT2JqZWN0IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS50b09iamVjdCgpIDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gc3VwcG9ydCBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSwgcmVwbGljYXRlcyB0aGUgc3RydWN0dXJlIG9mIHRvT2JqZWN0KClcbiAgICAgKi9cbiAgICB0b0pTT04oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b09iamVjdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhc3QgbWVzc2FnZSB0byBKU09OIHVzaW5nIHByb3RvYnVmIEpTT04gbm90YXRpb246IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3Byb3RvY29sLWJ1ZmZlcnMvZG9jcy9wcm90bzMjanNvblxuICAgICAqIEF0dGVudGlvbjogb3V0cHV0IGRpZmZlcnMgZnJvbSB0b09iamVjdCgpIGUuZy4gZW51bXMgYXJlIHJlcHJlc2VudGVkIGFzIG5hbWVzIGFuZCBub3QgYXMgbnVtYmVycywgVGltZXN0YW1wIGlzIGFuIElTTyBEYXRlIHN0cmluZyBmb3JtYXQgZXRjLlxuICAgICAqIElmIHRoZSBtZXNzYWdlIGl0c2VsZiBvciBzb21lIG9mIGRlc2NlbmRhbnQgbWVzc2FnZXMgaXMgZ29vZ2xlLnByb3RvYnVmLkFueSwgeW91IE1VU1QgcHJvdmlkZSBhIG1lc3NhZ2UgcG9vbCBhcyBvcHRpb25zLiBJZiBub3QsIHRoZSBtZXNzYWdlUG9vbCBpcyBub3QgcmVxdWlyZWRcbiAgICAgKi9cbiAgICB0b1Byb3RvYnVmSlNPTihcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIG9wdGlvbnM/OiBUb1Byb3RvYnVmSlNPTk9wdGlvbnNcbiAgICApOiBGaWVsZHNFbnRyeS5Bc1Byb3RvYnVmSlNPTiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSA/IHRoaXMudmFsdWUudG9Qcm90b2J1ZkpTT04ob3B0aW9ucykgOiBudWxsLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgZXhwb3J0IG1vZHVsZSBGaWVsZHNFbnRyeSB7XG4gICAgLyoqXG4gICAgICogU3RhbmRhcmQgSmF2YVNjcmlwdCBvYmplY3QgcmVwcmVzZW50YXRpb24gZm9yIEZpZWxkc0VudHJ5XG4gICAgICovXG4gICAgZXhwb3J0IGludGVyZmFjZSBBc09iamVjdCB7XG4gICAgICBrZXk6IHN0cmluZztcbiAgICAgIHZhbHVlPzogVmFsdWUuQXNPYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdG9idWYgSlNPTiByZXByZXNlbnRhdGlvbiBmb3IgRmllbGRzRW50cnlcbiAgICAgKi9cbiAgICBleHBvcnQgaW50ZXJmYWNlIEFzUHJvdG9idWZKU09OIHtcbiAgICAgIGtleTogc3RyaW5nO1xuICAgICAgdmFsdWU6IFZhbHVlLkFzUHJvdG9idWZKU09OIHwgbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBXZWxsIGtub3duIHR5cGUsIG1vcmUgYXQgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vcHJvdG9jb2wtYnVmZmVycy9kb2NzL3JlZmVyZW5jZS9nb29nbGUucHJvdG9idWZcbiAqL1xuZXhwb3J0IGNsYXNzIFZhbHVlIGltcGxlbWVudHMgR3JwY01lc3NhZ2Uge1xuICBzdGF0aWMgaWQgPSAnZ29vZ2xlLnByb3RvYnVmLlZhbHVlJztcblxuICAvKipcbiAgICogRGVzZXJpYWxpemUgYmluYXJ5IGRhdGEgdG8gbWVzc2FnZVxuICAgKiBAcGFyYW0gaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIGRlc2VyaWFsaXplQmluYXJ5KGJ5dGVzOiBCeXRlU291cmNlKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgVmFsdWUoKTtcbiAgICBWYWx1ZS5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIoaW5zdGFuY2UsIG5ldyBCaW5hcnlSZWFkZXIoYnl0ZXMpKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgYWxsIHRoZSBwcm9wZXJ0aWVzIGFuZCBzZXQgZGVmYXVsdCBwcm90b2J1ZiB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAqIEBwYXJhbSBfaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIHJlZmluZVZhbHVlcyhfaW5zdGFuY2U6IFZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBEZXNlcmlhbGl6ZXMgLyByZWFkcyBiaW5hcnkgbWVzc2FnZSBpbnRvIG1lc3NhZ2UgaW5zdGFuY2UgdXNpbmcgcHJvdmlkZWQgYmluYXJ5IHJlYWRlclxuICAgKiBAcGFyYW0gX2luc3RhbmNlIG1lc3NhZ2UgaW5zdGFuY2VcbiAgICogQHBhcmFtIF9yZWFkZXIgYmluYXJ5IHJlYWRlciBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIGRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlcihfaW5zdGFuY2U6IFZhbHVlLCBfcmVhZGVyOiBCaW5hcnlSZWFkZXIpIHtcbiAgICB3aGlsZSAoX3JlYWRlci5uZXh0RmllbGQoKSkge1xuICAgICAgaWYgKF9yZWFkZXIuaXNFbmRHcm91cCgpKSBicmVhaztcblxuICAgICAgc3dpdGNoIChfcmVhZGVyLmdldEZpZWxkTnVtYmVyKCkpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIF9pbnN0YW5jZS5udWxsVmFsdWUgPSBfcmVhZGVyLnJlYWRFbnVtKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBfaW5zdGFuY2UubnVtYmVyVmFsdWUgPSBfcmVhZGVyLnJlYWREb3VibGUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIF9pbnN0YW5jZS5zdHJpbmdWYWx1ZSA9IF9yZWFkZXIucmVhZFN0cmluZygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgX2luc3RhbmNlLmJvb2xWYWx1ZSA9IF9yZWFkZXIucmVhZEJvb2woKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIF9pbnN0YW5jZS5zdHJ1Y3RWYWx1ZSA9IG5ldyBTdHJ1Y3QoKTtcbiAgICAgICAgICBfcmVhZGVyLnJlYWRNZXNzYWdlKFxuICAgICAgICAgICAgX2luc3RhbmNlLnN0cnVjdFZhbHVlLFxuICAgICAgICAgICAgU3RydWN0LmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlclxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICBfaW5zdGFuY2UubGlzdFZhbHVlID0gbmV3IExpc3RWYWx1ZSgpO1xuICAgICAgICAgIF9yZWFkZXIucmVhZE1lc3NhZ2UoXG4gICAgICAgICAgICBfaW5zdGFuY2UubGlzdFZhbHVlLFxuICAgICAgICAgICAgTGlzdFZhbHVlLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlclxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgX3JlYWRlci5za2lwRmllbGQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBWYWx1ZS5yZWZpbmVWYWx1ZXMoX2luc3RhbmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIGEgbWVzc2FnZSB0byBiaW5hcnkgZm9ybWF0IHVzaW5nIHByb3ZpZGVkIGJpbmFyeSByZWFkZXJcbiAgICogQHBhcmFtIF9pbnN0YW5jZSBtZXNzYWdlIGluc3RhbmNlXG4gICAqIEBwYXJhbSBfd3JpdGVyIGJpbmFyeSB3cml0ZXIgaW5zdGFuY2VcbiAgICovXG4gIHN0YXRpYyBzZXJpYWxpemVCaW5hcnlUb1dyaXRlcihfaW5zdGFuY2U6IFZhbHVlLCBfd3JpdGVyOiBCaW5hcnlXcml0ZXIpIHtcbiAgICBpZiAoX2luc3RhbmNlLm51bGxWYWx1ZSB8fCBfaW5zdGFuY2UubnVsbFZhbHVlID09PSAwKSB7XG4gICAgICBfd3JpdGVyLndyaXRlRW51bSgxLCBfaW5zdGFuY2UubnVsbFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKF9pbnN0YW5jZS5udW1iZXJWYWx1ZSB8fCBfaW5zdGFuY2UubnVtYmVyVmFsdWUgPT09IDApIHtcbiAgICAgIF93cml0ZXIud3JpdGVEb3VibGUoMiwgX2luc3RhbmNlLm51bWJlclZhbHVlKTtcbiAgICB9XG4gICAgaWYgKF9pbnN0YW5jZS5zdHJpbmdWYWx1ZSB8fCBfaW5zdGFuY2Uuc3RyaW5nVmFsdWUgPT09ICcnKSB7XG4gICAgICBfd3JpdGVyLndyaXRlU3RyaW5nKDMsIF9pbnN0YW5jZS5zdHJpbmdWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChfaW5zdGFuY2UuYm9vbFZhbHVlIHx8IF9pbnN0YW5jZS5ib29sVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBfd3JpdGVyLndyaXRlQm9vbCg0LCBfaW5zdGFuY2UuYm9vbFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKF9pbnN0YW5jZS5zdHJ1Y3RWYWx1ZSkge1xuICAgICAgX3dyaXRlci53cml0ZU1lc3NhZ2UoXG4gICAgICAgIDUsXG4gICAgICAgIF9pbnN0YW5jZS5zdHJ1Y3RWYWx1ZSBhcyBhbnksXG4gICAgICAgIFN0cnVjdC5zZXJpYWxpemVCaW5hcnlUb1dyaXRlclxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKF9pbnN0YW5jZS5saXN0VmFsdWUpIHtcbiAgICAgIF93cml0ZXIud3JpdGVNZXNzYWdlKFxuICAgICAgICA2LFxuICAgICAgICBfaW5zdGFuY2UubGlzdFZhbHVlIGFzIGFueSxcbiAgICAgICAgTGlzdFZhbHVlLnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX251bGxWYWx1ZTogTnVsbFZhbHVlO1xuICBwcml2YXRlIF9udW1iZXJWYWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIF9zdHJpbmdWYWx1ZTogc3RyaW5nO1xuICBwcml2YXRlIF9ib29sVmFsdWU6IGJvb2xlYW47XG4gIHByaXZhdGUgX3N0cnVjdFZhbHVlPzogU3RydWN0O1xuICBwcml2YXRlIF9saXN0VmFsdWU/OiBMaXN0VmFsdWU7XG5cbiAgcHJpdmF0ZSBfa2luZDogVmFsdWUuS2luZENhc2UgPSBWYWx1ZS5LaW5kQ2FzZS5ub25lO1xuXG4gIC8qKlxuICAgKiBNZXNzYWdlIGNvbnN0cnVjdG9yLiBJbml0aWFsaXplcyB0aGUgcHJvcGVydGllcyBhbmQgYXBwbGllcyBkZWZhdWx0IFByb3RvYnVmIHZhbHVlcyBpZiBuZWNlc3NhcnlcbiAgICogQHBhcmFtIF92YWx1ZSBpbml0aWFsIHZhbHVlcyBvYmplY3Qgb3IgaW5zdGFuY2Ugb2YgVmFsdWUgdG8gZGVlcGx5IGNsb25lIGZyb21cbiAgICovXG4gIGNvbnN0cnVjdG9yKF92YWx1ZT86IFJlY3Vyc2l2ZVBhcnRpYWw8VmFsdWUuQXNPYmplY3Q+KSB7XG4gICAgX3ZhbHVlID0gX3ZhbHVlIHx8IHt9O1xuICAgIHRoaXMubnVsbFZhbHVlID0gX3ZhbHVlLm51bGxWYWx1ZTtcbiAgICB0aGlzLm51bWJlclZhbHVlID0gX3ZhbHVlLm51bWJlclZhbHVlO1xuICAgIHRoaXMuc3RyaW5nVmFsdWUgPSBfdmFsdWUuc3RyaW5nVmFsdWU7XG4gICAgdGhpcy5ib29sVmFsdWUgPSBfdmFsdWUuYm9vbFZhbHVlO1xuICAgIHRoaXMuc3RydWN0VmFsdWUgPSBfdmFsdWUuc3RydWN0VmFsdWVcbiAgICAgID8gbmV3IFN0cnVjdChfdmFsdWUuc3RydWN0VmFsdWUpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxpc3RWYWx1ZSA9IF92YWx1ZS5saXN0VmFsdWVcbiAgICAgID8gbmV3IExpc3RWYWx1ZShfdmFsdWUubGlzdFZhbHVlKVxuICAgICAgOiB1bmRlZmluZWQ7XG4gICAgVmFsdWUucmVmaW5lVmFsdWVzKHRoaXMpO1xuICB9XG4gIGdldCBudWxsVmFsdWUoKTogTnVsbFZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5fbnVsbFZhbHVlO1xuICB9XG4gIHNldCBudWxsVmFsdWUodmFsdWU6IE51bGxWYWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9udW1iZXJWYWx1ZSA9XG4gICAgICAgIHRoaXMuX3N0cmluZ1ZhbHVlID1cbiAgICAgICAgdGhpcy5fYm9vbFZhbHVlID1cbiAgICAgICAgdGhpcy5fc3RydWN0VmFsdWUgPVxuICAgICAgICB0aGlzLl9saXN0VmFsdWUgPVxuICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2tpbmQgPSBWYWx1ZS5LaW5kQ2FzZS5udWxsVmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX251bGxWYWx1ZSA9IHZhbHVlO1xuICB9XG4gIGdldCBudW1iZXJWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9udW1iZXJWYWx1ZTtcbiAgfVxuICBzZXQgbnVtYmVyVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9udWxsVmFsdWUgPVxuICAgICAgICB0aGlzLl9zdHJpbmdWYWx1ZSA9XG4gICAgICAgIHRoaXMuX2Jvb2xWYWx1ZSA9XG4gICAgICAgIHRoaXMuX3N0cnVjdFZhbHVlID1cbiAgICAgICAgdGhpcy5fbGlzdFZhbHVlID1cbiAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9raW5kID0gVmFsdWUuS2luZENhc2UubnVtYmVyVmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX251bWJlclZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHN0cmluZ1ZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmluZ1ZhbHVlO1xuICB9XG4gIHNldCBzdHJpbmdWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX251bGxWYWx1ZSA9XG4gICAgICAgIHRoaXMuX251bWJlclZhbHVlID1cbiAgICAgICAgdGhpcy5fYm9vbFZhbHVlID1cbiAgICAgICAgdGhpcy5fc3RydWN0VmFsdWUgPVxuICAgICAgICB0aGlzLl9saXN0VmFsdWUgPVxuICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2tpbmQgPSBWYWx1ZS5LaW5kQ2FzZS5zdHJpbmdWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5fc3RyaW5nVmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBnZXQgYm9vbFZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9ib29sVmFsdWU7XG4gIH1cbiAgc2V0IGJvb2xWYWx1ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9udWxsVmFsdWUgPVxuICAgICAgICB0aGlzLl9udW1iZXJWYWx1ZSA9XG4gICAgICAgIHRoaXMuX3N0cmluZ1ZhbHVlID1cbiAgICAgICAgdGhpcy5fc3RydWN0VmFsdWUgPVxuICAgICAgICB0aGlzLl9saXN0VmFsdWUgPVxuICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2tpbmQgPSBWYWx1ZS5LaW5kQ2FzZS5ib29sVmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX2Jvb2xWYWx1ZSA9IHZhbHVlO1xuICB9XG4gIGdldCBzdHJ1Y3RWYWx1ZSgpOiBTdHJ1Y3QgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zdHJ1Y3RWYWx1ZTtcbiAgfVxuICBzZXQgc3RydWN0VmFsdWUodmFsdWU6IFN0cnVjdCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9udWxsVmFsdWUgPVxuICAgICAgICB0aGlzLl9udW1iZXJWYWx1ZSA9XG4gICAgICAgIHRoaXMuX3N0cmluZ1ZhbHVlID1cbiAgICAgICAgdGhpcy5fYm9vbFZhbHVlID1cbiAgICAgICAgdGhpcy5fbGlzdFZhbHVlID1cbiAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9raW5kID0gVmFsdWUuS2luZENhc2Uuc3RydWN0VmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX3N0cnVjdFZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGxpc3RWYWx1ZSgpOiBMaXN0VmFsdWUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9saXN0VmFsdWU7XG4gIH1cbiAgc2V0IGxpc3RWYWx1ZSh2YWx1ZTogTGlzdFZhbHVlIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX251bGxWYWx1ZSA9XG4gICAgICAgIHRoaXMuX251bWJlclZhbHVlID1cbiAgICAgICAgdGhpcy5fc3RyaW5nVmFsdWUgPVxuICAgICAgICB0aGlzLl9ib29sVmFsdWUgPVxuICAgICAgICB0aGlzLl9zdHJ1Y3RWYWx1ZSA9XG4gICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fa2luZCA9IFZhbHVlLktpbmRDYXNlLmxpc3RWYWx1ZTtcbiAgICB9XG4gICAgdGhpcy5fbGlzdFZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGtpbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2tpbmQ7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplIG1lc3NhZ2UgdG8gYmluYXJ5IGRhdGFcbiAgICogQHBhcmFtIGluc3RhbmNlIG1lc3NhZ2UgaW5zdGFuY2VcbiAgICovXG4gIHNlcmlhbGl6ZUJpbmFyeSgpIHtcbiAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKCk7XG4gICAgVmFsdWUuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgICByZXR1cm4gd3JpdGVyLmdldFJlc3VsdEJ1ZmZlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhc3QgbWVzc2FnZSB0byBzdGFuZGFyZCBKYXZhU2NyaXB0IG9iamVjdCAoYWxsIG5vbi1wcmltaXRpdmUgdmFsdWVzIGFyZSBkZWVwbHkgY2xvbmVkKVxuICAgKi9cbiAgdG9PYmplY3QoKTogVmFsdWUuQXNPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBudWxsVmFsdWU6IHRoaXMubnVsbFZhbHVlLFxuICAgICAgbnVtYmVyVmFsdWU6IHRoaXMubnVtYmVyVmFsdWUsXG4gICAgICBzdHJpbmdWYWx1ZTogdGhpcy5zdHJpbmdWYWx1ZSxcbiAgICAgIGJvb2xWYWx1ZTogdGhpcy5ib29sVmFsdWUsXG4gICAgICBzdHJ1Y3RWYWx1ZTogdGhpcy5zdHJ1Y3RWYWx1ZSA/IHRoaXMuc3RydWN0VmFsdWUudG9PYmplY3QoKSA6IHVuZGVmaW5lZCxcbiAgICAgIGxpc3RWYWx1ZTogdGhpcy5saXN0VmFsdWUgPyB0aGlzLmxpc3RWYWx1ZS50b09iamVjdCgpIDogdW5kZWZpbmVkLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHN1cHBvcnQgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksIHJlcGxpY2F0ZXMgdGhlIHN0cnVjdHVyZSBvZiB0b09iamVjdCgpXG4gICAqL1xuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9PYmplY3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0IG1lc3NhZ2UgdG8gSlNPTiB1c2luZyBwcm90b2J1ZiBKU09OIG5vdGF0aW9uOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9wcm90b2NvbC1idWZmZXJzL2RvY3MvcHJvdG8zI2pzb25cbiAgICogQXR0ZW50aW9uOiBvdXRwdXQgZGlmZmVycyBmcm9tIHRvT2JqZWN0KCkgZS5nLiBlbnVtcyBhcmUgcmVwcmVzZW50ZWQgYXMgbmFtZXMgYW5kIG5vdCBhcyBudW1iZXJzLCBUaW1lc3RhbXAgaXMgYW4gSVNPIERhdGUgc3RyaW5nIGZvcm1hdCBldGMuXG4gICAqIElmIHRoZSBtZXNzYWdlIGl0c2VsZiBvciBzb21lIG9mIGRlc2NlbmRhbnQgbWVzc2FnZXMgaXMgZ29vZ2xlLnByb3RvYnVmLkFueSwgeW91IE1VU1QgcHJvdmlkZSBhIG1lc3NhZ2UgcG9vbCBhcyBvcHRpb25zLiBJZiBub3QsIHRoZSBtZXNzYWdlUG9vbCBpcyBub3QgcmVxdWlyZWRcbiAgICovXG4gIHRvUHJvdG9idWZKU09OKFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBvcHRpb25zPzogVG9Qcm90b2J1ZkpTT05PcHRpb25zXG4gICk6IFZhbHVlLkFzUHJvdG9idWZKU09OIHtcbiAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgY2FzZSBWYWx1ZS5LaW5kQ2FzZS5udWxsVmFsdWU6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgY2FzZSBWYWx1ZS5LaW5kQ2FzZS5udW1iZXJWYWx1ZTpcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtYmVyVmFsdWUhO1xuICAgICAgY2FzZSBWYWx1ZS5LaW5kQ2FzZS5zdHJpbmdWYWx1ZTpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nVmFsdWUhO1xuICAgICAgY2FzZSBWYWx1ZS5LaW5kQ2FzZS5ib29sVmFsdWU6XG4gICAgICAgIHJldHVybiB0aGlzLmJvb2xWYWx1ZSE7XG4gICAgICBjYXNlIFZhbHVlLktpbmRDYXNlLnN0cnVjdFZhbHVlOlxuICAgICAgICByZXR1cm4gdGhpcy5zdHJ1Y3RWYWx1ZVxuICAgICAgICAgID8gdGhpcy5zdHJ1Y3RWYWx1ZS50b1Byb3RvYnVmSlNPTihvcHRpb25zKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgIGNhc2UgVmFsdWUuS2luZENhc2UubGlzdFZhbHVlOlxuICAgICAgICByZXR1cm4gdGhpcy5saXN0VmFsdWUgPyB0aGlzLmxpc3RWYWx1ZS50b1Byb3RvYnVmSlNPTihvcHRpb25zKSA6IG51bGw7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDsgLy8geWVzLCBhY2NvcmRpbmcgdG8gc3RhbmRhcmQgc2hvdWxkIHRocm93IGVycm9yLCBidXQgbm8sIGl0J3Mgbm90IGdvaW5nIHRvIGhhcHBlbiBoZXJlXG4gICAgfVxuICB9XG59XG5leHBvcnQgbW9kdWxlIFZhbHVlIHtcbiAgLyoqXG4gICAqIFN0YW5kYXJkIEphdmFTY3JpcHQgb2JqZWN0IHJlcHJlc2VudGF0aW9uIGZvciBWYWx1ZVxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBBc09iamVjdCB7XG4gICAgbnVsbFZhbHVlOiBOdWxsVmFsdWU7XG4gICAgbnVtYmVyVmFsdWU6IG51bWJlcjtcbiAgICBzdHJpbmdWYWx1ZTogc3RyaW5nO1xuICAgIGJvb2xWYWx1ZTogYm9vbGVhbjtcbiAgICBzdHJ1Y3RWYWx1ZT86IFN0cnVjdC5Bc09iamVjdDtcbiAgICBsaXN0VmFsdWU/OiBMaXN0VmFsdWUuQXNPYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogUHJvdG9idWYgSlNPTiByZXByZXNlbnRhdGlvbiBmb3IgVmFsdWVcbiAgICovXG4gIGV4cG9ydCB0eXBlIEFzUHJvdG9idWZKU09OID1cbiAgICB8IG51bGxcbiAgICB8IHN0cmluZ1xuICAgIHwgbnVtYmVyXG4gICAgfCBib29sZWFuXG4gICAgfCBTdHJ1Y3QuQXNQcm90b2J1ZkpTT05cbiAgICB8IFZhbHVlLkFzUHJvdG9idWZKU09OW107XG4gIGV4cG9ydCBlbnVtIEtpbmRDYXNlIHtcbiAgICBub25lID0gMCxcbiAgICBudWxsVmFsdWUgPSAxLFxuICAgIG51bWJlclZhbHVlID0gMixcbiAgICBzdHJpbmdWYWx1ZSA9IDMsXG4gICAgYm9vbFZhbHVlID0gNCxcbiAgICBzdHJ1Y3RWYWx1ZSA9IDUsXG4gICAgbGlzdFZhbHVlID0gNixcbiAgfVxufVxuXG4vKipcbiAqIFdlbGwga25vd24gdHlwZSwgbW9yZSBhdCBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9wcm90b2NvbC1idWZmZXJzL2RvY3MvcmVmZXJlbmNlL2dvb2dsZS5wcm90b2J1ZlxuICovXG5leHBvcnQgY2xhc3MgTGlzdFZhbHVlIGltcGxlbWVudHMgR3JwY01lc3NhZ2Uge1xuICBzdGF0aWMgaWQgPSAnZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZSc7XG5cbiAgLyoqXG4gICAqIERlc2VyaWFsaXplIGJpbmFyeSBkYXRhIHRvIG1lc3NhZ2VcbiAgICogQHBhcmFtIGluc3RhbmNlIG1lc3NhZ2UgaW5zdGFuY2VcbiAgICovXG4gIHN0YXRpYyBkZXNlcmlhbGl6ZUJpbmFyeShieXRlczogQnl0ZVNvdXJjZSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IExpc3RWYWx1ZSgpO1xuICAgIExpc3RWYWx1ZS5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIoaW5zdGFuY2UsIG5ldyBCaW5hcnlSZWFkZXIoYnl0ZXMpKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgYWxsIHRoZSBwcm9wZXJ0aWVzIGFuZCBzZXQgZGVmYXVsdCBwcm90b2J1ZiB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAqIEBwYXJhbSBfaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIHJlZmluZVZhbHVlcyhfaW5zdGFuY2U6IExpc3RWYWx1ZSkge1xuICAgIF9pbnN0YW5jZS52YWx1ZXMgPSBfaW5zdGFuY2UudmFsdWVzIHx8IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VyaWFsaXplcyAvIHJlYWRzIGJpbmFyeSBtZXNzYWdlIGludG8gbWVzc2FnZSBpbnN0YW5jZSB1c2luZyBwcm92aWRlZCBiaW5hcnkgcmVhZGVyXG4gICAqIEBwYXJhbSBfaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gX3JlYWRlciBiaW5hcnkgcmVhZGVyIGluc3RhbmNlXG4gICAqL1xuICBzdGF0aWMgZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKFxuICAgIF9pbnN0YW5jZTogTGlzdFZhbHVlLFxuICAgIF9yZWFkZXI6IEJpbmFyeVJlYWRlclxuICApIHtcbiAgICB3aGlsZSAoX3JlYWRlci5uZXh0RmllbGQoKSkge1xuICAgICAgaWYgKF9yZWFkZXIuaXNFbmRHcm91cCgpKSBicmVhaztcblxuICAgICAgc3dpdGNoIChfcmVhZGVyLmdldEZpZWxkTnVtYmVyKCkpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2VJbml0aWFsaXplcjEgPSBuZXcgVmFsdWUoKTtcbiAgICAgICAgICBfcmVhZGVyLnJlYWRNZXNzYWdlKFxuICAgICAgICAgICAgbWVzc2FnZUluaXRpYWxpemVyMSxcbiAgICAgICAgICAgIFZhbHVlLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlclxuICAgICAgICAgICk7XG4gICAgICAgICAgKF9pbnN0YW5jZS52YWx1ZXMgPSBfaW5zdGFuY2UudmFsdWVzIHx8IFtdKS5wdXNoKG1lc3NhZ2VJbml0aWFsaXplcjEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIF9yZWFkZXIuc2tpcEZpZWxkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgTGlzdFZhbHVlLnJlZmluZVZhbHVlcyhfaW5zdGFuY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgYSBtZXNzYWdlIHRvIGJpbmFyeSBmb3JtYXQgdXNpbmcgcHJvdmlkZWQgYmluYXJ5IHJlYWRlclxuICAgKiBAcGFyYW0gX2luc3RhbmNlIG1lc3NhZ2UgaW5zdGFuY2VcbiAgICogQHBhcmFtIF93cml0ZXIgYmluYXJ5IHdyaXRlciBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIHNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyKF9pbnN0YW5jZTogTGlzdFZhbHVlLCBfd3JpdGVyOiBCaW5hcnlXcml0ZXIpIHtcbiAgICBpZiAoX2luc3RhbmNlLnZhbHVlcyAmJiBfaW5zdGFuY2UudmFsdWVzLmxlbmd0aCkge1xuICAgICAgX3dyaXRlci53cml0ZVJlcGVhdGVkTWVzc2FnZShcbiAgICAgICAgMSxcbiAgICAgICAgX2luc3RhbmNlLnZhbHVlcyBhcyBhbnksXG4gICAgICAgIFZhbHVlLnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlcz86IFZhbHVlW107XG5cbiAgLyoqXG4gICAqIE1lc3NhZ2UgY29uc3RydWN0b3IuIEluaXRpYWxpemVzIHRoZSBwcm9wZXJ0aWVzIGFuZCBhcHBsaWVzIGRlZmF1bHQgUHJvdG9idWYgdmFsdWVzIGlmIG5lY2Vzc2FyeVxuICAgKiBAcGFyYW0gX3ZhbHVlIGluaXRpYWwgdmFsdWVzIG9iamVjdCBvciBpbnN0YW5jZSBvZiBMaXN0VmFsdWUgdG8gZGVlcGx5IGNsb25lIGZyb21cbiAgICovXG4gIGNvbnN0cnVjdG9yKF92YWx1ZT86IFJlY3Vyc2l2ZVBhcnRpYWw8TGlzdFZhbHVlLkFzT2JqZWN0Pikge1xuICAgIF92YWx1ZSA9IF92YWx1ZSB8fCB7fTtcbiAgICB0aGlzLnZhbHVlcyA9IChfdmFsdWUudmFsdWVzIHx8IFtdKS5tYXAoKG0pID0+IG5ldyBWYWx1ZShtKSk7XG4gICAgTGlzdFZhbHVlLnJlZmluZVZhbHVlcyh0aGlzKTtcbiAgfVxuICBnZXQgdmFsdWVzKCk6IFZhbHVlW10gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZXM7XG4gIH1cbiAgc2V0IHZhbHVlcyh2YWx1ZTogVmFsdWVbXSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZSBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBtZXNzYWdlIGluc3RhbmNlXG4gICAqL1xuICBzZXJpYWxpemVCaW5hcnkoKSB7XG4gICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigpO1xuICAgIExpc3RWYWx1ZS5zZXJpYWxpemVCaW5hcnlUb1dyaXRlcih0aGlzLCB3cml0ZXIpO1xuICAgIHJldHVybiB3cml0ZXIuZ2V0UmVzdWx0QnVmZmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FzdCBtZXNzYWdlIHRvIHN0YW5kYXJkIEphdmFTY3JpcHQgb2JqZWN0IChhbGwgbm9uLXByaW1pdGl2ZSB2YWx1ZXMgYXJlIGRlZXBseSBjbG9uZWQpXG4gICAqL1xuICB0b09iamVjdCgpOiBMaXN0VmFsdWUuQXNPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZXM6ICh0aGlzLnZhbHVlcyB8fCBbXSkubWFwKChtKSA9PiBtLnRvT2JqZWN0KCkpLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHN1cHBvcnQgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksIHJlcGxpY2F0ZXMgdGhlIHN0cnVjdHVyZSBvZiB0b09iamVjdCgpXG4gICAqL1xuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9PYmplY3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0IG1lc3NhZ2UgdG8gSlNPTiB1c2luZyBwcm90b2J1ZiBKU09OIG5vdGF0aW9uOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9wcm90b2NvbC1idWZmZXJzL2RvY3MvcHJvdG8zI2pzb25cbiAgICogQXR0ZW50aW9uOiBvdXRwdXQgZGlmZmVycyBmcm9tIHRvT2JqZWN0KCkgZS5nLiBlbnVtcyBhcmUgcmVwcmVzZW50ZWQgYXMgbmFtZXMgYW5kIG5vdCBhcyBudW1iZXJzLCBUaW1lc3RhbXAgaXMgYW4gSVNPIERhdGUgc3RyaW5nIGZvcm1hdCBldGMuXG4gICAqIElmIHRoZSBtZXNzYWdlIGl0c2VsZiBvciBzb21lIG9mIGRlc2NlbmRhbnQgbWVzc2FnZXMgaXMgZ29vZ2xlLnByb3RvYnVmLkFueSwgeW91IE1VU1QgcHJvdmlkZSBhIG1lc3NhZ2UgcG9vbCBhcyBvcHRpb25zLiBJZiBub3QsIHRoZSBtZXNzYWdlUG9vbCBpcyBub3QgcmVxdWlyZWRcbiAgICovXG4gIHRvUHJvdG9idWZKU09OKFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBvcHRpb25zPzogVG9Qcm90b2J1ZkpTT05PcHRpb25zXG4gICk6IExpc3RWYWx1ZS5Bc1Byb3RvYnVmSlNPTiB7XG4gICAgcmV0dXJuICh0aGlzLnZhbHVlcyB8fCBbXSkubWFwKCh2KSA9PlxuICAgICAgdiA/IHYudG9Qcm90b2J1ZkpTT04ob3B0aW9ucykgOiBudWxsXG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IG1vZHVsZSBMaXN0VmFsdWUge1xuICAvKipcbiAgICogU3RhbmRhcmQgSmF2YVNjcmlwdCBvYmplY3QgcmVwcmVzZW50YXRpb24gZm9yIExpc3RWYWx1ZVxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBBc09iamVjdCB7XG4gICAgdmFsdWVzPzogVmFsdWUuQXNPYmplY3RbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm90b2J1ZiBKU09OIHJlcHJlc2VudGF0aW9uIGZvciBMaXN0VmFsdWVcbiAgICovXG4gIGV4cG9ydCB0eXBlIEFzUHJvdG9idWZKU09OID0gVmFsdWUuQXNQcm90b2J1ZkpTT05bXTtcbn1cbiJdfQ==