import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mod-set-icon',
  templateUrl: './mod-set-icon.component.html',
  styleUrls: ['./mod-set-icon.component.scss']
})
export class ModSetIconComponent implements OnInit {

  @Input() setType: string = "";

  constructor() { }

  ngOnInit() {
  }

}
