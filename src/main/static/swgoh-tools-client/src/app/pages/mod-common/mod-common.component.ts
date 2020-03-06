import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataStoreService } from './../../services/data-store.service';
import { Subject, Observable, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwgohGgCalc, ModUnitCalcResults, ModCalculatedData } from './../../calcs/swgoh-gg-calc';
import { PlayerFilterComponent } from './../../components/player-filter/player-filter.component';
import { RootObject, Player } from './../../model/swgohgg/guild-data';

import { delay } from 'rxjs/operators';
import { Mods } from './../../model/swgohgg/mods-data';


class ModResultsDto {
  public modelResults: ModUnitCalcResults;
  public targetResults: ModUnitCalcResults;
}

@Component({
  selector: 'app-mod-common',
  templateUrl: './mod-common.component.html',
  styleUrls: ['./mod-common.component.scss']
})
export class ModCommonComponent implements OnInit {

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
  calculatedGuildData: ModCalculatedData = null; // selected guild characters mod calcs
  calculatedPlayerData: ModCalculatedData = null; // target players mod calcs
  calculatedComparedResults: ModResultsDto[] = null; // dto for characters, common guild + player

  selectedCharacters: string[] = []; // characters filtered to show
  selectedPlayers: number[] = []; // players from the guild to include in calcs
  fullPlayerList: Player[] = []; // full list of players from guild

  targetMods: Mods[] = null; // list of mods from target guilds selected players
  playerMods: Mods = null; // players mods

  expandedCharacter: string = null;

  constructor(private dataStoreService: DataStoreService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataStoreService.modelGuildData$.pipe(takeUntil(this.unsubscribe$)).subscribe(guildData => {
      this.modelGuildData = guildData;
      if (this.modelGuildData != null && this.playerFilterComponent != null) {
        this.setPlayerList(this.modelGuildData.players);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  round(value: number) : number {
    return Math.round(value);
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

  selectTargetPlayer(playerId) {
    this.dataStoreService.setLockInput(true);
    this.dataStoreService.getPlayerModData(playerId)
      .subscribe(response => {

        //handle success response
        console.log("get players success");
        if (response != null) {
          this.playerMods = response.value.body;
          this.reCalculate();
          this.cdr.detectChanges();
        }
      }, (error) => {
        // error handling
        console.log("get players error: " + error);
      }, () => {
        this.dataStoreService.setLockInput(false);
        // when observable is completed
        console.log("get players complete");
      });
  }

  reCalculate() {
    this.calculatedGuildData = SwgohGgCalc.calculateMods(this.targetMods);
    this.calculatedPlayerData = this.playerMods == null ? null : SwgohGgCalc.calculateMods([this.playerMods]);

    this.calculatedComparedResults = [];

    this.calculatedGuildData.modCalcResults.units.forEach(modelUnit => {
      let dto: ModResultsDto = new ModResultsDto();
      dto.modelResults = modelUnit;
      dto.targetResults = this.calculatedPlayerData == null ? null : this.calculatedPlayerData.modCalcResults.units.find(unit => unit.name == modelUnit.name);
      this.calculatedComparedResults.push(dto);
    });
    console.log('recalculation complete');
  }

  selectPlayers(players: number[]) {

    (async () => {
      await delay(1);
      this.dataStoreService.setLockInput(true);
      this.dataStoreService.getPlayerListModData(players)
        .subscribe(response => {

          //handle success response
          console.log("get players success");
          if (response != null) {
            this.targetMods = response;
            this.reCalculate();
            this.cdr.detectChanges();
          }
        }, (error) => {
          // error handling
          console.log("get players error: " + error);
        }, () => {
          this.dataStoreService.setLockInput(false);
          // when observable is completed
          console.log("get players complete");
        });
    })();
  }

  selectedUnits(selectedUnits: ModResultsDto[]): ModResultsDto[] {
    return selectedUnits.filter(mucr => this.selectedCharacters.indexOf(mucr.modelResults.name) != -1);
  }

  missingSet(setName: string, targetResults: ModUnitCalcResults, remove1: string, remove2: string): boolean {
    if (targetResults == null) {
      return true;
    }
    let playerSets: string[] = [];
    if (targetResults.commonSet1 != null) {
      playerSets.push(targetResults.commonSet1);
    }
    if (targetResults.commonSet2 != null) {
      playerSets.push(targetResults.commonSet2);
    }
    if (targetResults.commonSet3 != null) {
      playerSets.push(targetResults.commonSet3);
    }
    if (remove1 != null) {
      this.removeElement(playerSets, remove1);

    }
    if (remove2 != null) {
      this.removeElement(playerSets, remove2);
    }
    return playerSets.indexOf(setName) == -1;
  }

  removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  loadGuild(guildData: any) {
    this.dataStoreService.setModelGuildData(guildData);
  }
}
