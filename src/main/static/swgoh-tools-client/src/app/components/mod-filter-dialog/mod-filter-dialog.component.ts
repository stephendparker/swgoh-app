import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';

import { SwgohGgCalc } from './../../calcs/swgoh-gg-calc';

@Component({
  selector: 'app-mod-filter-dialog',
  templateUrl: './mod-filter-dialog.component.html',
  styleUrls: ['./mod-filter-dialog.component.scss']
})
export class ModFilterDialogComponent implements OnInit {

  SwgohGgCalc: typeof SwgohGgCalc = SwgohGgCalc;

  filterSets: number[] = [];
  filterSlots: number[] = [];

  constructor(public dialogRef: MatDialogRef<ModFilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      if (data.filterSets != null) {
        this.filterSets = data.filterSets.slice(0);
      }
      if (data.filterSlots != null) {
        this.filterSlots = data.filterSlots.slice(0);
      }
    }
  }

  ngOnInit() {
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
    this.dialogRef.close({
      filterSets: this.filterSets,
      filterSlots: this.filterSlots,
    });
  }
}
