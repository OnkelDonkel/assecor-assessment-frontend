import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDialog } from './planet-dialog';

describe('PlanetDialog', () => {
  let component: PlanetDialog;
  let fixture: ComponentFixture<PlanetDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
