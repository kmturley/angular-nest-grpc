import { Injectable } from '@angular/core';
import { grpc } from "@improbable-eng/grpc-web";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  get(path) {
    console.log('ApiService.get', path);
  }
}
