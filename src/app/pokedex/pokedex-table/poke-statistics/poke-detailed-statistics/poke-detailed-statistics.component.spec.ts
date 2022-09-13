import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDetailedStatisticsComponent } from './poke-detailed-statistics.component';

describe('PokeDetailedStatisticsComponent', () => {
  let component: PokeDetailedStatisticsComponent;
  let fixture: ComponentFixture<PokeDetailedStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeDetailedStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeDetailedStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
