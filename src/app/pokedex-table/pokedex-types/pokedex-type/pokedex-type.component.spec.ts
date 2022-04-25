import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexTypeComponent } from './pokedex-type.component';

describe('PokedexTypeComponent', () => {
  let component: PokedexTypeComponent;
  let fixture: ComponentFixture<PokedexTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
