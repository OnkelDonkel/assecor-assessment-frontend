import { Component } from '@angular/core';
import {Film, PeopleService, Person} from '@app/service/people.service';
import {MyCardComponent} from '@app/components/card/card';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {Spinner} from '@app/components/spinner/spinner';

@Component({
  selector: 'app-person-overview',
  imports: [
    MyCardComponent,
    Spinner
  ],
  templateUrl: './person-overview.html',
  styleUrl: './person-overview.scss'
})

export class PersonOverview {
  people: Person[] = [];
  film: Film | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private peopleService: PeopleService,
    private router: Router
  ) {
    this.loadPeople();
  }

  loadPeople() {
    this.loading = true;
    this.peopleService.getPeople().subscribe({
      next: (response) => {
        const people = response.results.slice(0, 6);

        const detailRequests = people.map(person =>
          this.peopleService.getPersonDetails(person)
        );

        forkJoin(detailRequests).subscribe({
          next: (details) => {
            this.people = people.map((person, index) => ({
              ...person,
              filmDetails: details[index].film,
              homeworldDetails: details[index].homeworld,
              starshipDetails: details[index].starships
            }));
            this.loading = false;
          },
          error: () => {
            this.people = people;
            this.loading = false;
          }
        });
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  getPersonDetails(person: any): string {
    const filmDirector = person.filmDetails?.director || 'Kein Film Director';
    const producer = person.filmDetails?.producer || 'Unbekannt';
    const releaseDate = this.formatDate(person.filmDetails?.release_date);

    return `Film: ${filmDirector}\nProduzenten: ${producer}\nErscheinungsdatum: ${releaseDate}`;
  }

  getStockImage(index: number): string {
    return `https://i.pravatar.cc/300?img=${(index % 70) + 2}`;
  }

  navigateToDetail(person: Person, index: number) {
    this.router.navigate(['/person'], {
      queryParams: {
        url: person.url,
        index: index
      }
    }).then(success => {
      if (!success) {
        console.warn('Navigation Error');
      }
    }).catch(err => console.error(err));
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
