import {Directive, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';

@Directive()
export abstract class DetailsBaseComponent<T> implements OnInit {
  entity: T | null = null;
  loading = true;
  imageIndex: number | null = null;

  protected constructor(
    protected route: ActivatedRoute,
    protected router: Router
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const url = params['url'];
      const index = Number(params['index']);

      if (!isNaN(index)) {
        this.imageIndex = index;
      }

      if (url) {
        this.loadDetails(url);
      }
    });
  }

  protected abstract fetchEntity(url: string): Observable<T>;

  protected abstract afterEntityLoaded(entity: T): void;

  protected loadDetails(url: string) {
    this.loading = true;

    this.fetchEntity(url).subscribe({
      next: (entity) => {
        this.entity = entity;
        this.afterEntityLoaded(entity);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  protected loadMany<R>(
    urls: string[],
    loader: (url: string) => Observable<R>,
    assign: (result: R[]) => void
  ) {
    if (!urls || urls.length === 0) {
      assign([]);
      return;
    }

    forkJoin(urls.map(loader)).subscribe({
      next: assign,
      error: () => console.error('Error loading related resources')
    });
  }

  goBack(path: string) {
    this.router.navigate([path]);
  }
}
