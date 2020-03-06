import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSetPercentagesComponent } from './mod-set-percentages.component';

describe('ModSetPercentagesComponent', () => {
  let component: ModSetPercentagesComponent;
  let fixture: ComponentFixture<ModSetPercentagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModSetPercentagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModSetPercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
