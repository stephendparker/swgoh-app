import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';

import { OPTIMIZE_TYPE } from './../../calcs/swgoh-gg-calc';

@Component({
  selector: 'app-optimize-mods-dialog',
  templateUrl: './optimize-mods-dialog.component.html',
  styleUrls: ['./optimize-mods-dialog.component.scss']
})
export class OptimizeModsDialogComponent implements OnInit {

  OPTIMIZE_TYPE = OPTIMIZE_TYPE;

  optimizationType: OPTIMIZE_TYPE = OPTIMIZE_TYPE.NORMAL;

  constructor(public dialogRef: MatDialogRef<OptimizeModsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onClose(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    this.dialogRef.close(this.optimizationType);
  }

}
