import { Injectable } from '@angular/core';

import { HeroServiceClient, Status } from './proto/hero/hero_pb_service';
import { HeroById, HeroByName, Hero, HeroList } from './proto/hero/hero_pb';

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
        console.log('ApiService.get.response', response.toObject());
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
      const req = new HeroByName();
      req.setName(val);
      this.client.listHeroesByName(req, null, (err, response: HeroList) => {
        console.log('ApiService.list.response', response.toObject());
        if (err) {
          return reject(err);;
        }
        resolve(response.toObject());
      });
    });
  }

  getStream(path, val) {
    return new Promise((resolve, reject) => {
      console.log('ApiService.getStream', path, val);
      const req = new HeroById();
      req.setId(val);
      const stream = this.client.getHeroByIdStream();
      stream.on('status', (status: Status) => {
        console.log('ApiService.getStream.status', status);
      });
      stream.on('data', (message: Hero) => {
        console.log('ApiService.getStream.data', message.toObject());
        resolve(message.toObject());
      });
      stream.on('end', () => {
        console.log('ApiService.getStream.end');
      });
      stream.write(req);
    });
  }

  listStream(path, val) {
    return new Promise((resolve, reject) => {
      console.log('ApiService.listStream', path, val);
      const req = new HeroByName();
      req.setName(val);
      const stream = this.client.listHeroesByNameStream();
      stream.on('status', (status: Status) => {
        console.log('ApiService.getStream.status', status);
      });
      stream.on('data', (message: HeroList) => {
        console.log('ApiService.getStream.data', message.toObject());
        resolve(message.toObject());
      });
      stream.on('end', () => {
        console.log('ApiService.getStream.end');
      });
      stream.write(req);
    });
  }
}
