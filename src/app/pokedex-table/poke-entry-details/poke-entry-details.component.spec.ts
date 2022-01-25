import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeEntryDetailsComponent } from './poke-entry-details.component';

describe('PokeEntryDetailsComponent', () => {
  let component: PokeEntryDetailsComponent;
  let fixture: ComponentFixture<PokeEntryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeEntryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
