import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { SwgohGgDataService } from '../../services/swgoh-gg-data.service';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-guild-selector',
  templateUrl: './guild-selector.component.html',
  styleUrls: ['./guild-selector.component.scss']
})
export class GuildSelectorComponent implements OnInit, OnDestroy {

  public guildId: string = '259';
  public lockInput: boolean = false;

  @Output() loadGuild: EventEmitter<any> = new EventEmitter();
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

  loadGuildAction(guildId: string) {
    this.dataStoreService.setLockInput(true);
    this.dataStoreService.getGuildData(guildId).subscribe(guildData => {
      if (guildData != null) {
        this.dataStoreService.setLockInput(false);
        this.loadGuild.emit(guildData);

      }
    });
  }
}
