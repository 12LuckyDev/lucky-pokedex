import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeStatisticsComponent } from './poke-statistics.component';

describe('PokeStatisticsComponent', () => {
  let component: PokeStatisticsComponent;
  let fixture: ComponentFixture<PokeStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
