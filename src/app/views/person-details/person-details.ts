import {Component} from '@angular/core';
import {Film, PeopleService, Person, Planet, Starship, Vehicle} from '@app/service/people.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {DetailsBaseComponent} from '@app/shared/details-base';
import {Spinner} from '@app/components/spinner/spinner';
import {Carousel} from '@app/components/carousel/carousel';
import {MatDialog} from '@angular/material/dialog';
import {FilmDialog} from '@app/components/dialog/film-dialog/film-dialog';
import {PlanetDialog} from '@app/components/dialog/planet-dialog/planet-dialog';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton,
    Spinner,
    Carousel,
  ],
  templateUrl: './person-details.html',
  styleUrl: './person-details.scss'
})
export class PersonDetails extends DetailsBaseComponent<Person> {
  person: Person | null = null;
  film: Film | null = null;
  homeworld: Planet | null = null;
  starships: Starship[] = [];
  planets: Planet[] = [];
  vehicles: Vehicle[] = [];
  films: Film[] = [];

  constructor(
    route: ActivatedRoute,
    router: Router,
    private peopleService: PeopleService,
    private dialog: MatDialog
  ) {
    super(route, router);
  }

  protected fetchEntity(url: string) {
    return this.peopleService.getPersonByUrl(url);
  }

  protected afterEntityLoaded(person: Person) {
    this.person = person;

    this.loadMany(
      person.films ?? [],
      url => this.peopleService.getFilmByUrl(url),
      films => this.films = films.sort((a, b) => a.episode_id - b.episode_id)
    );

    this.peopleService.getPersonDetails(person).subscribe({
      next: (details) => {
        this.film = details.film || null;
        this.homeworld = details.homeworld || null;
        this.starships = details.starships || [];
        this.planets = details.planets || [];
        this.vehicles = details.vehicles || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  navigateToFilm(film: Film) {
    this.router.navigate(['/filmDetail'], {
      queryParams: {url: film.url}
    }).then(success => {
      if (!success) {
        console.warn('Navigation Error');
      }
    }).catch(err => console.error(err));
  }

  getPersonImage(): string[] {
    const index = this.imageIndex ?? 0;
    return [
      `https://i.pravatar.cc/300?img=${(index % 70) + 2}`,
      `https://i.pravatar.cc/300?img=${(index % 70) + 3}`,
      `https://i.pravatar.cc/300?img=${(index % 70) + 4}`
    ];
  }

  addNewFilm(): void {
    const dialogRef = this.dialog.open(FilmDialog, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Neuer Film:', result);
      }
    });
  }

  addNewPlanet(): void {
    const dialogRef = this.dialog.open(PlanetDialog, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Neuer Planet:', result);
      }
    });
  }

  navigateToPlanet(planet: Planet) {
    console.log('Navigate to planet:', planet.name);
  }

  navigateToStarship(starship: Starship) {
    console.log('Navigate to starship:', starship.name);
  }

  navigateToVehicle(vehicle: Vehicle) {
    console.log('Navigate to starship:', vehicle.name);
  }
}
