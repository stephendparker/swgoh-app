import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSetIconComponent } from './mod-set-icon.component';

describe('ModSetIconComponent', () => {
  let component: ModSetIconComponent;
  let fixture: ComponentFixture<ModSetIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModSetIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModSetIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
