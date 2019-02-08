import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  response = '';

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    console.log('AppComponent', this);
    this.response = 'loading...';
    this.api.get('hero', 1).then((data)=> {
      console.log('api.get', data);
      this.response = `Loaded ${data['name']} using gRPC!`;
    });
  }
}
