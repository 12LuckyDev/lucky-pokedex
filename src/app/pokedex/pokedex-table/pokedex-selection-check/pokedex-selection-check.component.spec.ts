import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeSelectionCheckComponent } from './pokedex-selection-check.component';

describe('PokeSelectionCheckComponent', () => {
  let component: PokeSelectionCheckComponent;
  let fixture: ComponentFixture<PokeSelectionCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeSelectionCheckComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeSelectionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
