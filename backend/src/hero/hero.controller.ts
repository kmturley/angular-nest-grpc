import { Get, OnModuleInit, Controller } from '@nestjs/common';
import {
  Client,
  GrpcMethod,
  ClientGrpc,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { grpcClientOptions } from '../grpc-client.options';
import { HeroById } from './interfaces/hero-by-id.interface';
import { QueryHeroesRequest } from './interfaces/query-heroes-request';
import { Hero } from './interfaces/hero.interface';

interface HeroService {
  findOne(data: { id: number }): Observable<any>;
  queryHeroes(data: { name: string }): Observable<any>;
}

@Controller()
export class HeroController implements OnModuleInit {
  @Client(grpcClientOptions) private readonly client: ClientGrpc;
  private heroService: HeroService;

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  @Get()
  call(): Observable<any> {
    return this.heroService.findOne({ id: 1 });
  }

  @GrpcMethod('HeroService')
  findOne(data: HeroById): Hero {
    const items: Hero[] = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    return items.find(({ id }) => id === data.id);
  }

  @GrpcMethod('HeroService')
  queryHeroes(data: QueryHeroesRequest): Array<Hero> {
    const items: Hero[] = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    return items.filter(({ name }) => name === data.name);
  }
}
