import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderDiffsComponent } from './gender-diffs.component';

describe('GenderDiffsComponent', () => {
  let component: GenderDiffsComponent;
  let fixture: ComponentFixture<GenderDiffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderDiffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderDiffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
