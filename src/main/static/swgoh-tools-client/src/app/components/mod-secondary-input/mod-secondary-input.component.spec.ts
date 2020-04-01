import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSecondaryInputComponent } from './mod-secondary-input.component';

describe('ModSecondaryInputComponent', () => {
  let component: ModSecondaryInputComponent;
  let fixture: ComponentFixture<ModSecondaryInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModSecondaryInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModSecondaryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
