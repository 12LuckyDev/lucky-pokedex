import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeStatisticsBarsComponent } from './poke-statistics-bars.component';

describe('PokeStatisticsBarsComponent', () => {
  let component: PokeStatisticsBarsComponent;
  let fixture: ComponentFixture<PokeStatisticsBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeStatisticsBarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeStatisticsBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
