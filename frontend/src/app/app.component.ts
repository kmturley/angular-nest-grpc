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
  heroStream: Observable<Hero>;
  heroesStream: Observable<HeroList>;
  heroRest: Observable<Object>;
  heroesRest: Observable<Object>;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    console.log('AppComponent', this);
    this.getHero();
  }

  getHero() {
    this.api.get('hero', 1).then((data: Hero) => {
      this.hero = data;
      this.getHeroes();
    });
  }

  getHeroes() {
    this.api.list('hero', 2).then((data: object) => {
      this.heroes = data['heroesList'] as HeroList;
      this.getHeroStream();
    });
  }

  getHeroStream() {
    this.heroStream = this.api.getStream('hero', 3);
    this.getHeroesStream();
  }

  getHeroesStream() {
    this.heroesStream = this.api.listStream('hero', 4);
    this.getHeroRest();
  }

  getHeroRest() {
    this.heroRest = this.api.getRest('hero', 1);
    this.getHeroesRest();
  }

  getHeroesRest() {
    this.heroesRest = this.api.listRest('hero');
  }
}
