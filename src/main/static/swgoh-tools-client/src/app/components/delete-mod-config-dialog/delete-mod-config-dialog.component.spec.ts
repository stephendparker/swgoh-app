import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModConfigDialogComponent } from './delete-mod-config-dialog.component';

describe('DeleteModConfigDialogComponent', () => {
  let component: DeleteModConfigDialogComponent;
  let fixture: ComponentFixture<DeleteModConfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteModConfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
