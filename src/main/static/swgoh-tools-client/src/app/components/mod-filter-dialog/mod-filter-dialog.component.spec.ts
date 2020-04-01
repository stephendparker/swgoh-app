import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModFilterDialogComponent } from './mod-filter-dialog.component';

describe('ModFilterDialogComponent', () => {
  let component: ModFilterDialogComponent;
  let fixture: ComponentFixture<ModFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
