import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { PlayerFilterComponent } from './../player-filter/player-filter.component';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { SwgohGgCalc } from './../../calcs/swgoh-gg-calc';
import { Player } from './../../model/swgohgg/guild-data';

@Component({
  selector: 'app-guild-player-selector',
  templateUrl: './guild-player-selector.component.html',
  styleUrls: ['./guild-player-selector.component.scss']
})
export class GuildPlayerSelectorComponent implements OnInit {

  @Input() selectorLabel: 'Guild ID';

  @ViewChild('playerFilter') playerFilterComponent: PlayerFilterComponent;

  @Output() selectionChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  protected unsubscribe$ = new Subject<void>();

  selectedPlayers: number[] = [];
  fullPlayerList: Player[] = []; // full list of players from guild

  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadGuild(guildData: any) {
    this.fullPlayerList = guildData.players;

    this.selectedPlayers = SwgohGgCalc.getTopByGalacticPower(this.fullPlayerList, 10).map(player => player.data.ally_code);
    this.selectPlayers(this.selectedPlayers);
    this.playerFilterComponent.setPlayerList(this.fullPlayerList, this.selectedPlayers);
  }

  selectPlayers(players: number[]) {
    this.selectionChange.emit(players);
  }

}
