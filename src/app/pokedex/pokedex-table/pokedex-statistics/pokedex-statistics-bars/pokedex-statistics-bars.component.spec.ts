import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexStatisticsBarsComponent } from './pokedex-statistics-bars.component';

describe('PokeStatisticsBarsComponent', () => {
  let component: PokedexStatisticsBarsComponent;
  let fixture: ComponentFixture<PokedexStatisticsBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexStatisticsBarsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexStatisticsBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
