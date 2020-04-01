import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPlayerComponent } from './mod-player.component';

describe('ModPlayerComponent', () => {
  let component: ModPlayerComponent;
  let fixture: ComponentFixture<ModPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
