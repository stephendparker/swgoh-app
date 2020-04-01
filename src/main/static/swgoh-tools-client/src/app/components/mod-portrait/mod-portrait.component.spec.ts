import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPortraitComponent } from './mod-portrait.component';

describe('ModPortraitComponent', () => {
  let component: ModPortraitComponent;
  let fixture: ComponentFixture<ModPortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModPortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
