import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexFiltersComponent } from './pokedex-filters.component';

describe('PokedexFiltersComponent', () => {
  let component: PokedexFiltersComponent;
  let fixture: ComponentFixture<PokedexFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
