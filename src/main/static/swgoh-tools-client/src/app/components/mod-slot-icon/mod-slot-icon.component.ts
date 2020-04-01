import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mod-slot-icon',
  templateUrl: './mod-slot-icon.component.html',
  styleUrls: ['./mod-slot-icon.component.scss']
})
export class ModSlotIconComponent implements OnInit {

  @Input() slot: number;

  constructor() { }

  ngOnInit() {
  }

}
