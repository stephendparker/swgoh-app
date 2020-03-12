import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildPlayerSelectorComponent } from './guild-player-selector.component';

describe('GuildPlayerSelectorComponent', () => {
  let component: GuildPlayerSelectorComponent;
  let fixture: ComponentFixture<GuildPlayerSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuildPlayerSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildPlayerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
