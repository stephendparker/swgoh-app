import { Component, OnInit, Input } from '@angular/core';
import { SetTotalCounts, SwgohGgCalc } from './../../calcs/swgoh-gg-calc';

@Component({
  selector: 'app-mod-set-percentages',
  templateUrl: './mod-set-percentages.component.html',
  styleUrls: ['./mod-set-percentages.component.scss']
})
export class ModSetPercentagesComponent implements OnInit {

  @Input() setTotals: SetTotalCounts;
  @Input() showFourPiece: boolean;

  @Input() highlightSetTotalCounts: SetTotalCounts;

  fourSetArray: string[];
  twoSetArray: string[];

  constructor() { }

  ngOnInit() {
    this.fourSetArray = Object.assign([], SwgohGgCalc.FOUR_SET_LIST);
    this.fourSetArray.sort((a, b) => {
      return this.setTotals[b] - this.setTotals[a];
    });
    this.twoSetArray = Object.assign([], SwgohGgCalc.TWO_SET_LIST);
    this.twoSetArray.sort((a, b) => {
      return this.setTotals[b] - this.setTotals[a];
    });    
    console.log('test');
  }


  round(value: number): number {
    return Math.round(value);
  }

}
