import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<AboutDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close(null);
  }


}
