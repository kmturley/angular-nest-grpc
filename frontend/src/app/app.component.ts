import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  response = '';
  response2 = '';

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    console.log('AppComponent', this);
    this.response = 'loading...';

    this.api.get('hero', 1).then((data)=> {
      console.log('api.get', data);
      this.response = `Loaded ${data['name']} using gRPC!`;

      this.response2 = 'loading...';
      this.api.list('hero', 2).then((data)=> {
        console.log('api.get', data);
        this.response2 = `Loaded ${data['name']} using gRPC!`;
      });
    });
  }
}
