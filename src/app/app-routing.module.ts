import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: []
})

export class AppRoutingModule {
}
