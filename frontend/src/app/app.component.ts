import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hero = {};
  heroes = [];

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    console.log('AppComponent', this);
    this.hero = 'loading...';

    this.api.get('hero', 1).then((data)=> {
      console.log('api.get', data);
      this.hero = data;

      this.heroes = [];
      this.api.list('hero', 'Jo').then((data: object)=> {
        console.log('api.get', data);
        this.heroes = data['heroesList'];
      });
    });
  }
}
