import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeSelectionAllComponent } from './poke-selection-all.component';

describe('PokeSelectionAllComponent', () => {
  let component: PokeSelectionAllComponent;
  let fixture: ComponentFixture<PokeSelectionAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeSelectionAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeSelectionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
