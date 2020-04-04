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
    { name: 'physicalCritChance', label: 'Physical Critical Chance', format: '%' },
    { name: 'specialCritChance', label: 'Special Critical Chance', format: '%' },
    { name: 'critDamage', label: 'Critical Damage', format: '%' },
    { name: 'physicalCritAvoidance', label: 'Physical Critical Avoidance', format: '%' },
    { name: 'specialCritAvoidance', label: 'Special Critical Avoidance', format: '%' }
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
    if (this.lockedMods != null) {
      this.lockedTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.lockedMods);
    }

    if (this.pendingMods != null) {
      this.pendingTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.pendingMods);
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
    sixESet = this.pendingMods == null ? sixESet : this.pendingMods;

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

      this.showLocked = this.showLocked || lockedDelta != 0;
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
    let x = 10;
    // let pendingChanges = false;
    // let newChanges = false;
    // this.dataSource = [];
    // if (this.unitData != null) {
    //   if (this.existingMods != null) {
    //     this.existingTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.existingMods);
    //     this.baseStats = SwgohGgCalc.deriveBaseStats(this.unitData, this.existingTotalBonus);
    //   }

    //   if (this.existingMods != null) {

    //     // this.oldStats = SwgohGgCalc.getStats(this.unitData);
    //     this.existingTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.existingMods);
    //     // let baseStats: StatsDto = SwgohGgCalc.deriveBaseStats(this.unitData, this.existingTotalBonus);

    //     if (this.newMods != null && this.newMods.length > 0 && this.pendingMods != null && this.pendingMods.length > 0) {
    //       this.newTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.newMods);
    //       this.newStats = SwgohGgCalc.applyBonuses(this.baseStats, this.newTotalBonus);

    //       this.currentTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.currentMods);
    //       this.currentStats = SwgohGgCalc.applyBonuses(this.baseStats, this.currentTotalBonus);

    //       this.pendingModsTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.pendingMods);

    //       let sixEBonus: ModTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.pendingMods, true);

    //       this.pendingStats = SwgohGgCalc.applyBonuses(this.baseStats, this.pendingModsTotalBonus);
    //       this.upgradedPendingStats = SwgohGgCalc.applyBonuses(this.baseStats, sixEBonus);
    //     }
    //   }
    //   if (this.pendingMods != null && this.pendingMods.length > 0) {
    //     if (this.pendingMods.length == this.currentMods.length) {

    //       this.pendingMods.forEach(pendingMod => {
    //         if (this.newMods.find(currentMod => pendingMod.id == currentMod.id) == null) {
    //           pendingChanges = true;
    //         }
    //       });
    //     } else {
    //       pendingChanges = true;
    //     }
    //   }

    //   this.fields.forEach(field => {
    //     let currentValue = this.currentStats == null ? 0 : this.currentStats[field.name];
    //     let pendingValue = this.pendingStats == null ? 0 : this.pendingStats[field.name];
    //     let upgradedValue = this.pendingStats == null ? 0 : this.upgradedPendingStats[field.name];

    //     if (this.newStats == null || this.round(this.newStats[field.name] - currentValue, field.format) != 0 ||
    //       this.round(pendingValue - currentValue, field.format) != 0 ||
    //       this.round(pendingValue - this.newStats[field.name], field.format) != 0) {

    //       let newRow = {
    //         label: field.label,
    //         oldValue: this.currentStats == null ? null : this.round(currentValue, field.format),
    //         newValue: this.newStats == null ? null : this.round(this.newStats[field.name], field.format),
    //         delta: this.newStats == null ? null : this.round(this.newStats[field.name] - currentValue, field.format),
    //         pendingValue: this.pendingStats == null ? null : this.round(pendingValue, field.format),
    //         pendingDelta: this.pendingStats == null ? null : this.round(pendingValue - currentValue, field.format),
    //         pendingUpgradedValue: this.upgradedPendingStats == null ? null : this.round(upgradedValue, field.format),
    //         pendingUpgradedDelta: this.upgradedPendingStats == null ? null : this.round(upgradedValue - currentValue, field.format),
    //       };
    //       this.dataSource.push(newRow);

    //       newChanges = newChanges || (newRow.delta != null && newRow.delta != newRow.pendingDelta)

    //     }
    //   });
    // }
    // this.displayedColumns = [];
    // this.displayedColumns = this.displayedColumns.concat(this.existingColumns);

    // if (newChanges) {
    //   this.displayedColumns = this.displayedColumns.concat(this.currentColumns);
    // }

    // if (pendingChanges) {
    //   this.displayedColumns = this.displayedColumns.concat(this.pendingColumns);
    // }
    this.cdr.detectChanges();
  }

  setModData(unitData: UnitsEntity, existingMods: ModsEntity[], lockedMods: ModsEntity[], pendingMods: ModsEntity[]) {
    this.inGameMods = existingMods;
    this.lockedMods = lockedMods;
    this.pendingMods = pendingMods;
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