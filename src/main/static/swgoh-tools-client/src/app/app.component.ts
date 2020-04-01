import { Component } from '@angular/core';

import { SwgohGgDataService } from './services/swgoh-gg-data.service';

import { DisplayModeService } from './services/display-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AppComponent {
  title = 'swgoh-tools-client';

  constructor(private displayModeService: DisplayModeService) {
    this.displayModeService.setWindowSize(window);
  }

  onResize(event) {
    this.displayModeService.setWindowSize(event.target);
  }
}
