import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSetRankingsComponent } from './mod-set-rankings.component';

describe('ModSetRankingsComponent', () => {
  let component: ModSetRankingsComponent;
  let fixture: ComponentFixture<ModSetRankingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModSetRankingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModSetRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
