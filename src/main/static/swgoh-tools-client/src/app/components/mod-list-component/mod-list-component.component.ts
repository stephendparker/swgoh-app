import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { Mods, ModsEntity } from './../../model/swgohgg/mods-data';

import { DisplayModeService, DisplayModeSettings } from './../../services/display-mode.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModPortraitComponent } from './../mod-portrait/mod-portrait.component';

import { EvaluatedModDto } from './../../calcs/swgoh-gg-calc';
import { SwgohGgConstants } from './../../calcs/swgoh-gg-constants';

export class ModListFilter {
  public slots: number[] = [];
  public sets: number[] = [];
  public arrowPrimaryFilters: number[] = [];
  public circlePrimaryFilters: number[] = [];
  public trianglePrimaryFilters: number[] = [];
  public crossPrimaryFilters: number[] = [];
  public secondaryIncludeFilters: number[] = [];
  public secondaryExcludeFilters: number[] = [];
}

export class LockedModDto {
  public name: string;
  public id: string;
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
  lockedModDtos: LockedModDto[] = [];

  modListFilter: ModListFilter = new ModListFilter();
  lockedFilter: boolean = true;

  highlightedMod: ModsEntity = null;

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


  setFilters(filters: any) {

    this.modListFilter.sets = filters.filterSets.slice(0);
    this.modListFilter.arrowPrimaryFilters = filters.arrowPrimaryFilters.slice(0);
    this.modListFilter.circlePrimaryFilters = filters.circlePrimaryFilters.slice(0);
    this.modListFilter.trianglePrimaryFilters = filters.trianglePrimaryFilters.slice(0);
    this.modListFilter.crossPrimaryFilters = filters.crossPrimaryFilters.slice(0);
    this.modListFilter.secondaryExcludeFilters = filters.secondaryExcludeFilters == null ? [] : filters.secondaryExcludeFilters.slice(0);
    this.modListFilter.secondaryIncludeFilters = filters.secondaryIncludeFilters == null ? [] : filters.secondaryIncludeFilters.slice(0);
    this.sortField = filters.sort;

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

  setTheLockedMods(lockedMods: LockedModDto[]) {
    this.lockedModDtos = lockedMods;

    this.modPortraits.forEach(modPortrait => {
      let modDto: LockedModDto = lockedMods.find(lockedMod => lockedMod.id == modPortrait.mod.id);
      if (modDto != null) {
        modPortrait.setCurrentCharacter(modDto.name);
        modPortrait.setLocked(true);
      } else {
        modPortrait.setCurrentCharacter(null);
        modPortrait.setLocked(false);
      }
    });
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

      if (this.modListFilter.circlePrimaryFilters != null && this.modListFilter.circlePrimaryFilters.length > 0) {
        modList = modList.filter(mod => mod.mod.slot != SwgohGgConstants.MOD_SLOT_CIRCLE || this.modListFilter.circlePrimaryFilters.indexOf(mod.mod.primary_stat.stat_id) != -1);
      }

      if (this.modListFilter.crossPrimaryFilters != null && this.modListFilter.crossPrimaryFilters.length > 0) {
        modList = modList.filter(mod => mod.mod.slot != SwgohGgConstants.MOD_SLOT_CROSS || this.modListFilter.crossPrimaryFilters.indexOf(mod.mod.primary_stat.stat_id) != -1);
      }

      if (this.modListFilter.trianglePrimaryFilters != null && this.modListFilter.trianglePrimaryFilters.length > 0) {
        modList = modList.filter(mod => mod.mod.slot != SwgohGgConstants.MOD_SLOT_TRIANGLE || this.modListFilter.trianglePrimaryFilters.indexOf(mod.mod.primary_stat.stat_id) != -1);
      }

      if (this.modListFilter.arrowPrimaryFilters != null && this.modListFilter.arrowPrimaryFilters.length > 0) {
        modList = modList.filter(mod => mod.mod.slot != SwgohGgConstants.MOD_SLOT_ARROW || this.modListFilter.arrowPrimaryFilters.indexOf(mod.mod.primary_stat.stat_id) != -1);
      }

      if (this.modListFilter.secondaryIncludeFilters != null && this.modListFilter.secondaryIncludeFilters.length > 0) {
        modList = modList.filter(mod => {

          let retVal = true;
          this.modListFilter.secondaryIncludeFilters.forEach(secondaryInclude => {

            if (secondaryInclude < 0) {
              switch (secondaryInclude) {
                case SwgohGgConstants.MOD_EITHER_DEFENSE_STAT_ID: {
                  if (mod.mod.secondary_stats.find(stat => stat.stat_id == SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID) == null &&
                    mod.mod.secondary_stats.find(stat => stat.stat_id == SwgohGgConstants.MOD_DEFENSE_STAT_ID) == null) {
                    retVal = false;
                  }
                  break;
                }

                case SwgohGgConstants.MOD_EITHER_HEALTH_STAT_ID: {
                  if (mod.mod.secondary_stats.find(stat => stat.stat_id == SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID) == null &&
                    mod.mod.secondary_stats.find(stat => stat.stat_id == SwgohGgConstants.MOD_HEALTH_STAT_ID) == null) {
                    retVal = false;
                  }
                  break;
                }

                case SwgohGgConstants.MOD_EITHER_OFFENSE_STAT_ID: {
                  if (mod.mod.secondary_stats.find(stat => stat.stat_id == SwgohGgConstants.MOD_OFFENSE_STAT_ID) == null &&
                    mod.mod.secondary_stats.find(stat => stat.stat_id == SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID) == null) {
                    retVal = false;
                  }
                  break;
                }

                case SwgohGgConstants.MOD_EITHER_PROTECTION_STAT_ID: {
                  if (mod.mod.secondary_stats.find(stat => stat.stat_id == SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID) == null &&
                    mod.mod.secondary_stats.find(stat => stat.stat_id == SwgohGgConstants.MOD_PROTECTION_STAT_ID) == null) {
                    retVal = false;
                  }
                  break;
                }
              }

            } else if (mod.mod.secondary_stats.find(stat => stat.stat_id == secondaryInclude) == null) {
              retVal = false;
            }
          })
          return retVal;

        });
      }

      if (this.modListFilter.secondaryExcludeFilters != null && this.modListFilter.secondaryExcludeFilters.length > 0) {
        modList = modList.filter(mod => {
          let retVal = true;
          this.modListFilter.secondaryExcludeFilters.forEach(secondaryInclude => {

            if (mod.mod.secondary_stats.find(stat => stat.stat_id == secondaryInclude) != null) {
              retVal = false;
            }
          })
          return retVal;

        });
      }


      if (this.lockedFilter != true) {
        modList = modList.filter(mod => this.lockedModDtos.find(lockedModDto => lockedModDto.id == mod.mod.id) == null);
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
