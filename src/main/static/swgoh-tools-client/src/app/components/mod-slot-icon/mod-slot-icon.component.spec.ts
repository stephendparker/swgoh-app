import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSlotIconComponent } from './mod-slot-icon.component';

describe('ModSlotIconComponent', () => {
  let component: ModSlotIconComponent;
  let fixture: ComponentFixture<ModSlotIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModSlotIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModSlotIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
