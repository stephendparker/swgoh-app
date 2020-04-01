import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshModDialogComponent } from './refresh-mod-dialog.component';

describe('RefreshModDialogComponent', () => {
  let component: RefreshModDialogComponent;
  let fixture: ComponentFixture<RefreshModDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshModDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshModDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
