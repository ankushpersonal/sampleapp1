import { BinaryReader, BinaryWriter } from 'google-protobuf';
/**
 * Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf
 */
export class Any {
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
        if (!options?.messagePool) {
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
        return { ...json, '@type': this.typeUrl };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW55LnBiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2VsbC1rbm93bi10eXBlcy9zcmMvbGliL2dvb2dsZS9wcm90b2J1Zi9hbnkucGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RTs7R0FFRztBQUNILE1BQU0sT0FBTyxHQUFHO0lBNEVkOzs7T0FHRztJQUNILFlBQVksTUFBdUM7UUFDakQsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFsRkQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQWlCO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDM0IsR0FBRyxDQUFDLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFJRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBZ0I7UUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUV0QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFjO1FBQ2hDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7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QztJQUNsQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBd0IsV0FBNEI7UUFDeEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxPQUFPLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFNLENBQUM7SUFDekQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLEdBQWdCO1FBQ25CLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsV0FBb0MsQ0FBQztRQUV4RCxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDckMsQ0FBQzs7QUF0T00sTUFBRSxHQUFHLHFCQUFxQixDQUFDO0FBWW5CLFVBQU0sR0FBRyxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8gQHRzLW5vY2hlY2tcbi8vXG4vLyBUSElTIElTIEEgR0VORVJBVEVEIEZJTEVcbi8vIERPIE5PVCBNT0RJRlkgSVQhIFlPVVIgQ0hBTkdFUyBXSUxMIEJFIExPU1RcbmltcG9ydCB7XG4gIEdycGNNZXNzYWdlLFxuICBHcnBjTWVzc2FnZUNsYXNzLFxuICBHcnBjTWVzc2FnZVBvb2wsXG4gIFJlY3Vyc2l2ZVBhcnRpYWwsXG4gIFRvUHJvdG9idWZKU09OT3B0aW9ucyxcbn0gZnJvbSAnQG5neC1ncnBjL2NvbW1vbic7XG5pbXBvcnQgeyBCaW5hcnlSZWFkZXIsIEJpbmFyeVdyaXRlciwgQnl0ZVNvdXJjZSB9IGZyb20gJ2dvb2dsZS1wcm90b2J1Zic7XG5cbi8qKlxuICogV2VsbCBrbm93biB0eXBlLCBtb3JlIGF0IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3Byb3RvY29sLWJ1ZmZlcnMvZG9jcy9yZWZlcmVuY2UvZ29vZ2xlLnByb3RvYnVmXG4gKi9cbmV4cG9ydCBjbGFzcyBBbnkgaW1wbGVtZW50cyBHcnBjTWVzc2FnZSB7XG4gIHN0YXRpYyBpZCA9ICdnb29nbGUucHJvdG9idWYuQW55JztcblxuICAvKipcbiAgICogRGVzZXJpYWxpemUgYmluYXJ5IGRhdGEgdG8gbWVzc2FnZVxuICAgKiBAcGFyYW0gaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIGRlc2VyaWFsaXplQmluYXJ5KGJ5dGVzOiBCeXRlU291cmNlKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQW55KCk7XG4gICAgQW55LmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlcihpbnN0YW5jZSwgbmV3IEJpbmFyeVJlYWRlcihieXRlcykpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIHByZWZpeCA9ICd0eXBlLmdvb2dsZWFwaXMuY29tLyc7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBBbnkgaW5zdGFuY2Ugd2l0aCBhIHBhY2tlZCBtZXNzYWdlXG4gICAqL1xuICBzdGF0aWMgcGFjayhtc2c6IEdycGNNZXNzYWdlKSB7XG4gICAgY29uc3QgYW55ID0gbmV3IEFueSgpO1xuXG4gICAgYW55LnBhY2sobXNnKTtcblxuICAgIHJldHVybiBhbnk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgYWxsIHRoZSBwcm9wZXJ0aWVzIGFuZCBzZXQgZGVmYXVsdCBwcm90b2J1ZiB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAqIEBwYXJhbSBfaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKi9cbiAgc3RhdGljIHJlZmluZVZhbHVlcyhfaW5zdGFuY2U6IEFueSkge1xuICAgIF9pbnN0YW5jZS50eXBlVXJsID0gX2luc3RhbmNlLnR5cGVVcmwgfHwgJyc7XG4gICAgX2luc3RhbmNlLnZhbHVlID0gX2luc3RhbmNlLnZhbHVlIHx8IG5ldyBVaW50OEFycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICogRGVzZXJpYWxpemVzIC8gcmVhZHMgYmluYXJ5IG1lc3NhZ2UgaW50byBtZXNzYWdlIGluc3RhbmNlIHVzaW5nIHByb3ZpZGVkIGJpbmFyeSByZWFkZXJcbiAgICogQHBhcmFtIF9pbnN0YW5jZSBtZXNzYWdlIGluc3RhbmNlXG4gICAqIEBwYXJhbSBfcmVhZGVyIGJpbmFyeSByZWFkZXIgaW5zdGFuY2VcbiAgICovXG4gIHN0YXRpYyBkZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIoX2luc3RhbmNlOiBBbnksIF9yZWFkZXI6IEJpbmFyeVJlYWRlcikge1xuICAgIHdoaWxlIChfcmVhZGVyLm5leHRGaWVsZCgpKSB7XG4gICAgICBpZiAoX3JlYWRlci5pc0VuZEdyb3VwKCkpIGJyZWFrO1xuXG4gICAgICBzd2l0Y2ggKF9yZWFkZXIuZ2V0RmllbGROdW1iZXIoKSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgX2luc3RhbmNlLnR5cGVVcmwgPSBfcmVhZGVyLnJlYWRTdHJpbmcoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIF9pbnN0YW5jZS52YWx1ZSA9IF9yZWFkZXIucmVhZEJ5dGVzKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgX3JlYWRlci5za2lwRmllbGQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBBbnkucmVmaW5lVmFsdWVzKF9pbnN0YW5jZSk7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIG1lc3NhZ2UgdG8gYmluYXJ5IGZvcm1hdCB1c2luZyBwcm92aWRlZCBiaW5hcnkgcmVhZGVyXG4gICAqIEBwYXJhbSBfaW5zdGFuY2UgbWVzc2FnZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0gX3dyaXRlciBiaW5hcnkgd3JpdGVyIGluc3RhbmNlXG4gICAqL1xuICBzdGF0aWMgc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIoX2luc3RhbmNlOiBBbnksIF93cml0ZXI6IEJpbmFyeVdyaXRlcikge1xuICAgIGlmIChfaW5zdGFuY2UudHlwZVVybCkge1xuICAgICAgX3dyaXRlci53cml0ZVN0cmluZygxLCBfaW5zdGFuY2UudHlwZVVybCk7XG4gICAgfVxuICAgIGlmIChfaW5zdGFuY2UudmFsdWUgJiYgX2luc3RhbmNlLnZhbHVlLmxlbmd0aCkge1xuICAgICAgX3dyaXRlci53cml0ZUJ5dGVzKDIsIF9pbnN0YW5jZS52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHlwZVVybDogc3RyaW5nO1xuICBwcml2YXRlIF92YWx1ZTogVWludDhBcnJheTtcblxuICAvKipcbiAgICogTWVzc2FnZSBjb25zdHJ1Y3Rvci4gSW5pdGlhbGl6ZXMgdGhlIHByb3BlcnRpZXMgYW5kIGFwcGxpZXMgZGVmYXVsdCBQcm90b2J1ZiB2YWx1ZXMgaWYgbmVjZXNzYXJ5XG4gICAqIEBwYXJhbSBfdmFsdWUgaW5pdGlhbCB2YWx1ZXMgb2JqZWN0IG9yIGluc3RhbmNlIG9mIEFueSB0byBkZWVwbHkgY2xvbmUgZnJvbVxuICAgKi9cbiAgY29uc3RydWN0b3IoX3ZhbHVlPzogUmVjdXJzaXZlUGFydGlhbDxBbnkuQXNPYmplY3Q+KSB7XG4gICAgX3ZhbHVlID0gX3ZhbHVlIHx8IHt9O1xuICAgIHRoaXMudHlwZVVybCA9IF92YWx1ZS50eXBlVXJsO1xuICAgIHRoaXMudmFsdWUgPSBfdmFsdWUudmFsdWU7XG4gICAgQW55LnJlZmluZVZhbHVlcyh0aGlzKTtcbiAgfVxuICBnZXQgdHlwZVVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90eXBlVXJsO1xuICB9XG4gIHNldCB0eXBlVXJsKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90eXBlVXJsID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHZhbHVlKCk6IFVpbnQ4QXJyYXkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IFVpbnQ4QXJyYXkpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZSBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBtZXNzYWdlIGluc3RhbmNlXG4gICAqL1xuICBzZXJpYWxpemVCaW5hcnkoKSB7XG4gICAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigpO1xuICAgIEFueS5zZXJpYWxpemVCaW5hcnlUb1dyaXRlcih0aGlzLCB3cml0ZXIpO1xuICAgIHJldHVybiB3cml0ZXIuZ2V0UmVzdWx0QnVmZmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FzdCBtZXNzYWdlIHRvIHN0YW5kYXJkIEphdmFTY3JpcHQgb2JqZWN0IChhbGwgbm9uLXByaW1pdGl2ZSB2YWx1ZXMgYXJlIGRlZXBseSBjbG9uZWQpXG4gICAqL1xuICB0b09iamVjdCgpOiBBbnkuQXNPYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlVXJsOiB0aGlzLnR5cGVVcmwsXG4gICAgICB2YWx1ZTogdGhpcy52YWx1ZSA/IHRoaXMudmFsdWUuc3ViYXJyYXkoMCkgOiBuZXcgVWludDhBcnJheSgpLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHN1cHBvcnQgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksIHJlcGxpY2F0ZXMgdGhlIHN0cnVjdHVyZSBvZiB0b09iamVjdCgpXG4gICAqL1xuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMudG9PYmplY3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXN0IG1lc3NhZ2UgdG8gSlNPTiB1c2luZyBwcm90b2J1ZiBKU09OIG5vdGF0aW9uOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9wcm90b2NvbC1idWZmZXJzL2RvY3MvcHJvdG8zI2pzb25cbiAgICogQXR0ZW50aW9uOiBvdXRwdXQgZGlmZmVycyBmcm9tIHRvT2JqZWN0KCkgZS5nLiBlbnVtcyBhcmUgcmVwcmVzZW50ZWQgYXMgbmFtZXMgYW5kIG5vdCBhcyBudW1iZXJzLCBUaW1lc3RhbXAgaXMgYW4gSVNPIERhdGUgc3RyaW5nIGZvcm1hdCBldGMuXG4gICAqIElmIHRoZSBtZXNzYWdlIGl0c2VsZiBvciBzb21lIG9mIGRlc2NlbmRhbnQgbWVzc2FnZXMgaXMgZ29vZ2xlLnByb3RvYnVmLkFueSwgeW91IE1VU1QgcHJvdmlkZSBhIG1lc3NhZ2UgcG9vbCBhcyBvcHRpb25zLiBJZiBub3QsIHRoZSBtZXNzYWdlUG9vbCBpcyBub3QgcmVxdWlyZWRcbiAgICovXG4gIHRvUHJvdG9idWZKU09OKFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBvcHRpb25zPzogVG9Qcm90b2J1ZkpTT05PcHRpb25zXG4gICk6IEFueS5Bc1Byb3RvYnVmSlNPTiB7XG4gICAgaWYgKCFvcHRpb25zPy5tZXNzYWdlUG9vbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZXNzYWdlIHBvb2wgaXMgcmVxdWlyZWQgdG8gY2FzdCBBbnkgdG8gSlNPTmApO1xuICAgIH1cblxuICAgIGNvbnN0IG1zZyA9IHRoaXMudW5wYWNrKG9wdGlvbnMubWVzc2FnZVBvb2wpO1xuXG4gICAgaWYgKCFtc2cpIHtcbiAgICAgIHJldHVybiB7ICdAdHlwZSc6IHRoaXMudHlwZVVybCEgfTtcbiAgICB9XG5cbiAgICBjb25zdCBqc29uID0gbXNnLnRvUHJvdG9idWZKU09OKG9wdGlvbnMpO1xuXG4gICAgaWYgKHR5cGVvZiBqc29uICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHsgJ0B0eXBlJzogdGhpcy50eXBlVXJsISwgdmFsdWU6IGpzb24gfTtcbiAgICB9XG5cbiAgICByZXR1cm4geyAuLi5qc29uLCAnQHR5cGUnOiB0aGlzLnR5cGVVcmwhIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwYWNrZWQgbWVzc2FnZSBpZCBiYXNlZCBvbiB0eXBlVXJsLlxuICAgKiBJZiBubyB0eXBlVXJsIGlzIHByb3ZpZGVkIG51bGwgaXMgcmV0dXJuZWQuXG4gICAqL1xuICBnZXRQYWNrZWRNZXNzYWdlSWQoKSB7XG4gICAgaWYgKCF0aGlzLnR5cGVVcmwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghdGhpcy50eXBlVXJsLnN0YXJ0c1dpdGgoQW55LnByZWZpeCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSBVUkwgZG9lcyBub3Qgc3RhcnQgd2l0aCAke0FueS5wcmVmaXh9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudHlwZVVybC5zdWJzdHIoQW55LnByZWZpeC5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdHlwZSBvZiB0aGUgcGFja2VkIG1lc3NhZ2UuXG4gICAqIFJlcXVpcmVzIHByZWRlZmluZWQgR3JwY01lc3NhZ2VQb29sIHdpdGggZXhwZWN0ZWQgbWVzc2FnZSB0eXBlcyB3aXRoaW4uXG4gICAqIElmIG5vIHR5cGUgaXMgZm91bmQgd2l0aGluIHRoZSBwb29sIHRoZSBlcnJvciBpcyB0aHJvd24sIHVubGVzcyB0aHJvd1doZW5Ob3RJblRoZVBvb2wgaXMgc2V0IHRvIGZhbHNlOyBpbiB0aGlzIGNhc2UgbnVsbCB3aWxsIGJlIHJldHVybmVkLlxuICAgKi9cbiAgZ2V0UGFja2VkTWVzc2FnZVR5cGUoXG4gICAgbWVzc2FnZVBvb2w6IEdycGNNZXNzYWdlUG9vbCxcbiAgICB0aHJvd1doZW5Ob3RJblRoZVBvb2wgPSB0cnVlXG4gICkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5nZXRQYWNrZWRNZXNzYWdlSWQoKTtcblxuICAgIGlmICghaWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG1zZ0NsYXNzID0gbWVzc2FnZVBvb2wuZ2V0KGlkKTtcblxuICAgIGlmICghbXNnQ2xhc3MpIHtcbiAgICAgIGlmICh0aHJvd1doZW5Ob3RJblRoZVBvb2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBNZXNzYWdlIHdpdGggaWRlbnRpZmllciAnJHt0aGlzLnR5cGVVcmx9JyBpcyBub3QgcHJlc2VudCBpbiBtZXNzYWdlIHBvb2xgXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbXNnQ2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogVW5wYWNrIHRoZSBjdXJyZW50IHZhbHVlIGludG8gYSBtZXNzYWdlLlxuICAgKiBSZXF1aXJlcyBwcmVkZWZpbmVkIEdycGNNZXNzYWdlUG9vbCB3aXRoIGV4cGVjdGVkIG1lc3NhZ2UgdHlwZXMgd2l0aGluLlxuICAgKiBJZiBubyB0eXBlIGlzIGZvdW5kIHdpdGhpbiB0aGUgcG9vbCB0aGUgZXJyb3IgaXMgdGhyb3duLlxuICAgKi9cbiAgdW5wYWNrPE0gZXh0ZW5kcyBHcnBjTWVzc2FnZT4obWVzc2FnZVBvb2w6IEdycGNNZXNzYWdlUG9vbCk6IE0ge1xuICAgIGNvbnN0IG1lc3NhZ2VDbGFzcyA9IHRoaXMuZ2V0UGFja2VkTWVzc2FnZVR5cGUobWVzc2FnZVBvb2wpO1xuXG4gICAgaWYgKCFtZXNzYWdlQ2xhc3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTWVzc2FnZSB0eXBlIGNhbm5vdCBiZSByZXNvbHZlZGApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgdW5wYWNrIHZhbHVlIHRoYXQgaXMgdW5zZXRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVzc2FnZUNsYXNzLmRlc2VyaWFsaXplQmluYXJ5KHRoaXMudmFsdWUpIGFzIE07XG4gIH1cblxuICAvKipcbiAgICogUGFjayB0aGUgZ2l2ZW4gbWVzc2FnZSBpbnRvIGN1cnJlbnQgQW55IGluc3RhbmNlXG4gICAqL1xuICBwYWNrKG1zZzogR3JwY01lc3NhZ2UpIHtcbiAgICBjb25zdCB7IGlkIH0gPSBtc2cuY29uc3RydWN0b3IgYXMgR3JwY01lc3NhZ2VDbGFzczxhbnk+O1xuXG4gICAgaWYgKCFpZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNZXNzYWdlIGlzIGludmFsaWQgb3IgZG9lcyBub3QgaGF2ZSBhbiBpZGApO1xuICAgIH1cblxuICAgIHRoaXMudHlwZVVybCA9IGAke0FueS5wcmVmaXh9JHtpZH1gO1xuICAgIHRoaXMudmFsdWUgPSBtc2cuc2VyaWFsaXplQmluYXJ5KCk7XG4gIH1cbn1cbmV4cG9ydCBtb2R1bGUgQW55IHtcbiAgLyoqXG4gICAqIFN0YW5kYXJkIEphdmFTY3JpcHQgb2JqZWN0IHJlcHJlc2VudGF0aW9uIGZvciBBbnlcbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQXNPYmplY3Qge1xuICAgIHR5cGVVcmw6IHN0cmluZztcbiAgICB2YWx1ZTogVWludDhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm90b2J1ZiBKU09OIHJlcHJlc2VudGF0aW9uIGZvciBBbnlcbiAgICovXG4gIGV4cG9ydCB0eXBlIEFzUHJvdG9idWZKU09OID0ge1xuICAgICdAdHlwZSc6IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgICBbcHJvcDogc3RyaW5nXTogYW55O1xuICB9O1xufVxuIl19