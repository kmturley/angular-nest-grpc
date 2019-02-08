import { Injectable } from '@angular/core';

import { HeroServiceClient } from './proto/hero/hero_pb_service';
import { Hero, HeroById } from './proto/hero/hero_pb';

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
      console.log('ApiService.get', path);
      const req = new HeroById();
      req.setId(val);
      this.client.findOne(req, null, (err, response:Hero) => {
        if (err) {
          return reject(err);;
        }
        resolve(response.toObject());
      });
    });
  }
}
