/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';

/**
 * Message implementation for athletes.AthleteRequest
 */
export class AthleteRequest implements GrpcMessage {
  static id = 'athletes.AthleteRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AthleteRequest();
    AthleteRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AthleteRequest) {
    _instance.firstName = _instance.firstName || '';
    _instance.lastName = _instance.lastName || '';
    _instance.subscriptionId = _instance.subscriptionId || 0;
    _instance.groupId = _instance.groupId || 0;
    _instance.daysLeft = _instance.daysLeft || 0;
    _instance.dateLast = _instance.dateLast || '';
    _instance.status = _instance.status || '';
    _instance.id = _instance.id || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AthleteRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.firstName = _reader.readString();
          break;
        case 2:
          _instance.lastName = _reader.readString();
          break;
        case 3:
          _instance.subscriptionId = _reader.readInt32();
          break;
        case 4:
          _instance.groupId = _reader.readInt32();
          break;
        case 5:
          _instance.daysLeft = _reader.readInt32();
          break;
        case 6:
          _instance.dateLast = _reader.readString();
          break;
        case 7:
          _instance.status = _reader.readString();
          break;
        case 8:
          _instance.id = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    AthleteRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AthleteRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.firstName) {
      _writer.writeString(1, _instance.firstName);
    }
    if (_instance.lastName) {
      _writer.writeString(2, _instance.lastName);
    }
    if (_instance.subscriptionId) {
      _writer.writeInt32(3, _instance.subscriptionId);
    }
    if (_instance.groupId) {
      _writer.writeInt32(4, _instance.groupId);
    }
    if (_instance.daysLeft) {
      _writer.writeInt32(5, _instance.daysLeft);
    }
    if (_instance.dateLast) {
      _writer.writeString(6, _instance.dateLast);
    }
    if (_instance.status) {
      _writer.writeString(7, _instance.status);
    }
    if (_instance.id) {
      _writer.writeInt32(8, _instance.id);
    }
  }

  private _firstName: string;
  private _lastName: string;
  private _subscriptionId: number;
  private _groupId: number;
  private _daysLeft: number;
  private _dateLast: string;
  private _status: string;
  private _id: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AthleteRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<AthleteRequest.AsObject>) {
    _value = _value || {};
    this.firstName = _value.firstName;
    this.lastName = _value.lastName;
    this.subscriptionId = _value.subscriptionId;
    this.groupId = _value.groupId;
    this.daysLeft = _value.daysLeft;
    this.dateLast = _value.dateLast;
    this.status = _value.status;
    this.id = _value.id;
    AthleteRequest.refineValues(this);
  }
  get firstName(): string {
    return this._firstName;
  }
  set firstName(value: string) {
    this._firstName = value;
  }
  get lastName(): string {
    return this._lastName;
  }
  set lastName(value: string) {
    this._lastName = value;
  }
  get subscriptionId(): number {
    return this._subscriptionId;
  }
  set subscriptionId(value: number) {
    this._subscriptionId = value;
  }
  get groupId(): number {
    return this._groupId;
  }
  set groupId(value: number) {
    this._groupId = value;
  }
  get daysLeft(): number {
    return this._daysLeft;
  }
  set daysLeft(value: number) {
    this._daysLeft = value;
  }
  get dateLast(): string {
    return this._dateLast;
  }
  set dateLast(value: string) {
    this._dateLast = value;
  }
  get status(): string {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AthleteRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AthleteRequest.AsObject {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      subscriptionId: this.subscriptionId,
      groupId: this.groupId,
      daysLeft: this.daysLeft,
      dateLast: this.dateLast,
      status: this.status,
      id: this.id
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
  ): AthleteRequest.AsProtobufJSON {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      subscriptionId: this.subscriptionId,
      groupId: this.groupId,
      daysLeft: this.daysLeft,
      dateLast: this.dateLast,
      status: this.status,
      id: this.id
    };
  }
}
export module AthleteRequest {
  /**
   * Standard JavaScript object representation for AthleteRequest
   */
  export interface AsObject {
    firstName: string;
    lastName: string;
    subscriptionId: number;
    groupId: number;
    daysLeft: number;
    dateLast: string;
    status: string;
    id: number;
  }

  /**
   * Protobuf JSON representation for AthleteRequest
   */
  export interface AsProtobufJSON {
    firstName: string;
    lastName: string;
    subscriptionId: number;
    groupId: number;
    daysLeft: number;
    dateLast: string;
    status: string;
    id: number;
  }
}

/**
 * Message implementation for athletes.AthleteResponse
 */
export class AthleteResponse implements GrpcMessage {
  static id = 'athletes.AthleteResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new AthleteResponse();
    AthleteResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: AthleteResponse) {
    _instance.message = _instance.message || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: AthleteResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.message = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    AthleteResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: AthleteResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.message) {
      _writer.writeString(1, _instance.message);
    }
  }

  private _message: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of AthleteResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<AthleteResponse.AsObject>) {
    _value = _value || {};
    this.message = _value.message;
    AthleteResponse.refineValues(this);
  }
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    AthleteResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): AthleteResponse.AsObject {
    return {
      message: this.message
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
  ): AthleteResponse.AsProtobufJSON {
    return {
      message: this.message
    };
  }
}
export module AthleteResponse {
  /**
   * Standard JavaScript object representation for AthleteResponse
   */
  export interface AsObject {
    message: string;
  }

  /**
   * Protobuf JSON representation for AthleteResponse
   */
  export interface AsProtobufJSON {
    message: string;
  }
}

/**
 * Message implementation for athletes.GetAthletesRequest
 */
export class GetAthletesRequest implements GrpcMessage {
  static id = 'athletes.GetAthletesRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetAthletesRequest();
    GetAthletesRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetAthletesRequest) {
    _instance.groupId = _instance.groupId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetAthletesRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.groupId = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    GetAthletesRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetAthletesRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.groupId) {
      _writer.writeInt32(1, _instance.groupId);
    }
  }

  private _groupId: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetAthletesRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetAthletesRequest.AsObject>) {
    _value = _value || {};
    this.groupId = _value.groupId;
    GetAthletesRequest.refineValues(this);
  }
  get groupId(): number {
    return this._groupId;
  }
  set groupId(value: number) {
    this._groupId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetAthletesRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetAthletesRequest.AsObject {
    return {
      groupId: this.groupId
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
  ): GetAthletesRequest.AsProtobufJSON {
    return {
      groupId: this.groupId
    };
  }
}
export module GetAthletesRequest {
  /**
   * Standard JavaScript object representation for GetAthletesRequest
   */
  export interface AsObject {
    groupId: number;
  }

  /**
   * Protobuf JSON representation for GetAthletesRequest
   */
  export interface AsProtobufJSON {
    groupId: number;
  }
}

/**
 * Message implementation for athletes.GetAthletesResponse
 */
export class GetAthletesResponse implements GrpcMessage {
  static id = 'athletes.GetAthletesResponse';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new GetAthletesResponse();
    GetAthletesResponse.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: GetAthletesResponse) {
    _instance.athlete = _instance.athlete || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: GetAthletesResponse,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.athlete = new AthleteRequest();
          _reader.readMessage(
            _instance.athlete,
            AthleteRequest.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    GetAthletesResponse.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: GetAthletesResponse,
    _writer: BinaryWriter
  ) {
    if (_instance.athlete) {
      _writer.writeMessage(
        1,
        _instance.athlete as any,
        AthleteRequest.serializeBinaryToWriter
      );
    }
  }

  private _athlete?: AthleteRequest;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of GetAthletesResponse to deeply clone from
   */
  constructor(_value?: RecursivePartial<GetAthletesResponse.AsObject>) {
    _value = _value || {};
    this.athlete = _value.athlete
      ? new AthleteRequest(_value.athlete)
      : undefined;
    GetAthletesResponse.refineValues(this);
  }
  get athlete(): AthleteRequest | undefined {
    return this._athlete;
  }
  set athlete(value: AthleteRequest | undefined) {
    this._athlete = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    GetAthletesResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): GetAthletesResponse.AsObject {
    return {
      athlete: this.athlete ? this.athlete.toObject() : undefined
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
  ): GetAthletesResponse.AsProtobufJSON {
    return {
      athlete: this.athlete ? this.athlete.toProtobufJSON(options) : null
    };
  }
}
export module GetAthletesResponse {
  /**
   * Standard JavaScript object representation for GetAthletesResponse
   */
  export interface AsObject {
    athlete?: AthleteRequest.AsObject;
  }

  /**
   * Protobuf JSON representation for GetAthletesResponse
   */
  export interface AsProtobufJSON {
    athlete: AthleteRequest.AsProtobufJSON | null;
  }
}
