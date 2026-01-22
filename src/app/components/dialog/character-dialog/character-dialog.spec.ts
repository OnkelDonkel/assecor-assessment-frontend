import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDialog } from './character-dialog';

describe('CharacterDialog', () => {
  let component: CharacterDialog;
  let fixture: ComponentFixture<CharacterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
