/**
 * Type of the RPC
 */
var GrpcCallType;
(function (GrpcCallType) {
    GrpcCallType[GrpcCallType["unary"] = 0] = "unary";
    GrpcCallType[GrpcCallType["serverStream"] = 1] = "serverStream";
    GrpcCallType[GrpcCallType["clientStream"] = 2] = "clientStream";
    GrpcCallType[GrpcCallType["bidiStream"] = 3] = "bidiStream";
})(GrpcCallType || (GrpcCallType = {}));

/**
 * Data event. This event is emitted when the new message arrives from the server
 */
class GrpcDataEvent {
    constructor(data) {
        this.data = data;
    }
}
/**
 * Status event. This event is emitted when the new status and metadata arrives from the server
 */
class GrpcStatusEvent {
    constructor(statusCode, statusMessage, metadata) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.metadata = metadata;
    }
}

/**
 * A message pool for using with `google.protobuf.Any`.
 * Pass the array of messages to be registered within the pool and give this pool to `toProtobufJSON` or to `unpack`.
 */
class GrpcMessagePool {
    constructor(messages) {
        this.index = new Map();
        this.add(messages);
    }
    add(messages) {
        messages.forEach(m => this.index.set(m.id, m));
    }
    get(id) {
        return this.index.get(id);
    }
}

class GrpcMetadata {
    constructor(initial) {
        initial = initial || {};
        this.map = Object.keys(initial).reduce((m, k) => m.set(k, initial[k]), new Map());
    }
    set(name, value) {
        this.map.set(name, value);
    }
    get(name) {
        return this.map.get(name);
    }
    has(name) {
        return this.map.has(name);
    }
    clone() {
        return new GrpcMetadata(this.toObject());
    }
    toObject() {
        return [...this.map.keys()].reduce((o, k) => ({ ...o, [k]: this.map.get(k) }), {});
    }
}

/**
 * Converts Uint8Array to string as prescribed by protobuf bytes toJSON definition
 * Inspired by https://stackoverflow.com/a/9458996/1990451
 */
function uint8ArrayToBase64(array) {
    let res = '';
    for (let i = 0; i < array.byteLength; i++) {
        res += String.fromCharCode(array[i]);
    }
    return window.btoa(res);
}

/*
  DOM-free chunk

  IMPORTANT: all dependencies must be DOM-references-free because it might breaks Worker environment; in other words
    - do not import to @angular/* and other DOM-related packages in any level of import
    - do not use Window / Document etc
*/

/**
 * Generated bundle index. Do not edit.
 */

export { GrpcCallType, GrpcDataEvent, GrpcMessagePool, GrpcMetadata, GrpcStatusEvent, uint8ArrayToBase64 };
//# sourceMappingURL=ngx-grpc-common.mjs.map
