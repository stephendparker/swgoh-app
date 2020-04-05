import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadManagerComponent } from './squad-manager.component';

describe('SquadManagerComponent', () => {
  let component: SquadManagerComponent;
  let fixture: ComponentFixture<SquadManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
