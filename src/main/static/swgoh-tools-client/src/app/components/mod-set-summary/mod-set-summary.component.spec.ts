import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSetSummaryComponent } from './mod-set-summary.component';

describe('ModSetSummaryComponent', () => {
  let component: ModSetSummaryComponent;
  let fixture: ComponentFixture<ModSetSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModSetSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModSetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
