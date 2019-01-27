// package: hero
// file: hero/hero.proto

import * as jspb from "google-protobuf";

export class QueryHeroesRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryHeroesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryHeroesRequest): QueryHeroesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryHeroesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryHeroesRequest;
  static deserializeBinaryFromReader(message: QueryHeroesRequest, reader: jspb.BinaryReader): QueryHeroesRequest;
}

export namespace QueryHeroesRequest {
  export type AsObject = {
    name: string,
  }
}

export class HeroById extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HeroById.AsObject;
  static toObject(includeInstance: boolean, msg: HeroById): HeroById.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HeroById, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HeroById;
  static deserializeBinaryFromReader(message: HeroById, reader: jspb.BinaryReader): HeroById;
}

export namespace HeroById {
  export type AsObject = {
    id: number,
  }
}

export class Hero extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Hero.AsObject;
  static toObject(includeInstance: boolean, msg: Hero): Hero.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Hero, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Hero;
  static deserializeBinaryFromReader(message: Hero, reader: jspb.BinaryReader): Hero;
}

export namespace Hero {
  export type AsObject = {
    id: number,
    name: string,
  }
}

