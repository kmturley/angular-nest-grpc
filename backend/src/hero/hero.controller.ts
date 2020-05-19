import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero, HeroList } from './interfaces/hero.interface';

interface HeroService {
  getHeroes(data: { id: number }): Observable<HeroList>;
  getHeroById(data: { id: number }): Observable<Hero>;
  getHeroesStream(upstream: Observable<HeroById>): Observable<HeroList>;
  getHeroByIdStream(upstream: Observable<HeroById>): Observable<Hero>;
}
@Controller('hero')
export class HeroController implements OnModuleInit {
  private heroService: HeroService;
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Billy' },
    { id: 4, name: 'Joey' },
  ];

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  // http methods

  @Get()
  getList(): Observable<HeroList> {
    return this.heroService.getHeroes({ id: 1 }); // must return arrays as objects 
  }

  @Get(':id')
  getItem(@Param('id') id: string): Observable<Hero> {
    return this.heroService.getHeroById({ id: +id });
  }

  // grpc methods

  @GrpcMethod('HeroService')
  getHeroes(data: HeroById): HeroList {
    return { heroes: this.items }; // must return arrays as objects 
  }

  @GrpcMethod('HeroService')
  getHeroById(data: HeroById): Hero {
    return this.items.find(({ id }) => id === data.id);
  }

  // grpc streaming methods

  @GrpcStreamMethod('HeroService')
  getHeroesStream(data$: Observable<HeroById>): Observable<HeroList> {
    const hero$ = new Subject<HeroList>();
    const onNext = (heroById: HeroById) => {
      hero$.next({ heroes: this.items }); // must return arrays as objects 
    };
    const onComplete = () => hero$.complete();
    data$.subscribe(onNext, null, onComplete);
    return hero$.asObservable();
  }

  @GrpcStreamMethod('HeroService')
  getHeroByIdStream(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();
    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe(onNext, null, onComplete);
    return hero$.asObservable();
  }

}
