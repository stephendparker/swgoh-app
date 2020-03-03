import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFilterComponent } from './player-filter.component';

describe('PlayerFilterComponent', () => {
  let component: PlayerFilterComponent;
  let fixture: ComponentFixture<PlayerFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
