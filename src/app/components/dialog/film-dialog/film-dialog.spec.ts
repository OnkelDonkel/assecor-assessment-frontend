import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDialog } from './film-dialog';

describe('FilmDialog', () => {
  let component: FilmDialog;
  let fixture: ComponentFixture<FilmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
