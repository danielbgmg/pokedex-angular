import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPokeSimpleComponent } from './card-poke-simple.component';

describe('CardPokeSimpleComponent', () => {
  let component: CardPokeSimpleComponent;
  let fixture: ComponentFixture<CardPokeSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPokeSimpleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPokeSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
