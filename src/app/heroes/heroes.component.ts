import {Component, OnInit} from '@angular/core';
import {Hero} from '../Hero';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes: Hero[];

  constructor(private heroService: HeroService,
              private messageService: MessageService) {
    // this.heroService = heroService;
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(heroName: string): void {
    const name = heroName.trim();
    if (name) {
      this.heroService.addHero({name} as Hero)
        .subscribe(hero => this.heroes.push(hero));
    }
  }
}
