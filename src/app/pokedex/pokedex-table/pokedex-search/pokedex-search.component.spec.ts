import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexSearchComponent } from './pokedex-search.component';

describe('PokedexSearchComponent', () => {
  let component: PokedexSearchComponent;
  let fixture: ComponentFixture<PokedexSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
