import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HeroServiceClient, Status } from './proto/hero/hero_pb_service';
import { HeroById, Hero, HeroList } from './proto/hero/hero_pb';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  client: HeroServiceClient;

  constructor(
    private http: HttpClient
  ) {
    this.client = new HeroServiceClient(environment.apiProxy);
  }

  get(path, val): Promise <object> {
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

  list(path, val): Promise <object> {
    return new Promise((resolve, reject) => {
      console.log('ApiService.list', path, val);
      const req = new HeroById();
      req.setId(val);
      this.client.getHeroes(req, null, (err, response: HeroList) => {
        console.log('ApiService.list.response', response.toObject());
        if (err) {
          return reject(err);;
        }
        resolve(response.toObject());
      });
    });
  }

  getStream(path, val): Observable <Hero> {
    return new Observable(obs => {
      console.log('ApiService.getStream', path, val);
      const req = new HeroById();
      req.setId(val);
      const stream = this.client.getHeroByIdStream();
      stream.on('status', (status: Status) => {
        console.log('ApiService.getStream.status', status);
      });
      stream.on('data', (message: any) => {
        console.log('ApiService.getStream.data', message.toObject());
        obs.next(message.toObject() as Hero);
      });
      stream.on('end', () => {
        console.log('ApiService.getStream.end');
        obs.complete();
        // obs.error();
      });
      stream.write(req);
    });
  }

  listStream(path, val): Observable <HeroList> {
    return new Observable(obs => {
      console.log('ApiService.listStream', path, val);
      const req = new HeroById();
      req.setId(val);
      const stream = this.client.getHeroesStream();
      stream.on('status', (status: Status) => {
        console.log('ApiService.getStream.status', status);
      });
      stream.on('data', (message: any) => {
        console.log('ApiService.getStream.data', message.toObject());
        obs.next(message.toObject() as HeroList);
      });
      stream.on('end', () => {
        console.log('ApiService.getStream.end');
        obs.complete();
        // obs.error();
      });
      stream.write(req);
    });
  }

  getRest(path, val): Observable<Object> {
    return this.http.get(`${environment.apiRest}/${path}/${val}`);
  }

  listRest(path): Observable<Object> {
    return this.http.get(`${environment.apiRest}/${path}`);
  }
}
