import { Injectable } from '@angular/core';
import { grpc } from "@improbable-eng/grpc-web";
import { Observable } from 'rxjs';

import { HeroService } from "./proto/hero/hero_pb_service";
import { QueryHeroesRequest, Hero, HeroById } from "./proto/hero/hero_pb";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    // private heroService: HeroService
  ) { }

  get(path) {
    console.log('ApiService.get', path);
    const queryHeroesRequest = new QueryHeroesRequest();
    queryHeroesRequest.setNamePrefix('Jo');
    grpc.invoke(HeroService.QueryHeroes, {
      request: queryHeroesRequest,
      host: 'http://localhost:3001',
      onMessage: (message: Hero) => {
        console.log('got hero: ', message.toObject());
      },
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
        if (code === grpc.Code.OK) {
          console.log('all ok');
        } else {
          console.log('hit an error', code, msg, trailers);
        }
      }
    });
  }
}
