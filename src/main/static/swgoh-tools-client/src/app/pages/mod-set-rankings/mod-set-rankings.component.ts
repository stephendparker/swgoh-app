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

  private playerFilterComponent: PlayerFilterComponent;
  @ViewChild('playerFilter') set content(content: PlayerFilterComponent) {
    if (this.playerFilterComponent == null) {
      this.playerFilterComponent = content;
      // only populate list first time or it will continually reset
      if (this.modelGuildData != null) {
        this.setPlayerList(this.modelGuildData.players);
      }
    }
    this.playerFilterComponent = content;
  }

  protected unsubscribe$ = new Subject<void>();
  modelGuildData: RootObject = null;
  calculatedGuildData = null;

  displayedColumns = ["name", "sets", "circle", "cross", "triangle", "arrow"];

  selectedCharacters: string[] = [];
  selectedPlayers: number[] = [];
  fullPlayerList: Player[] = [];

  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.dataStoreService.modelGuildData$.pipe(takeUntil(this.unsubscribe$)).subscribe(guildData => {
      this.modelGuildData = guildData;
      if (this.modelGuildData != null) {
        this.setPlayerList(this.modelGuildData.players);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setPlayerList(players: Player[]) {
    this.fullPlayerList = players;
    this.selectedPlayers = SwgohGgCalc.getTopByGalacticPower(players, 10).map(player => player.data.ally_code);
    this.selectPlayers(this.selectedPlayers);
    if (this.playerFilterComponent)
      this.playerFilterComponent.setPlayerList(this.fullPlayerList, SwgohGgCalc.getTopByGalacticPower(players, 10).map(player => player.data.ally_code));
  }

  selectCharacters(characters) {
    this.selectedCharacters = characters;
  }

  selectPlayers(players: number[]) {
    this.dataStoreService.setLockInput(true);
    this.dataStoreService.getPlayersModData(players)
      .subscribe(response => {

        //handle success response
        console.log("get players success");
        this.calculatedGuildData = SwgohGgCalc.calculateGuildData(response);
      }, (error) => {
        // error handling
        console.log("get players error: " + error);
      }, () => {
        this.dataStoreService.setLockInput(false);
        // when observable is completed
        console.log("get players complete");
      });
  }

  selectedUnits(selectedUnits: ModUnitCalcResults[]): ModUnitCalcResults[] {
    return selectedUnits.filter(mucr => this.selectedCharacters.indexOf(mucr.name) != -1);
  }

  loadGuild(guildData: any) {
    this.dataStoreService.setModelGuildData(guildData);
  }
}
