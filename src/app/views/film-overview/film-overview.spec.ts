import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmOverview } from './film-overview';

describe('FilmOverview', () => {
  let component: FilmOverview;
  let fixture: ComponentFixture<FilmOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
