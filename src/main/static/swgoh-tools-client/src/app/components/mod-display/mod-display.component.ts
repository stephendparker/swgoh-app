import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Mods, ModsEntity } from './../../model/swgohgg/mods-data';
import { takeUntil } from 'rxjs/operators';
import { ModPortraitComponent } from './../mod-portrait/mod-portrait.component';
import { MatIconModule } from '@angular/material/icon';

import { DisplayModeService, DisplayModeSettings } from './../../services/display-mode.service';
import { Subject } from 'rxjs';

const MOD_SLOT_SQUARE = 1;
const MOD_SLOT_ARROW = 2;
const MOD_SLOT_DIAMOND = 3;
const MOD_SLOT_TRIANGLE = 4;
const MOD_SLOT_CIRCLE = 5;
const MOD_SLOT_CROSS = 6;

@Component({
  selector: 'app-mod-display',
  templateUrl: './mod-display.component.html',
  styleUrls: ['./mod-display.component.scss']
})
export class ModDisplayComponent implements OnInit, OnChanges {

  @ViewChildren('modPortraits') modPortraits: QueryList<ModPortraitComponent>;

  @Input() mods: ModsEntity[] = null;

  @Input() highlightMods: ModsEntity[] = null;

  @Output() modClicked: EventEmitter<ModsEntity> = new EventEmitter();

  square: ModsEntity;
  diamond: ModsEntity;
  circle: ModsEntity;
  arrow: ModsEntity;
  triangle: ModsEntity;
  cross: ModsEntity;

  lockedMods: ModsEntity[];

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  protected unsubscribe$ = new Subject<void>();

  border: string = null;

  constructor(private displayModeService: DisplayModeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null) {
        this.displayModeSettings = displayModeSettings;
        this.cdr.detectChanges();
      }
    });

    this.setMods(this.mods);
  }
  ngOnChanges() {

    this.setMods(this.mods);
  }

  setLockedMods(mods: ModsEntity[]) {

    this.lockedMods = mods;
    if (this.modPortraits != null && this.lockedMods != null) {
      this.modPortraits.forEach(modPortrait => {
        let locked = (mods != null && modPortrait.mod != null && mods.find(lockedMod => lockedMod.id == modPortrait.mod.id) != null);

        modPortrait.locked = locked;
      })
    }
  }

  setMods(mods: ModsEntity[]) {
    this.mods = mods;

    this.arrow = null;
    this.triangle = null;
    this.circle = null;
    this.cross = null;
    this.square = null;
    this.diamond = null;

    if (this.mods != null) {
      this.mods.forEach(mod => {
        switch (mod.slot) {
          case MOD_SLOT_ARROW: {
            this.arrow = mod;
            break;
          }
          case MOD_SLOT_TRIANGLE: {
            this.triangle = mod;
            break;
          }
          case MOD_SLOT_CIRCLE: {
            this.circle = mod;
            break;
          }
          case MOD_SLOT_CROSS: {
            this.cross = mod;
            break;
          }
          case MOD_SLOT_SQUARE: {
            this.square = mod;
            break;
          }
          case MOD_SLOT_DIAMOND: {
            this.diamond = mod;
            break;
          }
        }
      });
    }
    // detect changes or viewchildren dont have updated mods for locked mods to display icon - TODO, use ViewChildren
    // to set mods directly instead of using detect changes.  Would require know which viewchild is which slot.
    this.cdr.detectChanges();
    this.setLockedMods(this.lockedMods);
  }

  clickSlot(slot: string, mod: ModsEntity) {
    this.border = (this.border == null || this.border != slot) ? slot : null;
    this.modClicked.emit((this.border != null) ? mod : null);
  }

  highlightMod(mod: ModsEntity): boolean {
    return mod != null && this.highlightMods != null && this.highlightMods.length > 0 && this.highlightMods.find(highlightMod => highlightMod.id == mod.id) != null;
  }



}
