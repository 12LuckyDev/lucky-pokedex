import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeImgComponent } from './pokedex-img.component';

describe('PokeImgComponent', () => {
  let component: PokeImgComponent;
  let fixture: ComponentFixture<PokeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeImgComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
