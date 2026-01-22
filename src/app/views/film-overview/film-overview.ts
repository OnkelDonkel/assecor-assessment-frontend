import { Component } from '@angular/core';
import { MyCardComponent } from '@app/components/card/card';
import { PeopleService, Film } from '@app/service/people.service';
import { Router } from '@angular/router';
import {Spinner} from '@app/components/spinner/spinner';

@Component({
  selector: 'app-film-overview',
  imports: [
    MyCardComponent,
    Spinner,
  ],
  templateUrl: './film-overview.html',
  styleUrl: './film-overview.scss'
})
export class FilmOverview {
  films: Film[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private peopleService: PeopleService,
    private router: Router
  ) {
    this.loadFilms();
  }

  loadFilms() {
    this.loading = true;
    this.peopleService.getFilms().subscribe({
      next: (response) => {
        // Sort by episode number
        this.films = response.results.sort((a, b) => a.episode_id - b.episode_id);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  getFilmDetails(film: Film): string {
    const director = film.director || 'Unbekannt';
    const producer = film.producer || 'Unbekannt';
    const releaseDate = this.formatDate(film.release_date);

    return `Direktor: ${director}\nProduzenten: ${producer}\nErscheinungsdatum: ${releaseDate}`;
  }

  getFilmImage(index: number): string {
    return `https://picsum.photos/id/${index + 21}/300`;
  }

  navigateToDetail(film: Film, index: number) {
    this.router.navigate(['/filmDetail'], {
      queryParams: {
        url: film.url,
        index: index
      }
    }).then(success => {
      if (!success) {
        console.warn('Navigation Error');
      }
    }).catch(err => console.error(err));
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Unbekannt';
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
