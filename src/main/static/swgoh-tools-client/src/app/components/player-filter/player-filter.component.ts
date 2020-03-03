import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Player } from './../../model/swgohgg/guild-data';
import { Subject } from 'rxjs';
import { DataStoreService } from './../../services/data-store.service';

@Component({
  selector: 'app-player-filter',
  templateUrl: './player-filter.component.html',
  styleUrls: ['./player-filter.component.scss']
})
export class PlayerFilterComponent implements OnInit {

  @Output() selectionChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  playerList: Player[] = [];
  selected: number[] = [];

  protected unsubscribe$ = new Subject<void>();

  constructor(private dataStoreService: DataStoreService, private cdref: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  setPlayerList(playerList: Player[], selected: number[]) {
    this.playerList = Object.assign([], playerList);
    this.selected = Object.assign([], selected);
    this.cdref.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filterChange(filterChangeEvent: any) {
    if (filterChangeEvent == false) {
      this.selectionChange.emit(this.selected);
    }
  }

}
