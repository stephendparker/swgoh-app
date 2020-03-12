import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';

export interface ColumnDto {
  label: string;
  name: string;
  statColumn: boolean;
}

@Component({
  selector: 'app-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.scss']
})
export class ColumnSelectorComponent implements OnInit {

  @ViewChild(MatSelectionList) columnSelection: MatSelectionList;
  options: ColumnDto[];
  selectionOptions: ColumnDto[];
  displayedColumns: string[];

  constructor(public dialogRef: MatDialogRef<ColumnSelectorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.options = data.fullList.map(item => item);
    this.displayedColumns = data.displayedColumns;
  }

  ngOnInit() {
  }

  alreadySelected(column: ColumnDto): boolean {
    return this.displayedColumns.find(columnName => columnName == column.name) != null;
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    this.dialogRef.close(this.selectionOptions.map(result => result.name));
  }
}
