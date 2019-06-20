import { Injectable } from '@angular/core';

import { HeroServiceClient } from './proto/hero/hero_pb_service';
import { HeroById, Hero, HeroList } from './proto/hero/hero_pb';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  client: HeroServiceClient;

  constructor() {
    this.client = new HeroServiceClient('http://localhost:8080');
  }

  get(path, val) {
    return new Promise((resolve, reject) => {
      console.log('ApiService.get', path, val);
      const req = new HeroById();
      req.setId(val);
      this.client.getHeroById(req, null, (err, response: Hero) => {
        console.log('ApiService.get.response', err, response);
        if (err) {
          return reject(err);;
        }
        resolve(response.toObject());
      });
    });
  }

  list(path, val) {
    return new Promise((resolve, reject) => {
      console.log('ApiService.list', path, val);
      const req = new HeroById();
      req.setId(val);
      this.client.listHeroesById(req, null, (err, response: HeroList) => {
        console.log('ApiService.list.response', err, response);
        if (err) {
          return reject(err);;
        }
        resolve(response.toObject());
      });
    });
  }

  // query(path, val) {
  //   return new Promise((resolve, reject) => {
  //     console.log('ApiService.query', path, val);
  //     const req = new QueryHeroesRequest();
  //     req.setName(val);
  //     const stream = this.client.queryHeroes(req);
  //     stream.on('status', (status: Status) => {
  //       console.log('ApiService.query.status', status);
  //     });
  //     stream.on('data', (message: Hero) => {
  //       console.log('ApiService.query.data', message);
  //       resolve(message.toObject());
  //     });
  //     stream.on('end', () => {
  //       console.log('ApiService.query.end');
  //     });
  //   });
  // }
}
