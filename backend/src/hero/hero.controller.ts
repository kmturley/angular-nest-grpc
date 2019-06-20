import { Get, OnModuleInit, Controller, Param } from '@nestjs/common';
import {
  Client,
  GrpcMethod,
  ClientGrpc,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
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

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  @Get()
  call(): Observable<any> {
    return this.heroService.getHeroById({ id: 1 });
  }

  // @Get(':id')
  // getHeroById(@Param('id') id: string): Hero {
  //   const items = [
  //     { id: 1, name: 'John' },
  //     { id: 2, name: 'Doe' },
  //     { id: 3, name: 'Billy' },
  //     { id: 4, name: 'Joey' },
  //   ];
  //   return items.find((item) => item.id === Number(id));
  // }

  @GrpcMethod('HeroService')
  getHeroById(data: HeroById, metadata: any): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
      { id: 3, name: 'Billy' },
      { id: 4, name: 'Joey' },
    ];
    return items.find(({ id }) => id === data.id);
  }

  @GrpcMethod('HeroService')
  listHeroesByName(data: HeroByName, metadata: any): object {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
      { id: 3, name: 'Billy' },
      { id: 4, name: 'Joey' },
    ];
    return { heroes: items.filter(({ name }) => name.startsWith(data.name)) };
  }
}
