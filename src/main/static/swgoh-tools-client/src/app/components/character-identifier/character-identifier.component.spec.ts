import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterIdentifierComponent } from './character-identifier.component';

describe('CharacterIdentifierComponent', () => {
  let component: CharacterIdentifierComponent;
  let fixture: ComponentFixture<CharacterIdentifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterIdentifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
