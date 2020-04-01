import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

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
export class ModSetComparisonComponent implements OnInit {

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

  existingTotalBonus: ModTotalBonus;
  newTotalBonus: ModTotalBonus;
  currentTotalBonus: ModTotalBonus;
  pendingModsTotalBonus: ModTotalBonus;
  currentModsTotalBonus: ModTotalBonus;

  oldStats: StatsDto = new StatsDto();
  newStats: StatsDto = null;
  currentStats: StatsDto = null;
  pendingStats: StatsDto = null;
  upgradedPendingStats: StatsDto = null;

  dataSource: any[] = [];

  displayedColumns: string[] = ["label", "oldValue", "newValue", "delta", "pendingValue", "pendingDelta", "pendingUpgradedValue", "pendingUpgradedDelta"];

  existingColumns: string[] = ["label", "oldValue"];
  currentColumns: string[] = ["newValue", "delta"];
  pendingColumns: string[] = ["pendingValue", "pendingDelta"];
  pendingColumns: string[] = ["pendingUpgradedValue", "pendingUpgradedDelta"];

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  protected unsubscribe$ = new Subject<void>();

  constructor(private displayModeService: DisplayModeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null)
        this.displayModeSettings = displayModeSettings;
    });

    this.calculate();
  }

  calculate() {

    let pendingChanges = false;
    let newChanges = false;
    this.dataSource = [];
    if (this.unitData != null) {
      if (this.existingMods != null) {

        this.oldStats = SwgohGgCalc.getStats(this.unitData);
        this.existingTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.existingMods);
        let baseStats: StatsDto = SwgohGgCalc.deriveBaseStats(this.unitData, this.existingTotalBonus);

        if (this.newMods != null && this.newMods.length > 0 && this.pendingMods != null && this.pendingMods.length > 0) {
          this.newTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.newMods);
          this.newStats = SwgohGgCalc.applyBonuses(baseStats, this.newTotalBonus);

          this.currentTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.currentMods);
          this.currentStats = SwgohGgCalc.applyBonuses(baseStats, this.currentTotalBonus);

          this.pendingModsTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.pendingMods);

          let sixEBonus: ModTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.pendingMods, true);

          this.pendingStats = SwgohGgCalc.applyBonuses(baseStats, this.pendingModsTotalBonus);
          this.upgradedPendingStats = SwgohGgCalc.applyBonuses(baseStats, sixEBonus);
        }
      }
      if (this.pendingMods != null && this.pendingMods.length > 0) {
        if (this.pendingMods.length == this.currentMods.length) {

          this.pendingMods.forEach(pendingMod => {
            if (this.newMods.find(currentMod => pendingMod.id == currentMod.id) == null) {
              pendingChanges = true;
            }
          });
        } else {
          pendingChanges = true;
        }
      }

      this.fields.forEach(field => {
        let currentValue = this.currentStats == null ? 0 : this.currentStats[field.name];
        let pendingValue = this.pendingStats == null ? 0 : this.pendingStats[field.name];
        let upgradedValue = this.pendingStats == null ? 0 : this.upgradedPendingStats[field.name];

        if (this.newStats == null || this.round(this.newStats[field.name] - currentValue, field.format) != 0 ||
          this.round(pendingValue - currentValue, field.format) != 0 ||
          this.round(pendingValue - this.newStats[field.name], field.format) != 0) {

          let newRow = {
            label: field.label,
            oldValue: this.currentStats == null ? null : this.round(currentValue, field.format),
            newValue: this.newStats == null ? null : this.round(this.newStats[field.name], field.format),
            delta: this.newStats == null ? null : this.round(this.newStats[field.name] - currentValue, field.format),
            pendingValue: this.pendingStats == null ? null : this.round(pendingValue, field.format),
            pendingDelta: this.pendingStats == null ? null : this.round(pendingValue - currentValue, field.format),
            pendingUpgradedValue: this.upgradedPendingStats == null ? null : this.round(upgradedValue, field.format),
            pendingUpgradedDelta: this.upgradedPendingStats == null ? null : this.round(upgradedValue - currentValue, field.format),
          };
          this.dataSource.push(newRow);

          newChanges = newChanges || (newRow.delta != null && newRow.delta != newRow.pendingDelta)

        }
      });
    }
    this.displayedColumns = [];
    this.displayedColumns = this.displayedColumns.concat(this.existingColumns);

    if (newChanges) {
      this.displayedColumns = this.displayedColumns.concat(this.currentColumns);
    }

    if (pendingChanges) {
      this.displayedColumns = this.displayedColumns.concat(this.pendingColumns);
    }
    this.cdr.detectChanges();
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