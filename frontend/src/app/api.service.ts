import { Injectable } from '@angular/core';

import { HeroServiceClient } from './proto/hero/hero_pb_service';
import { HeroById } from './proto/hero/hero_pb';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  client: HeroServiceClient;

  constructor() {
    this.client = new HeroServiceClient('http://localhost:8080');
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
  }
}
