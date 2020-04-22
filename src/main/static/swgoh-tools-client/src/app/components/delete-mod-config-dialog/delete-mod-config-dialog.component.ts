import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';

@Component({
  selector: 'app-delete-mod-config-dialog',
  templateUrl: './delete-mod-config-dialog.component.html',
  styleUrls: ['./delete-mod-config-dialog.component.scss']
})
export class DeleteModConfigDialogComponent implements OnInit {

  public static NONE = 0;
  public static ALL = 1;
  public static RESET = 2;

  public _NONE = 0;
  public _ALL = 1;
  public _RESET = 2;

  lockedMods = DeleteModConfigDialogComponent.NONE;
  filters = DeleteModConfigDialogComponent.NONE;
  squads = DeleteModConfigDialogComponent.NONE;
  unequippedMods = DeleteModConfigDialogComponent.NONE;

  constructor(public dialogRef: MatDialogRef<DeleteModConfigDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    this.dialogRef.close({
      lockedMods: this.lockedMods,
      filters: this.filters,
      squads: this.squads,
      unequippedMods: this.unequippedMods
    });
  }

}
