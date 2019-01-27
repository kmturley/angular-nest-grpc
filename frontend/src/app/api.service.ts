import { Injectable } from '@angular/core';
// import { grpc } from '@improbable-eng/grpc-web';
// import { Observable } from 'rxjs';

import { HeroService, HeroServiceClient } from './proto/hero/hero_pb_service';
import { QueryHeroesRequest, Hero, HeroById } from './proto/hero/hero_pb';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  client: HeroServiceClient;

  constructor() {
    this.client = new HeroServiceClient('http://localhost:3001');
  }

  get(path) {
    console.log('ApiService.get', path);
    const req = new HeroById();
    req.setId(1);
    this.client.findOne(req, null, (err, response) => {
      if (err) {
        console.error('findOne.error', err);
        return;
      }
      console.log('findOne.success', response);
    });

    // const req = new QueryHeroesRequest();
    // req.setName('John');
    // this.client.queryHeroes(req);

    // const queryHeroesRequest = new QueryHeroesRequest();
    // queryHeroesRequest.setName('John');
    // grpc.invoke(HeroService.QueryHeroes, {
    //   request: queryHeroesRequest,
    //   host: 'http://localhost:3001',
    //   onMessage: (message: Hero) => {
    //     console.log('got hero: ', message.toObject());
    //   },
    //   onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
    //     if (code === grpc.Code.OK) {
    //       console.log('all ok');
    //     } else {
    //       console.log('hit an error', code, msg, trailers);
    //     }
    //   }
    // });
  }
}
