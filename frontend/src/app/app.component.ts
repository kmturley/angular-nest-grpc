import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Hero, HeroList } from './proto/hero/hero_pb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hero: Hero;
  heroes: HeroList;
  heroStream: Hero;
  heroesStream: HeroList;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    console.log('AppComponent', this);
    this.getHero();
  }

  getHero() {
    this.api.get('hero', 1).then((data: Hero)=> {
      this.hero = data;
      this.getHeroes();
    });
  }

  getHeroes() {
    this.api.list('hero', 'Jo').then((data: object)=> {
      this.heroes = data['heroesList'] as HeroList;
      this.getHeroStream();
    });
  }

  getHeroStream() {
    this.api.getStream('hero', 2).then((data: Hero)=> {
      this.heroStream = data;
      this.getHeroesStream();
    });
  }

  getHeroesStream() {
    this.api.listStream('hero', 'Bi').then((data: object)=> {
      this.heroesStream = data['heroesList'] as HeroList;
    });
  }
}
