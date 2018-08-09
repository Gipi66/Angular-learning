import {Component, OnInit} from '@angular/core';
import {Hero} from '../Hero';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;

  // heroService: HeroService;

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
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    this.messageService.add('selected: ' + hero.name);
    this.selectedHero = hero;
  }
}
