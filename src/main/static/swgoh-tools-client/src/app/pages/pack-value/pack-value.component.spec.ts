import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackValueComponent } from './pack-value.component';

describe('PackValueComponent', () => {
  let component: PackValueComponent;
  let fixture: ComponentFixture<PackValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
