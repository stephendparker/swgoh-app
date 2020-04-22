import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { asObservable } from './asObservable';

const TOOLBAR_HEIGHT = 64;
const MOD_LEFT_PANEL_WIDTH = 450;
const MOD_LEFT_PANEL_WIDTH_MINI = 230;

const MOD_PORTRAIT_HEIGHT = 110;
const MOD_PORTRAIT_HEIGHT_MINI = 110;
const MOD_MINI_DIPLAY_PORTRAIT_HEIGHT = 50;

const MOD_PORTRAIT_WIDTH = 250;
const MOD_PORTRAIT_WIDTH_MINI = 200;

const MINI_WIDTH = 1024;
const MEDIUM_WIDTH = 1280;

export class DisplayModeSettings {
  public mini: boolean = false;
  public medium: boolean = false;

  public modLeftPaneWidth: number = 1;
  public modRightPaneWidth: number = 1;

  public windowWidth: number = 0;

  public modPortraitLargeHeight: number = MOD_PORTRAIT_HEIGHT;

  public modPortraitHeight: number = 1;
  public modPortraitWidth: number = 1;

  public modDisplayPortaitHeight: number = 1;

  public modEditorHeight: number = 1;

  public modCharacterReviewHeight: number = 430;
}

@Injectable({
  providedIn: 'root'
})
export class DisplayModeService {

  private displayModeSettings: BehaviorSubject<DisplayModeSettings> = new BehaviorSubject<DisplayModeSettings>(null);
  public displayModeSettings$: Observable<DisplayModeSettings> = asObservable(this.displayModeSettings);
  public setWindowSize(windowSizeEvent: any): void {
    let newValue = new DisplayModeSettings();

    newValue.windowWidth  = windowSizeEvent.innerWidth;

    newValue.mini = windowSizeEvent.innerWidth < MINI_WIDTH;

    newValue.medium = windowSizeEvent.innerWidth < MEDIUM_WIDTH;

    newValue.modDisplayPortaitHeight = MOD_PORTRAIT_HEIGHT;

    if (newValue.mini) {
      newValue.modLeftPaneWidth = MOD_LEFT_PANEL_WIDTH_MINI;
      newValue.modPortraitHeight = MOD_PORTRAIT_HEIGHT_MINI;
      newValue.modPortraitWidth = MOD_PORTRAIT_WIDTH_MINI;
      newValue.modDisplayPortaitHeight = MOD_MINI_DIPLAY_PORTRAIT_HEIGHT;

    } else {
      newValue.modLeftPaneWidth = MOD_LEFT_PANEL_WIDTH;
      newValue.modPortraitHeight = MOD_PORTRAIT_HEIGHT;
      newValue.modPortraitWidth = MOD_PORTRAIT_WIDTH;
    }

    newValue.modRightPaneWidth = windowSizeEvent.innerWidth - newValue.modLeftPaneWidth;
    newValue.modEditorHeight = windowSizeEvent.innerHeight - TOOLBAR_HEIGHT;

    this.displayModeSettings.next(newValue);
  }

  constructor() { }
}
