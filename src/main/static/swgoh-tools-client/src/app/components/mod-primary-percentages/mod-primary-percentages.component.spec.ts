import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPrimaryPercentagesComponent } from './mod-primary-percentages.component';

describe('ModPrimaryPercentagesComponent', () => {
  let component: ModPrimaryPercentagesComponent;
  let fixture: ComponentFixture<ModPrimaryPercentagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModPrimaryPercentagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModPrimaryPercentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
