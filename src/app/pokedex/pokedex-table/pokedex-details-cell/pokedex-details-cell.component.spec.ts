import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexDetailsCellComponent } from './pokedex-details-cell.component';

describe('PokedexDetailsCellComponent', () => {
  let component: PokedexDetailsCellComponent;
  let fixture: ComponentFixture<PokedexDetailsCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexDetailsCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexDetailsCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
