import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModMatchCharacterComponent } from './mod-match-character.component';

describe('ModMatchCharacterComponent', () => {
  let component: ModMatchCharacterComponent;
  let fixture: ComponentFixture<ModMatchCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModMatchCharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModMatchCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
