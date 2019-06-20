// package: hero
// file: hero/hero.proto

import * as jspb from "google-protobuf";

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

export class HeroList extends jspb.Message {
  clearHeroesList(): void;
  getHeroesList(): Array<Hero>;
  setHeroesList(value: Array<Hero>): void;
  addHeroes(value?: Hero, index?: number): Hero;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HeroList.AsObject;
  static toObject(includeInstance: boolean, msg: HeroList): HeroList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HeroList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HeroList;
  static deserializeBinaryFromReader(message: HeroList, reader: jspb.BinaryReader): HeroList;
}

export namespace HeroList {
  export type AsObject = {
    heroesList: Array<Hero.AsObject>,
  }
}

