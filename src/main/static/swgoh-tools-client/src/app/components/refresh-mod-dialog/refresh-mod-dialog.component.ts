import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';

@Component({
  selector: 'app-refresh-mod-dialog',
  templateUrl: './refresh-mod-dialog.component.html',
  styleUrls: ['./refresh-mod-dialog.component.scss']
})
export class RefreshModDialogComponent implements OnInit {

  playerSwgohGg: boolean = false;
  playerHotutils: boolean = false;
  clearMods: boolean = false;
  sessionIdHotutils: string = '';

  constructor(public dialogRef: MatDialogRef<RefreshModDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onClose(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    this.dialogRef.close({
      playerSwgohGg: this.playerSwgohGg,
      playerHotutils: this.playerHotutils,
      clearMods: this.clearMods,
      sessionIdHotutils: this.sessionIdHotutils
    });
  }

}
