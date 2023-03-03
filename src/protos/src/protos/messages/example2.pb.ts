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
 * Message implementation for messages.example2.Address
 */
export class Address implements GrpcMessage {
  static id = 'messages.example2.Address';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new Address();
    Address.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: Address) {
    _instance.street = _instance.street || '';
    _instance.city = _instance.city || '';
    _instance.state = _instance.state || '';
    _instance.zip = _instance.zip || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: Address,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.street = _reader.readString();
          break;
        case 2:
          _instance.city = _reader.readString();
          break;
        case 3:
          _instance.state = _reader.readString();
          break;
        case 4:
          _instance.zip = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    Address.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(_instance: Address, _writer: BinaryWriter) {
    if (_instance.street) {
      _writer.writeString(1, _instance.street);
    }
    if (_instance.city) {
      _writer.writeString(2, _instance.city);
    }
    if (_instance.state) {
      _writer.writeString(3, _instance.state);
    }
    if (_instance.zip) {
      _writer.writeString(4, _instance.zip);
    }
  }

  private _street: string;
  private _city: string;
  private _state: string;
  private _zip: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of Address to deeply clone from
   */
  constructor(_value?: RecursivePartial<Address.AsObject>) {
    _value = _value || {};
    this.street = _value.street;
    this.city = _value.city;
    this.state = _value.state;
    this.zip = _value.zip;
    Address.refineValues(this);
  }
  get street(): string {
    return this._street;
  }
  set street(value: string) {
    this._street = value;
  }
  get city(): string {
    return this._city;
  }
  set city(value: string) {
    this._city = value;
  }
  get state(): string {
    return this._state;
  }
  set state(value: string) {
    this._state = value;
  }
  get zip(): string {
    return this._zip;
  }
  set zip(value: string) {
    this._zip = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    Address.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): Address.AsObject {
    return {
      street: this.street,
      city: this.city,
      state: this.state,
      zip: this.zip,
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
  ): Address.AsProtobufJSON {
    return {
      street: this.street,
      city: this.city,
      state: this.state,
      zip: this.zip,
    };
  }
}
export module Address {
  /**
   * Standard JavaScript object representation for Address
   */
  export interface AsObject {
    street: string;
    city: string;
    state: string;
    zip: string;
  }

  /**
   * Protobuf JSON representation for Address
   */
  export interface AsProtobufJSON {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
}
