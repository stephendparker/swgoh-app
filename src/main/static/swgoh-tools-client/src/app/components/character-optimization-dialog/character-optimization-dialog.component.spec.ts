import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterOptimizationDialogComponent } from './character-optimization-dialog.component';

describe('CharacterOptimizationDialogComponent', () => {
  let component: CharacterOptimizationDialogComponent;
  let fixture: ComponentFixture<CharacterOptimizationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterOptimizationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterOptimizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
