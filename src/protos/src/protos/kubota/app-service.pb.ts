/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions,
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Message implementation for kubota.autonomous.services.komms.app.v1.AppServiceAuthenticateRequest
 */
export class AppServiceAuthenticateRequest implements GrpcMessage {
  static id =
    'kubota.autonomous.services.komms.app.v1.AppServiceAuthenticateRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AppServiceAuthenticateRequest();
    AppServiceAuthenticateRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AppServiceAuthenticateRequest) {
    _instance.username = _instance.username || '';
    _instance.password = _instance.password || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AppServiceAuthenticateRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.username = _reader.readString();
          break;
        case 2:
          _instance.password = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AppServiceAuthenticateRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AppServiceAuthenticateRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.username) {
      _writer.writeString(1, _instance.username);
    }
    if (_instance.password) {
      _writer.writeString(2, _instance.password);
    }
  }

  private _username: string;
  private _password: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AppServiceAuthenticateRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<AppServiceAuthenticateRequest.AsObject>
  ) {
    _value = _value || {};
    this.username = _value.username;
    this.password = _value.password;
    AppServiceAuthenticateRequest.refineValues(this);
  }
  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }
  get password(): string {
    return this._password;
  }
  set password(value: string) {
    this._password = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AppServiceAuthenticateRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AppServiceAuthenticateRequest.AsObject {
    return {
      username: this.username,
      password: this.password,
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
    options?: ToProtobufJSONOptions
  ): AppServiceAuthenticateRequest.AsProtobufJSON {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
export module AppServiceAuthenticateRequest {
  /**
   * Standard JavaScript object representation for AppServiceAuthenticateRequest
   */
  export interface AsObject {
    username: string;
    password: string;
  }

  /**
   * Protobuf JSON representation for AppServiceAuthenticateRequest
   */
  export interface AsProtobufJSON {
    username: string;
    password: string;
  }
}

/**
 * Message implementation for kubota.autonomous.services.komms.app.v1.Version
 */
export class Version implements GrpcMessage {
  static id = 'kubota.autonomous.services.komms.app.v1.Version';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Version();
    Version.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Version) {
    _instance.server = _instance.server || '';
    _instance.api = _instance.api || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Version,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.server = _reader.readString();
          break;
        case 2:
          _instance.api = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    Version.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Version, _writer: BinaryWriter) {
    if (_instance.server) {
      _writer.writeString(1, _instance.server);
    }
    if (_instance.api) {
      _writer.writeString(2, _instance.api);
    }
  }

  private _server: string;
  private _api: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Version to deeply clone from
   */
  constructor(_value?: RecursivePartial<Version.AsObject>) {
    _value = _value || {};
    this.server = _value.server;
    this.api = _value.api;
    Version.refineValues(this);
  }
  get server(): string {
    return this._server;
  }
  set server(value: string) {
    this._server = value;
  }
  get api(): string {
    return this._api;
  }
  set api(value: string) {
    this._api = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Version.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Version.AsObject {
    return {
      server: this.server,
      api: this.api,
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
    options?: ToProtobufJSONOptions
  ): Version.AsProtobufJSON {
    return {
      server: this.server,
      api: this.api,
    };
  }
}
export module Version {
  /**
   * Standard JavaScript object representation for Version
   */
  export interface AsObject {
    server: string;
    api: string;
  }

  /**
   * Protobuf JSON representation for Version
   */
  export interface AsProtobufJSON {
    server: string;
    api: string;
  }
}

/**
 * Message implementation for kubota.autonomous.services.komms.app.v1.AppServiceAuthenticateResponse
 */
export class AppServiceAuthenticateResponse implements GrpcMessage {
  static id =
    'kubota.autonomous.services.komms.app.v1.AppServiceAuthenticateResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AppServiceAuthenticateResponse();
    AppServiceAuthenticateResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AppServiceAuthenticateResponse) {
    _instance.token = _instance.token || '';
    _instance.expire = _instance.expire || 0;
    _instance.role = _instance.role || '';
    _instance.version = _instance.version || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AppServiceAuthenticateResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.token = _reader.readString();
          break;
        case 2:
          _instance.expire = _reader.readUint32();
          break;
        case 3:
          _instance.role = _reader.readString();
          break;
        case 4:
          _instance.version = new Version();
          _reader.readMessage(
            _instance.version,
            Version.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    AppServiceAuthenticateResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AppServiceAuthenticateResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.token) {
      _writer.writeString(1, _instance.token);
    }
    if (_instance.expire) {
      _writer.writeUint32(2, _instance.expire);
    }
    if (_instance.role) {
      _writer.writeString(3, _instance.role);
    }
    if (_instance.version) {
      _writer.writeMessage(
        4,
        _instance.version as any,
        Version.serializeBinaryToWriter
      );
    }
  }

  private _token: string;
  private _expire: number;
  private _role: string;
  private _version?: Version;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AppServiceAuthenticateResponse to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<AppServiceAuthenticateResponse.AsObject>
  ) {
    _value = _value || {};
    this.token = _value.token;
    this.expire = _value.expire;
    this.role = _value.role;
    this.version = _value.version ? new Version(_value.version) : undefined;
    AppServiceAuthenticateResponse.refineValues(this);
  }
  get token(): string {
    return this._token;
  }
  set token(value: string) {
    this._token = value;
  }
  get expire(): number {
    return this._expire;
  }
  set expire(value: number) {
    this._expire = value;
  }
  get role(): string {
    return this._role;
  }
  set role(value: string) {
    this._role = value;
  }
  get version(): Version | undefined {
    return this._version;
  }
  set version(value: Version | undefined) {
    this._version = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AppServiceAuthenticateResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AppServiceAuthenticateResponse.AsObject {
    return {
      token: this.token,
      expire: this.expire,
      role: this.role,
      version: this.version ? this.version.toObject() : undefined,
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
    options?: ToProtobufJSONOptions
  ): AppServiceAuthenticateResponse.AsProtobufJSON {
    return {
      token: this.token,
      expire: this.expire,
      role: this.role,
      version: this.version ? this.version.toProtobufJSON(options) : null,
    };
  }
}
export module AppServiceAuthenticateResponse {
  /**
   * Standard JavaScript object representation for AppServiceAuthenticateResponse
   */
  export interface AsObject {
    token: string;
    expire: number;
    role: string;
    version?: Version.AsObject;
  }

  /**
   * Protobuf JSON representation for AppServiceAuthenticateResponse
   */
  export interface AsProtobufJSON {
    token: string;
    expire: number;
    role: string;
    version: Version.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for kubota.autonomous.services.komms.app.v1.AppServiceAuthenticateRefreshRequest
 */
export class AppServiceAuthenticateRefreshRequest implements GrpcMessage {
  static id =
    'kubota.autonomous.services.komms.app.v1.AppServiceAuthenticateRefreshRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AppServiceAuthenticateRefreshRequest();
    AppServiceAuthenticateRefreshRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AppServiceAuthenticateRefreshRequest) {}

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AppServiceAuthenticateRefreshRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        default:
          _reader.skipField();
      }
    }

    AppServiceAuthenticateRefreshRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AppServiceAuthenticateRefreshRequest,
    _writer: BinaryWriter
  ) {}

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AppServiceAuthenticateRefreshRequest to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<AppServiceAuthenticateRefreshRequest.AsObject>
  ) {
    _value = _value || {};
    AppServiceAuthenticateRefreshRequest.refineValues(this);
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AppServiceAuthenticateRefreshRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AppServiceAuthenticateRefreshRequest.AsObject {
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
    options?: ToProtobufJSONOptions
  ): AppServiceAuthenticateRefreshRequest.AsProtobufJSON {
    return {};
  }
}
export module AppServiceAuthenticateRefreshRequest {
  /**
   * Standard JavaScript object representation for AppServiceAuthenticateRefreshRequest
   */
  export interface AsObject {}

  /**
   * Protobuf JSON representation for AppServiceAuthenticateRefreshRequest
   */
  export interface AsProtobufJSON {}
}

/**
 * Message implementation for kubota.autonomous.services.komms.app.v1.AppServiceAuthenticateRefreshResponse
 */
export class AppServiceAuthenticateRefreshResponse implements GrpcMessage {
  static id =
    'kubota.autonomous.services.komms.app.v1.AppServiceAuthenticateRefreshResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AppServiceAuthenticateRefreshResponse();
    AppServiceAuthenticateRefreshResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AppServiceAuthenticateRefreshResponse) {
    _instance.token = _instance.token || '';
    _instance.expire = _instance.expire || 0;
    _instance.version = _instance.version || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AppServiceAuthenticateRefreshResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.token = _reader.readString();
          break;
        case 2:
          _instance.expire = _reader.readUint32();
          break;
        case 4:
          _instance.version = new Version();
          _reader.readMessage(
            _instance.version,
            Version.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    AppServiceAuthenticateRefreshResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AppServiceAuthenticateRefreshResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.token) {
      _writer.writeString(1, _instance.token);
    }
    if (_instance.expire) {
      _writer.writeUint32(2, _instance.expire);
    }
    if (_instance.version) {
      _writer.writeMessage(
        4,
        _instance.version as any,
        Version.serializeBinaryToWriter
      );
    }
  }

  private _token: string;
  private _expire: number;
  private _version?: Version;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AppServiceAuthenticateRefreshResponse to deeply clone from
   */
  constructor(
    _value?: RecursivePartial<AppServiceAuthenticateRefreshResponse.AsObject>
  ) {
    _value = _value || {};
    this.token = _value.token;
    this.expire = _value.expire;
    this.version = _value.version ? new Version(_value.version) : undefined;
    AppServiceAuthenticateRefreshResponse.refineValues(this);
  }
  get token(): string {
    return this._token;
  }
  set token(value: string) {
    this._token = value;
  }
  get expire(): number {
    return this._expire;
  }
  set expire(value: number) {
    this._expire = value;
  }
  get version(): Version | undefined {
    return this._version;
  }
  set version(value: Version | undefined) {
    this._version = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AppServiceAuthenticateRefreshResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AppServiceAuthenticateRefreshResponse.AsObject {
    return {
      token: this.token,
      expire: this.expire,
      version: this.version ? this.version.toObject() : undefined,
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
    options?: ToProtobufJSONOptions
  ): AppServiceAuthenticateRefreshResponse.AsProtobufJSON {
    return {
      token: this.token,
      expire: this.expire,
      version: this.version ? this.version.toProtobufJSON(options) : null,
    };
  }
}
export module AppServiceAuthenticateRefreshResponse {
  /**
   * Standard JavaScript object representation for AppServiceAuthenticateRefreshResponse
   */
  export interface AsObject {
    token: string;
    expire: number;
    version?: Version.AsObject;
  }

  /**
   * Protobuf JSON representation for AppServiceAuthenticateRefreshResponse
   */
  export interface AsProtobufJSON {
    token: string;
    expire: number;
    version: Version.AsProtobufJSON | null;
  }
}
