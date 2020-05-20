import * as pb_1 from "google-protobuf";
import * as grpc_1 from "grpc";
export namespace hero {
    export class HeroById extends pb_1.Message {
        constructor(data?: any[] | {
            id?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) && data, 0, -1, [], null);
            if (!Array.isArray(data) && typeof data == "object") {
                this.id = data.id;
            }
        }
        get id(): number | undefined {
            return pb_1.Message.getFieldWithDefault(this, 1, undefined) as number | undefined;
        }
        set id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        toObject() {
            return {
                id: this.id
            };
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id !== undefined)
                writer.writeInt32(1, this.id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HeroById {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new HeroById();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readInt32();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
    }
    export class Hero extends pb_1.Message {
        constructor(data?: any[] | {
            id?: number;
            name?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) && data, 0, -1, [], null);
            if (!Array.isArray(data) && typeof data == "object") {
                this.id = data.id;
                this.name = data.name;
            }
        }
        get id(): number | undefined {
            return pb_1.Message.getFieldWithDefault(this, 1, undefined) as number | undefined;
        }
        set id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get name(): string | undefined {
            return pb_1.Message.getFieldWithDefault(this, 2, undefined) as string | undefined;
        }
        set name(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        toObject() {
            return {
                id: this.id,
                name: this.name
            };
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id !== undefined)
                writer.writeInt32(1, this.id);
            if (this.name !== undefined)
                writer.writeString(2, this.name);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Hero {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new Hero();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readInt32();
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
    }
    export class HeroList extends pb_1.Message {
        constructor(data?: any[] | {
            heroes?: Hero[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) && data, 0, -1, [1], null);
            if (!Array.isArray(data) && typeof data == "object") {
                this.heroes = data.heroes;
            }
        }
        get heroes(): Hero[] {
            return pb_1.Message.getRepeatedWrapperField(this, Hero, 1) as Hero[];
        }
        set heroes(value: Hero[]) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        toObject() {
            return {
                heroes: this.heroes.map((item: Hero) => item.toObject())
            };
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.heroes !== undefined)
                writer.writeRepeatedMessage(1, this.heroes, (item: Hero) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HeroList {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new HeroList();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.heroes, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Hero.deserialize(reader), Hero));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
    }
    export var HeroService = {
        GetHeroes: {
            path: "/hero.HeroService/GetHeroes",
            requestStream: false,
            responseStream: false,
            requestType: hero.HeroById,
            responseType: hero.HeroList,
            requestSerialize: (message: HeroById) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => HeroById.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: HeroList) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => HeroList.deserialize(new Uint8Array(bytes))
        },
        GetHeroById: {
            path: "/hero.HeroService/GetHeroById",
            requestStream: false,
            responseStream: false,
            requestType: hero.HeroById,
            responseType: hero.Hero,
            requestSerialize: (message: HeroById) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => HeroById.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: Hero) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => Hero.deserialize(new Uint8Array(bytes))
        },
        GetHeroesStream: {
            path: "/hero.HeroService/GetHeroesStream",
            requestStream: true,
            responseStream: true,
            requestType: hero.HeroById,
            responseType: hero.HeroList,
            requestSerialize: (message: HeroById) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => HeroById.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: HeroList) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => HeroList.deserialize(new Uint8Array(bytes))
        },
        GetHeroByIdStream: {
            path: "/hero.HeroService/GetHeroByIdStream",
            requestStream: true,
            responseStream: true,
            requestType: hero.HeroById,
            responseType: hero.Hero,
            requestSerialize: (message: HeroById) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => HeroById.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: Hero) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => Hero.deserialize(new Uint8Array(bytes))
        }
    };
    export class HeroServiceClient extends grpc_1.makeGenericClientConstructor(HeroService, "HeroService", {}) {
        constructor(address: string, credentials: grpc_1.ChannelCredentials) {
            super(address, credentials)
        }
    }
}
