import { Get, OnModuleInit, Controller, Param } from '@nestjs/common';
import {
  Client,
  GrpcMethod,
  GrpcStreamMethod,
  ClientGrpc,
} from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';
import { grpcClientOptions } from '../grpc-client.options';
import { HeroById } from './interfaces/hero-by-id.interface';
import { HeroByName } from './interfaces/hero-by-name.interface';
import { Hero, HeroList } from './interfaces/hero.interface';

interface HeroService {
  getHeroById(data: { id: number }): Observable<any>;
  listHeroesByName(data: { name: string }): Observable<any>;
}

@Controller()
export class HeroController implements OnModuleInit {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private heroService: HeroService;
  private items = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Billy' },
    { id: 4, name: 'Joey' },
  ];

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  // http methods

  @Get()
  call(): Observable<any> {
    return this.heroService.getHeroById({ id: 1 });
  }

  @Get(':id')
  getHero(@Param('id') id: string): Hero {
    return this.items.find((item) => item.id === Number(id));
  }

  // grpc methods

  @GrpcMethod('HeroService')
  getHeroById(data: HeroById, metadata: any): Hero {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcMethod('HeroService')
  listHeroesByName(data: HeroByName, metadata: any): object {
    return { heroes: this.items.filter(({ name }) => name.startsWith(data.name)) };
  }

  // grpc streaming methods

  @GrpcStreamMethod('HeroService')
  async getHeroByIdStream(messages: Observable<any>): Promise<Hero> {
    return new Promise<Hero>((resolve, reject) => {
      messages.subscribe(msg => {
        resolve(this.items.find(({ id }) => id === msg.id));
      }, err => {
        reject(err);
      });
    });
  }

  @GrpcStreamMethod('HeroService')
  async listHeroesByNameStream(messages: Observable<any>): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      messages.subscribe(msg => {
        resolve({ heroes: this.items.filter(({ name }) => name.startsWith(msg.name)) });
      }, err => {
        reject(err);
      });
    });
  }

}
