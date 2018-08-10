import {Component, OnInit} from '@angular/core';
import {HeroService} from '../hero.service';
import {Hero} from '../Hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private heroesService: HeroService) {
  }

  heroes: Hero[];

  ngOnInit() {
    this.heroesService.getHeroes()
      .subscribe(h => this.heroes = h);
  }

  getHeroes() {
  }
}
