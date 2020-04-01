import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { Mods, ModsEntity } from './../../model/swgohgg/mods-data';

import { DisplayModeService, DisplayModeSettings } from './../../services/display-mode.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModPortraitComponent } from './../mod-portrait/mod-portrait.component';

import { EvaluatedModDto } from './../../calcs/swgoh-gg-calc';

export class ModListFilter {
  public slots: number[] = [];
  public sets: number[] = [];
}

@Component({
  selector: 'app-mod-list-component',
  templateUrl: './mod-list-component.component.html',
  styleUrls: ['./mod-list-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModListComponentComponent implements OnInit {

  private modPortraits: QueryList<ModPortraitComponent>;

  @ViewChildren('modPortraits') set content(content: QueryList<ModPortraitComponent>) {
    this.modPortraits = content;
    this.setLockedMods(this.lockedMods);
  }

  @Input() mods: EvaluatedModDto[] = null;

  @Output() selectMod: EventEmitter<ModsEntity> = new EventEmitter<ModsEntity>();

  lockedMods: ModsEntity[];

  modListFilter: ModListFilter = new ModListFilter();
  lockedFilter: boolean = true;

  highlightedMod: ModsEntity = null;

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  windowWidth: number = null;

  modRows: EvaluatedModDto[][] = [];

  sortField: string = 'strength';

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  protected unsubscribe$ = new Subject<void>();

  constructor(private displayModeService: DisplayModeService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null)
        this.displayModeSettings = displayModeSettings;
      this.regenerateRows();
      this.cdr.detectChanges();
    });
    this.regenerateRows();
    this.cdr.detectChanges();
  }

  isLocked(mod: ModsEntity): boolean {
    return (this.lockedMods != null && mod != null && this.lockedMods.find(lockedMod => lockedMod.id == mod.id) != null);
  }

  setMods(mods: EvaluatedModDto[]) {
    this.mods = mods;
    this.regenerateRows();
    this.cdr.detectChanges();
  }

  setModSortField(sortField: string) {
    this.sortField = sortField;
    this.regenerateRows();
    this.cdr.detectChanges();
  }

  setModSlotFilter(slots: number[]) {
    this.modListFilter.slots = slots;
    this.regenerateRows();
    this.cdr.detectChanges();
  }

  setModSetFilter(sets: number[]) {
    this.modListFilter.sets = sets;
    this.regenerateRows();
    this.cdr.detectChanges();
  }

  setLockedFilter(value: boolean) {
    this.lockedFilter = value;
    this.regenerateRows();
    this.cdr.detectChanges();
  }

  setLockedMods(mods: ModsEntity[]) {
    this.lockedMods = mods;
    if (mods != null && this.modPortraits != null) {
      this.modPortraits.forEach(modPortrait => {
        modPortrait.setLocked(mods != null && modPortrait.mod != null && mods.find(lockedMod => lockedMod.id == modPortrait.mod.id) != null);
      })
    }
  }

  regenerateRows() {
    if (this.mods != null && this.mods.length > 0) {
      let columnCount = Math.floor((this.displayModeSettings.modRightPaneWidth - 30) / this.displayModeSettings.modPortraitWidth);

      let modList = this.mods;

      if (this.modListFilter.slots != null && this.modListFilter.slots.length > 0) {
        modList = modList.filter(mod => this.modListFilter.slots.indexOf(mod.mod.slot) != -1);
      }
      if (this.modListFilter.sets != null && this.modListFilter.sets.length > 0) {
        modList = modList.filter(mod => this.modListFilter.sets.indexOf(mod.mod.set) != -1);
      }
      if (this.lockedFilter != true) {
        modList = modList.filter(mod => this.lockedMods.find(lockedMod => lockedMod.id == mod.mod.id) == null);
      }

      modList = modList.sort((a, b) => {
        if (b[this.sortField] != a[this.sortField]) {
          return b[this.sortField] - a[this.sortField];
        }
        return b.strength - a.strength;
      });

      this.modRows = modList.map(function (e, i) {
        return i % columnCount === 0 ? modList.slice(i, i + columnCount) : null;
      }).filter(function (e) { return e; });
    } else {
      this.modRows = [];
    }
  }

  onResize(event) {
    this.windowWidth = event.target.innerWidth; // window width
  }

  clickMod(mod: ModsEntity) {
    this.highlightedMod = mod;
    this.selectMod.emit(mod);
    this.cdr.detectChanges();
  }

}
