import {Component} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PeopleService, Film, Person, Planet, Starship, Vehicle} from '@app/service/people.service';
import {DetailsBaseComponent} from '@app/shared/details-base';
import {Spinner} from '@app/components/spinner/spinner';
import {RomanPipe} from '@app/pipe/roman.pipe';
import {Carousel} from '@app/components/carousel/carousel';
import {PlanetDialog} from '@app/components/dialog/planet-dialog/planet-dialog';
import {MatDialog} from '@angular/material/dialog';
import {CharacterDialog} from '@app/components/dialog/character-dialog/character-dialog';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatIcon,
    MatIconButton,
    Spinner,
    RomanPipe,
    Carousel
  ],
  templateUrl: './film-details.html',
  styleUrl: './film-details.scss'
})
export class FilmDetails extends DetailsBaseComponent<Film> {
  film: Film | null = null;
  characters: Person[] = [];
  planets: Planet[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];

  constructor(
    route: ActivatedRoute,
    router: Router,
    private peopleService: PeopleService,
    private dialog: MatDialog
  ) {
    super(route, router);
  }

  protected fetchEntity(url: string) {
    return this.peopleService.getFilmByUrl(url);
  }

  protected afterEntityLoaded(film: Film) {
    this.film = film;

    this.loadMany(
      film.characters?.slice(0, 5) ?? [],
      url => this.peopleService.getPersonByUrl(url),
      chars => (this.characters = chars)
    );

    this.loadMany(
      film.planets?.slice(0, 4) ?? [],
      url => this.peopleService.getPlanetByUrl(url),
      planets => (this.planets = planets)
    );

    this.loadMany(
      film.starships?.slice(0, 4) ?? [],
      url => this.peopleService.getStarshipByUrl(url),
      ships => (this.starships = ships)
    );

    this.loadMany(
      film.vehicles?.slice(0, 4) ?? [],
      url => this.peopleService.getVehicleByUrl(url),
      vehicles => (this.vehicles = vehicles)
    );

    this.loading = false;
  }

  navigateToCharacter(character: Person, index: number) {
    this.router.navigate(['/person'], {
      queryParams: {url: character.url, index}
    }).then(success => {
      if (!success) {
        console.warn('Navigation Error');
      }
    }).catch(err => console.error(err));
  }

  getFilmImage(): string[] {
    const index = this.imageIndex ?? 0;
    return [
      `https://picsum.photos/id/${index + 21}/300`,
      `https://picsum.photos/id/${index + 22}/300`,
      `https://picsum.photos/id/${index + 23}/300`
    ];
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

  addNewCharacter(): void {
    const dialogRef = this.dialog.open(CharacterDialog, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Neuer Planet:', result);
      }
    });
  }
}

