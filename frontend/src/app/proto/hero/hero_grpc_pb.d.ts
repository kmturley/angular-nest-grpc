// GENERATED CODE -- DO NOT EDIT!

// package: hero
// file: hero/hero.proto

import * as hero_hero_pb from "../hero/hero_pb";
import * as grpc from "grpc";

interface IHeroServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getHeroes: grpc.MethodDefinition<hero_hero_pb.HeroById, hero_hero_pb.HeroList>;
  getHeroById: grpc.MethodDefinition<hero_hero_pb.HeroById, hero_hero_pb.Hero>;
  getHeroesStream: grpc.MethodDefinition<hero_hero_pb.HeroById, hero_hero_pb.HeroList>;
  getHeroByIdStream: grpc.MethodDefinition<hero_hero_pb.HeroById, hero_hero_pb.Hero>;
}

export const HeroServiceService: IHeroServiceService;

export class HeroServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getHeroes(argument: hero_hero_pb.HeroById, callback: grpc.requestCallback<hero_hero_pb.HeroList>): grpc.ClientUnaryCall;
  getHeroes(argument: hero_hero_pb.HeroById, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<hero_hero_pb.HeroList>): grpc.ClientUnaryCall;
  getHeroes(argument: hero_hero_pb.HeroById, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<hero_hero_pb.HeroList>): grpc.ClientUnaryCall;
  getHeroById(argument: hero_hero_pb.HeroById, callback: grpc.requestCallback<hero_hero_pb.Hero>): grpc.ClientUnaryCall;
  getHeroById(argument: hero_hero_pb.HeroById, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<hero_hero_pb.Hero>): grpc.ClientUnaryCall;
  getHeroById(argument: hero_hero_pb.HeroById, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<hero_hero_pb.Hero>): grpc.ClientUnaryCall;
  getHeroesStream(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<hero_hero_pb.HeroById, hero_hero_pb.HeroList>;
  getHeroesStream(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<hero_hero_pb.HeroById, hero_hero_pb.HeroList>;
  getHeroByIdStream(metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientDuplexStream<hero_hero_pb.HeroById, hero_hero_pb.Hero>;
  getHeroByIdStream(metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientDuplexStream<hero_hero_pb.HeroById, hero_hero_pb.Hero>;
}
