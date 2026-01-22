import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOverview } from './person-overview';

describe('PersonOverview', () => {
  let component: PersonOverview;
  let fixture: ComponentFixture<PersonOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
