import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexSelectionAllComponent } from './pokedex-selection-all.component';

describe('PokeSelectionAllComponent', () => {
  let component: PokedexSelectionAllComponent;
  let fixture: ComponentFixture<PokedexSelectionAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexSelectionAllComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexSelectionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
