import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  starships: string[];
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
}

export interface Planet {
  name: string;
}

export interface Starship {
  name: string;
}

export interface Vehicle {
  name: string;
}

export interface PeopleResponse {
  count: number;
  results: Person[];
}

export interface FilmResponse {
  count: number;
  results: Film[];
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(`${this.apiUrl}/people`);
  }

  getFilms(): Observable<FilmResponse> {
    return this.http.get<FilmResponse>(`${this.apiUrl}/films`);
  }

  getPersonByUrl(url: string): Observable<Person> {
    return this.http.get<Person>(url);
  }

  getFilmByUrl(url: string): Observable<Film> {
    return this.http.get<Film>(url);
  }

  getPlanetByUrl(url: string): Observable<Planet> {
    return this.http.get<Planet>(url);
  }

  getStarshipByUrl(url: string): Observable<Starship> {
    return this.http.get<Starship>(url);
  }

  getVehicleByUrl(url: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(url);
  }

  getPersonDetails(person: Person): Observable<any> {
    const film$ = person.films.length > 0 ? this.getFilmByUrl(person.films[0]) : null;
    const homeworld$ = this.getPlanetByUrl(person.homeworld);

    const starships$ = person.starships.length > 0
      ? forkJoin(person.starships.slice(0, 3).map(url => this.getStarshipByUrl(url)))
      : null;

    const observables: any = { homeworld: homeworld$ };
    if (film$) observables.film = film$;
    if (starships$) observables.starships = starships$;

    return forkJoin(observables);
  }
}
