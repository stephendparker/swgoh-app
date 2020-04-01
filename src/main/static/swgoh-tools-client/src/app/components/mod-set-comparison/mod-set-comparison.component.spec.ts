import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSetComparisonComponent } from './mod-set-comparison.component';

describe('ModSetComparisonComponent', () => {
  let component: ModSetComparisonComponent;
  let fixture: ComponentFixture<ModSetComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModSetComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModSetComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
