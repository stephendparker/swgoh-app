import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterModSummaryComponent } from './character-mod-summary.component';

describe('CharacterModSummaryComponent', () => {
  let component: CharacterModSummaryComponent;
  let fixture: ComponentFixture<CharacterModSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterModSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterModSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
