import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadEditComponent } from './squad-edit.component';

describe('SquadEditComponent', () => {
  let component: SquadEditComponent;
  let fixture: ComponentFixture<SquadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
