import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderInfoComponent } from './gender-info.component';

describe('GenderInfoComponent', () => {
  let component: GenderInfoComponent;
  let fixture: ComponentFixture<GenderInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
