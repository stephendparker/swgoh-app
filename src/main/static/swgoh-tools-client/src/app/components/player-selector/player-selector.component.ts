import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';

import { SwgohGgDataService } from '../../services/swgoh-gg-data.service';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-player-selector',
  templateUrl: './player-selector.component.html',
  styleUrls: ['./player-selector.component.scss']
})
export class PlayerSelectorComponent  implements OnInit, OnDestroy {

  public playerId: string = '738889527';
  public lockInput: boolean = false;

  @Input() selectorLabel: 'Guild ID'

  @Output() selectPlayer: EventEmitter<any> = new EventEmitter();
  protected unsubscribe$ = new Subject<void>();

  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.dataStoreService.lockInput$.pipe(takeUntil(this.unsubscribe$)).subscribe(lockInput => {
      this.lockInput = lockInput;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadPlayerAction(playerId: string) {
    this.selectPlayer.emit(playerId);
  }
}
