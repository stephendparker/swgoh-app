import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';

import { Mods, ModsEntity } from './../../model/swgohgg/mods-data';
import { SetTotalCounts, SwgohGgCalc, ModTotalBonus, StatsDto } from './../../calcs/swgoh-gg-calc';
import { SwgohGgConstants } from './../../calcs/swgoh-gg-constants';
import { UnitsEntity } from './../../model/swgohgg/player-data';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DisplayModeService, DisplayModeSettings } from './../../services/display-mode.service';

class ModCompareFieldsDto {
  name: string;
  label: string;
  format: string;
}

@Component({
  selector: 'app-mod-set-comparison',
  templateUrl: './mod-set-comparison.component.html',
  styleUrls: ['./mod-set-comparison.component.scss']
})
export class ModSetComparisonComponent implements OnInit, OnChanges {

  @Input() existingMods: ModsEntity[] = null;
  @Input() currentMods: ModsEntity[] = null;
  @Input() newMods: ModsEntity[] = null;
  @Input() pendingMods: ModsEntity[] = null;
  @Input() unitData: UnitsEntity = null;
  @Input() excludedMods: ModsEntity[] = null;
  @Input() showSixEOverride: boolean = true;

  fields: ModCompareFieldsDto[] = [
    { name: 'speed', label: 'Speed', format: '' },
    { name: 'health', label: 'Health', format: '' },
    { name: 'protection', label: 'Protection', format: '' },
    { name: 'physicalOffense', label: 'Physical Offense', format: '' },
    { name: 'specialOffense', label: 'Special Offense', format: '' },
    { name: 'physicalDefense', label: 'Armor', format: '%' },
    { name: 'speciallDefense', label: 'Resistance', format: '%' },
    { name: 'tenacity', label: 'Tenacity', format: '%' },
    { name: 'potency', label: 'Potency', format: '%' },
    { name: 'physicalCritChance', label: 'Physical Crit Chance', format: '%' },
    { name: 'specialCritChance', label: 'Special Crit Chance', format: '%' },
    { name: 'critDamage', label: 'Crit Damage', format: '%' },
    { name: 'physicalCritAvoidance', label: 'Physical Crit Avoid', format: '%' },
    { name: 'specialCritAvoidance', label: 'Special Crit Avoid', format: '%' }
  ];

  inGameTotalBonus: ModTotalBonus;
  lockedTotalBonus: ModTotalBonus;
  pendingTotalBonus: ModTotalBonus;

  characterBaseStats: StatsDto = null;
  inGameStats: StatsDto = null;
  lockedStats: StatsDto = null;
  pendingStats: StatsDto = null;
  sixEStats: StatsDto = null;

  @Input() inGameMods: ModsEntity[] = null;
  // pendingMods: ModsEntity[] = null;
  @Input() lockedMods: ModsEntity[] = null;


  showLocked: boolean = false;
  showPending: boolean = false;
  showSixE: boolean = false;
  showGame: boolean = true;
  showLockedPending: boolean = true;

  existingTotalBonus: ModTotalBonus;
  newTotalBonus: ModTotalBonus;
  currentTotalBonus: ModTotalBonus;
  pendingModsTotalBonus: ModTotalBonus;
  currentModsTotalBonus: ModTotalBonus;

  oldStats: StatsDto = new StatsDto();
  newStats: StatsDto = null;
  currentStats: StatsDto = null;
  // pendingStats: StatsDto = null;
  upgradedPendingStats: StatsDto = null;
  baseStats: StatsDto = null;

  dataSource: any[] = [];

  displayedColumns: string[] = ["label", "oldValue", "newValue", "delta", "pendingValue", "pendingDelta", "pendingUpgradedValue", "pendingUpgradedDelta"];

  existingColumns: string[] = ["label", "oldValue"];
  currentColumns: string[] = ["newValue", "delta"];
  pendingColumns: string[] = ["pendingValue", "pendingDelta"];
  pendingUpgradeColumns: string[] = ["pendingUpgradedValue", "pendingUpgradedDelta"];

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  protected unsubscribe$ = new Subject<void>();

  constructor(private displayModeService: DisplayModeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null)
        this.displayModeSettings = displayModeSettings;
    });
    this.setData(this.unitData, this.existingMods, this.currentMods, this.newMods, this.pendingMods);

    this.calculate();
  }

  ngOnChanges() {
    this.calculate();
  }

  calculate() {

    this.inGameTotalBonus = null;
    this.lockedTotalBonus = null;
    this.pendingTotalBonus = null;

    this.characterBaseStats = null;

    this.inGameStats = null;
    this.lockedStats = null;
    this.pendingStats = null;
    this.sixEStats = null;


    this.showLocked = false;
    this.showPending = false;
    this.showSixE = false;

    if (this.inGameMods != null) {
      this.inGameTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.inGameMods);
    }
    if (this.lockedMods != null && this.lockedMods.length > 0) {
      this.lockedTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.lockedMods);
    }

    let derivedPendingMods = this.pendingMods == null ? [] : this.pendingMods.slice(0);

    if (this.lockedMods != null && this.lockedMods.length > 0) {
      this.lockedMods.forEach(lockedMod => {
        if (derivedPendingMods.find(derivedPendingMod => derivedPendingMod.slot == lockedMod.slot) == null) {
          derivedPendingMods.push(lockedMod);
        }
      });
    }

    if (this.inGameMods != null && this.inGameMods.length > 0) {
      this.inGameMods.forEach(lockedMod => {
        if (this.excludedMods == null || this.excludedMods.find(excludedMod => excludedMod.id == lockedMod.id) == null &&
          derivedPendingMods.find(derivedPendingMod => derivedPendingMod.slot == lockedMod.slot) == null) {
          derivedPendingMods.push(lockedMod);
        }
      });
    }

    if (derivedPendingMods != null) {
      this.pendingTotalBonus = SwgohGgCalc.calculateModTotalBonus(derivedPendingMods);
    }
    if (this.unitData != null && this.inGameTotalBonus != null) {
      this.characterBaseStats = SwgohGgCalc.deriveBaseStats(this.unitData, this.inGameTotalBonus);
    }

    if (this.characterBaseStats != null && this.inGameTotalBonus != null) {
      this.inGameStats = SwgohGgCalc.applyBonuses(this.characterBaseStats, this.inGameTotalBonus);
    }
    if (this.characterBaseStats != null && this.lockedTotalBonus != null) {
      this.lockedStats = SwgohGgCalc.applyBonuses(this.characterBaseStats, this.lockedTotalBonus);
    }
    if (this.characterBaseStats != null && this.pendingTotalBonus != null) {
      this.pendingStats = SwgohGgCalc.applyBonuses(this.characterBaseStats, this.pendingTotalBonus);
    }
    let sixESet = this.inGameMods;
    sixESet = this.lockedMods == null ? sixESet : this.lockedMods;
    sixESet = derivedPendingMods == null ? sixESet : derivedPendingMods;

    if (this.characterBaseStats != null && sixESet != null) {
      let sixEBonus = SwgohGgCalc.calculateModTotalBonus(sixESet, true);
      this.sixEStats = SwgohGgCalc.applyBonuses(this.characterBaseStats, sixEBonus);
    }
    this.dataSource = [];
    this.fields.forEach(field => {
      let inGameValue = this.inGameStats == null ? 0 : this.inGameStats[field.name];
      let lockedValue = this.lockedStats == null ? inGameValue : this.lockedStats[field.name];
      let pendingValue = this.pendingStats == null ? lockedValue : this.pendingStats[field.name];
      let sixEValue = this.sixEStats == null ? pendingValue : this.sixEStats[field.name];

      let inGameBonus = this.characterBaseStats == null ? 0 : inGameValue - this.characterBaseStats[field.name];
      let inGameBonusText = inGameBonus == 0 ? 0 : this.round(inGameBonus, field.format);

      let lockedDelta = lockedValue - inGameValue;
      let pendingDelta = pendingValue - lockedValue;
      let sixEDelta = sixEValue - pendingValue;

      this.showLocked = this.showLocked || (lockedDelta != 0 && this.lockedMods != null && this.lockedMods.length > 0);
      this.showPending = this.showPending || pendingDelta != 0;
      this.showSixE = this.showSixE || sixEDelta != 0;

      let newRow = {
        label: field.label,
        inGameValue: this.round(inGameValue, field.format),
        inGameBonusText: inGameBonusText,
        lockedValue: this.round(lockedValue, field.format),
        pendingValue: this.round(pendingValue, field.format),
        sixEValue: this.round(sixEValue, field.format),
        lockedDelta: this.round(lockedDelta, field.format),
        pendingDelta: this.round(pendingDelta, field.format),
        sixEDelta: this.round(sixEDelta, field.format)
      };
      this.dataSource.push(newRow);
    });

    this.showGame = this.displayModeSettings.mini == false || (this.showPending == false);
    this.showLockedPending = this.showLocked && (this.displayModeSettings.mini == false || this.showPending == false);

    this.cdr.detectChanges();
  }

  setModData(unitData: UnitsEntity, existingMods: ModsEntity[], lockedMods: ModsEntity[], pendingMods: ModsEntity[], excludedMods: ModsEntity[]) {
    this.inGameMods = existingMods;
    this.lockedMods = lockedMods;
    this.pendingMods = pendingMods;
    this.excludedMods = excludedMods;

    this.unitData = unitData;
    this.calculate();
  }

  setData(unitData: UnitsEntity, existingMods: ModsEntity[], currentMods: ModsEntity[], newMods: ModsEntity[], pendingMods: ModsEntity[]) {
    this.existingMods = existingMods;
    this.currentMods = currentMods;
    this.newMods = newMods;

    this.pendingMods = pendingMods;
    if ((this.newMods == null || this.newMods.length == 0) && (this.pendingMods != null && this.pendingMods.length > 0)) {
      this.newMods = this.pendingMods.slice(0);
    }
    this.unitData = unitData;

    this.calculate();
  }

  round(value: number, format: string) {
    if (format == "%") {
      return value.toFixed(2);;
    } else {
      return Math.round(value);
    }
  }
}