import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadDisplayComponent } from './squad-display.component';

describe('SquadDisplayComponent', () => {
  let component: SquadDisplayComponent;
  let fixture: ComponentFixture<SquadDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
