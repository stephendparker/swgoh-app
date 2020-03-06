import { Component, OnInit, Input } from '@angular/core';
import { SetTotalCounts } from './../../calcs/swgoh-gg-calc';

@Component({
  selector: 'app-mod-set-percentages',
  templateUrl: './mod-set-percentages.component.html',
  styleUrls: ['./mod-set-percentages.component.scss']
})
export class ModSetPercentagesComponent implements OnInit {

  @Input() setTotals: SetTotalCounts;
  @Input() showFourPiece: boolean;

  @Input() highlightSetTotalCounts: SetTotalCounts;

  constructor() { }

  ngOnInit() {
  }

  round(value: number): number {
    return Math.round(value);
  }

}
