import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { FilmOverview } from '@app/views/film-overview/film-overview';
import {PersonOverview} from '@app/views/person-overview/person-overview';
import {PersonDetails} from '@app/views/person-details/person-details';
import {FilmDetails} from '@app/views/film-details/film-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'film', component: FilmOverview },
  { path: 'filmDetail', component: FilmDetails },
  { path: 'character', component: PersonOverview},
  { path: 'person', component: PersonDetails }
];
