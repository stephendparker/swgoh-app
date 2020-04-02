import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CommonSet, ModUnitCalcResults } from './../../calcs/swgoh-gg-calc';

@Component({
  selector: 'app-mod-set-summary',
  templateUrl: './mod-set-summary.component.html',
  styleUrls: ['./mod-set-summary.component.scss']
})
export class ModSetSummaryComponent implements OnInit {

  @Input() commonSet1: string;
  @Input() commonSet2: string;
  @Input() commonSet3: string;
  @Input() modUnitCalcResults: ModUnitCalcResults;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  setCommonSet(commonSet1: string, commonSet2: string, commonSet3: string) {
    this.commonSet1 = commonSet1;
    this.commonSet2 = commonSet2;
    this.commonSet3 = commonSet3;
    this.cdr.detectChanges();
  }

}
