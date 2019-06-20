export interface Hero {
  id: number;
  name: string;
}

export interface HeroList extends Array<Hero> { }
