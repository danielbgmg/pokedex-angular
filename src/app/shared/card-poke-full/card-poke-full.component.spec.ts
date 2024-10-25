import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPokeFullComponent } from './card-poke-full.component';

describe('CardPokeFullComponent', () => {
  let component: CardPokeFullComponent;
  let fixture: ComponentFixture<CardPokeFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPokeFullComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPokeFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
