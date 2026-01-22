import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetails } from './film-details';

describe('FilmDetails', () => {
  let component: FilmDetails;
  let fixture: ComponentFixture<FilmDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
