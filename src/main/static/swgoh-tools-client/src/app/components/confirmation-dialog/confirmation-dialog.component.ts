import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  confirmationText: string = null;
  confirmation: boolean = false;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.confirmationText = data.confirmationText;
    }
  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    if (this.confirmation) {
      this.dialogRef.close(true);
    } else {
       this.dialogRef.close(false);
    }

  }
}
