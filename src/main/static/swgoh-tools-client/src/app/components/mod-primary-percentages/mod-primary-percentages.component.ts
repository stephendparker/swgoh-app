import { Component, OnInit, Input } from '@angular/core';
import { PrimaryCounts } from './../../calcs/swgoh-gg-calc';

@Component({
  selector: 'app-mod-primary-percentages',
  templateUrl: './mod-primary-percentages.component.html',
  styleUrls: ['./mod-primary-percentages.component.scss']
})
export class ModPrimaryPercentagesComponent implements OnInit {

  @Input() label: string;
  @Input() primaryCounts: PrimaryCounts[];
  @Input() total: number;
  @Input() highlightPrimary: string = null;

  constructor() { }

  ngOnInit() {

  }

  round(value: number): number {
    return Math.round(value);
  }
}
