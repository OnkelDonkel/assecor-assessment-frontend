import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCard } from './card';

describe('MyCard', () => {
  let component: MyCard;
  let fixture: ComponentFixture<MyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
