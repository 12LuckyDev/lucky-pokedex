import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexStatisticsComponent } from './pokedex-statistics.component';

describe('PokeStatisticsComponent', () => {
  let component: PokedexStatisticsComponent;
  let fixture: ComponentFixture<PokedexStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexStatisticsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
