import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexDetailedStatisticsComponent } from './pokedex-detailed-statistics.component';

describe('PokeDetailedStatisticsComponent', () => {
  let component: PokedexDetailedStatisticsComponent;
  let fixture: ComponentFixture<PokedexDetailedStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexDetailedStatisticsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexDetailedStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
