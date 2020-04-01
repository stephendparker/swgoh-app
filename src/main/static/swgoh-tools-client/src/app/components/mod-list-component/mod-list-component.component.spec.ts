import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModListComponentComponent } from './mod-list-component.component';

describe('ModListComponentComponent', () => {
  let component: ModListComponentComponent;
  let fixture: ComponentFixture<ModListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
