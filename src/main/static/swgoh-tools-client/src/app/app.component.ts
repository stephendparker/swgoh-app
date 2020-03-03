import { Component } from '@angular/core';

import { SwgohGgDataService } from './services/swgoh-gg-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swgoh-tools-client';

  constructor() {
  }

}
