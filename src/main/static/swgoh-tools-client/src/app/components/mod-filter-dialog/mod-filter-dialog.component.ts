import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';

import { SwgohGgCalc } from './../../calcs/swgoh-gg-calc';
import { SwgohGgConstants } from './../../calcs/swgoh-gg-constants';
import { FormControl } from '@angular/forms';

export class FilterKeyPair {
  public label: string;
  public value: number;
}

@Component({
  selector: 'app-mod-filter-dialog',
  templateUrl: './mod-filter-dialog.component.html',
  styleUrls: ['./mod-filter-dialog.component.scss']
})
export class ModFilterDialogComponent implements OnInit {

  SwgohGgCalc: typeof SwgohGgCalc = SwgohGgCalc;

  filterSets: number[] = [];
  filterSlots: number[] = [];

  circlePrimaries: FilterKeyPair[] = [
    { label: 'Health', value: SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID },
    { label: 'Protection', value: SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID }
  ];
  crossPrimaries: FilterKeyPair[] = [
    { label: 'Health', value: SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID },
    { label: 'Protection', value: SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID },
    { label: 'Offense', value: SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID },
    { label: 'Defense', value: SwgohGgConstants.MOD_DEFENSE_STAT_ID },
    { label: 'Potency', value: SwgohGgConstants.MOD_POTENCY_STAT_ID },
    { label: 'Tenacity', value: SwgohGgConstants.MOD_TENACITY_STAT_ID }
  ];
  trianglePrimaries: FilterKeyPair[] = [
    { label: 'Health', value: SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID },
    { label: 'Protection', value: SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID },
    { label: 'Offense', value: SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID },
    { label: 'Defense', value: SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID },
    { label: 'Crit Chance', value: SwgohGgConstants.MOD_CRIT_CHANCE_STAT_ID },
    { label: 'Crit Damage', value: SwgohGgConstants.MOD_CRIT_DMG_STAT_ID }
  ];
  arrowPrimaries: FilterKeyPair[] = [
    { label: 'Health', value: SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID },
    { label: 'Protection', value: SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID },
    { label: 'Speed', value: SwgohGgConstants.MOD_SPEED_STAT_ID },
    { label: 'Offense', value: SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID },
    { label: 'Defense', value: SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID },
    { label: 'Crit Avoidance', value: SwgohGgConstants.MOD_CRIT_AVOIDANCE_STAT_ID },
    { label: 'Accuracy', value: SwgohGgConstants.MOD_ACCURACY_STAT_ID }
  ];

  secondaries: FilterKeyPair[] = [
    { label: 'Speed', value: SwgohGgConstants.MOD_SPEED_STAT_ID },
    { label: 'Health or Health %', value: SwgohGgConstants.MOD_EITHER_HEALTH_STAT_ID },
    { label: 'Health', value: SwgohGgConstants.MOD_HEALTH_STAT_ID },
    { label: 'Health %', value: SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID },
    { label: 'Protection or Protection %', value: SwgohGgConstants.MOD_EITHER_PROTECTION_STAT_ID },
    { label: 'Protection', value: SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID },
    { label: 'Protection %', value: SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID },
    { label: 'Offense or Offense %', value: SwgohGgConstants.MOD_EITHER_OFFENSE_STAT_ID },
    { label: 'Offense', value: SwgohGgConstants.MOD_OFFENSE_STAT_ID },
    { label: 'Offense %', value: SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID },

    { label: 'Defense or Defense %', value: SwgohGgConstants.MOD_EITHER_DEFENSE_STAT_ID },
    { label: 'Defense', value: SwgohGgConstants.MOD_DEFENSE_STAT_ID },
    { label: 'Defense %', value: SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID },

    { label: 'Tenacity', value: SwgohGgConstants.MOD_TENACITY_STAT_ID },
    { label: 'Potency', value: SwgohGgConstants.MOD_POTENCY_STAT_ID },
    { label: 'Critical Chance', value: SwgohGgConstants.MOD_CRIT_CHANCE_STAT_ID },
  ];


  secondariesExclude: FilterKeyPair[] = [
    { label: 'Speed', value: SwgohGgConstants.MOD_SPEED_STAT_ID },
    { label: 'Health', value: SwgohGgConstants.MOD_HEALTH_STAT_ID },
    { label: 'Health %', value: SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID },
    { label: 'Protection', value: SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID },
    { label: 'Protection %', value: SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID },
    { label: 'Offense', value: SwgohGgConstants.MOD_OFFENSE_STAT_ID },
    { label: 'Offense %', value: SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID },
    { label: 'Defense', value: SwgohGgConstants.MOD_DEFENSE_STAT_ID },
    { label: 'Defense %', value: SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID },
    { label: 'Tenacity', value: SwgohGgConstants.MOD_TENACITY_STAT_ID },
    { label: 'Potency', value: SwgohGgConstants.MOD_POTENCY_STAT_ID },
    { label: 'Critical Chance', value: SwgohGgConstants.MOD_CRIT_CHANCE_STAT_ID },
  ];



  circlePrimaryFilter: number[] = SwgohGgConstants.ALL_CIRCLE_PRIMARIES.slice(0);
  crossPrimaryFilter: number[] = SwgohGgConstants.ALL_CROSS_PRIMARIES.slice(0);
  trianglePrimaryFilter: number[] = SwgohGgConstants.ALL_TRIANGLE_PRIMARIES.slice(0);
  arrowPrimaryFilter: number[] = SwgohGgConstants.ALL_ARROW_PRIMARIES.slice(0);

  secondaryExcludeFilters: number[] = [];
  secondaryIncludeFilters: number[] = [];


  circlePrimaryFormControl = new FormControl();
  crossPrimaryFormControl = new FormControl();
  trianglePrimaryFormControl = new FormControl();
  arrowPrimaryFormControl = new FormControl();

  secondaryExcludeFormControl = new FormControl();
  secondaryIncludeFormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<ModFilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      if (data.filterSets != null) {
        this.filterSets = data.filterSets.slice(0);
      }
      if (data.filterSlots != null) {
        this.filterSlots = data.filterSlots.slice(0);
      }
      if (data.arrowPrimaryFilters != null && data.arrowPrimaryFilters.length > 0) {
        this.arrowPrimaryFilter = data.arrowPrimaryFilters.slice(0);
      }
      if (data.trianglePrimaryFilters != null && data.trianglePrimaryFilters.length > 0) {
        this.trianglePrimaryFilter = data.trianglePrimaryFilters.slice(0);
      }
      if (data.circlePrimaryFilters != null && data.circlePrimaryFilters.length > 0) {
        this.circlePrimaryFilter = data.circlePrimaryFilters.slice(0);
      }
      if (data.crossPrimaryFilters != null && data.crossPrimaryFilters.length > 0) {
        this.crossPrimaryFilter = data.crossPrimaryFilters.slice(0);
      }

      if (data.secondaryIncludeFilters != null && data.secondaryIncludeFilters.length > 0) {
        this.secondaryIncludeFilters = data.secondaryIncludeFilters.slice(0);
      }

      if (data.secondaryExcludeFilters != null && data.secondaryExcludeFilters.length > 0) {
        this.secondaryExcludeFilters = data.secondaryExcludeFilters.slice(0);
      }
    }
  }

  ngOnInit() {
  }

  compareValue(o1: any, o2: any) {
    return o1 === o2;
  }

  toggleSetFilter(id: number) {

    if (this.filterSets.indexOf(id) == -1) {
      this.filterSets.push(id);
    } else {
      this.filterSets = this.filterSets.filter(filterName => filterName != id);
    }
  }

  // FROM UI
  toggleSlotFilter(id: number) {

    if (this.filterSlots.indexOf(id) == -1) {
      this.filterSlots.push(id);
    } else {
      this.filterSlots = this.filterSlots.filter(filterName => filterName != id);
    }
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    let retVal = {
      filterSets: this.filterSets,
      filterSlots: this.filterSlots,
      circlePrimaryFilter: this.circlePrimaryFilter,
      crossPrimaryFilter: this.crossPrimaryFilter,
      trianglePrimaryFilter: this.trianglePrimaryFilter,
      arrowPrimaryFilter: this.arrowPrimaryFilter,
      secondaryIncludeFilters: this.secondaryIncludeFilters,
      secondaryExcludeFilters: this.secondaryExcludeFilters
    };
    this.dialogRef.close(retVal);
  }
}