import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizeModsDialogComponent } from './optimize-mods-dialog.component';

describe('OptimizeModsDialogComponent', () => {
  let component: OptimizeModsDialogComponent;
  let fixture: ComponentFixture<OptimizeModsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimizeModsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizeModsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
