import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCommonComponent } from './mod-common.component';

describe('ModCommonComponent', () => {
  let component: ModCommonComponent;
  let fixture: ComponentFixture<ModCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
