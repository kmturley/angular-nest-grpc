// package: hero
// file: hero/hero.proto

import * as hero_hero_pb from "../hero/hero_pb";
import {grpc} from "@improbable-eng/grpc-web";

type HeroServiceGetHeroes = {
  readonly methodName: string;
  readonly service: typeof HeroService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof hero_hero_pb.HeroById;
  readonly responseType: typeof hero_hero_pb.HeroList;
};

type HeroServiceGetHeroById = {
  readonly methodName: string;
  readonly service: typeof HeroService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof hero_hero_pb.HeroById;
  readonly responseType: typeof hero_hero_pb.Hero;
};

type HeroServiceGetHeroesStream = {
  readonly methodName: string;
  readonly service: typeof HeroService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof hero_hero_pb.HeroById;
  readonly responseType: typeof hero_hero_pb.HeroList;
};

type HeroServiceGetHeroByIdStream = {
  readonly methodName: string;
  readonly service: typeof HeroService;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof hero_hero_pb.HeroById;
  readonly responseType: typeof hero_hero_pb.Hero;
};

export class HeroService {
  static readonly serviceName: string;
  static readonly GetHeroes: HeroServiceGetHeroes;
  static readonly GetHeroById: HeroServiceGetHeroById;
  static readonly GetHeroesStream: HeroServiceGetHeroesStream;
  static readonly GetHeroByIdStream: HeroServiceGetHeroByIdStream;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class HeroServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getHeroes(
    requestMessage: hero_hero_pb.HeroById,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: hero_hero_pb.HeroList|null) => void
  ): UnaryResponse;
  getHeroes(
    requestMessage: hero_hero_pb.HeroById,
    callback: (error: ServiceError|null, responseMessage: hero_hero_pb.HeroList|null) => void
  ): UnaryResponse;
  getHeroById(
    requestMessage: hero_hero_pb.HeroById,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: hero_hero_pb.Hero|null) => void
  ): UnaryResponse;
  getHeroById(
    requestMessage: hero_hero_pb.HeroById,
    callback: (error: ServiceError|null, responseMessage: hero_hero_pb.Hero|null) => void
  ): UnaryResponse;
  getHeroesStream(metadata?: grpc.Metadata): BidirectionalStream<hero_hero_pb.HeroById, hero_hero_pb.HeroList>;
  getHeroByIdStream(metadata?: grpc.Metadata): BidirectionalStream<hero_hero_pb.HeroById, hero_hero_pb.Hero>;
}

