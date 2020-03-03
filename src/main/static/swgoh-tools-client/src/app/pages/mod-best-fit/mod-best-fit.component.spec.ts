import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModBestFitComponent } from './mod-best-fit.component';

describe('ModBestFitComponent', () => {
  let component: ModBestFitComponent;
  let fixture: ComponentFixture<ModBestFitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModBestFitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModBestFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
