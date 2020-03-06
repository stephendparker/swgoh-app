import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataStoreService } from './../../services/data-store.service';
import { Subject, Observable, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwgohGgCalc, ModUnitCalcResults } from './../../calcs/swgoh-gg-calc';
import { PlayerFilterComponent } from './../../components/player-filter/player-filter.component';
import { RootObject, Player } from './../../model/swgohgg/guild-data';

@Component({
  selector: 'app-mod-set-rankings',
  templateUrl: './mod-set-rankings.component.html',
  styleUrls: ['./mod-set-rankings.component.scss']
})
export class ModSetRankingsComponent implements OnInit, OnDestroy {

  protected unsubscribe$ = new Subject<void>();
  modelGuildData: RootObject = null;

  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.dataStoreService.modelGuildData$.pipe(takeUntil(this.unsubscribe$)).subscribe(guildData => {
      this.modelGuildData = guildData;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
