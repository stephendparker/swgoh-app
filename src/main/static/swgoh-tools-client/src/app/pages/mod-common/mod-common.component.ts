import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataStoreService } from './../../services/data-store.service';
import { Subject, Observable, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwgohGgCalc, ModUnitCalcResults, ModCalculatedData, SetTotalCounts, PrimaryCounts } from './../../calcs/swgoh-gg-calc';
import { PlayerFilterComponent } from './../../components/player-filter/player-filter.component';
import { RootObject, Player } from './../../model/swgohgg/guild-data';

import { delay } from 'rxjs/operators';
import { Mods } from './../../model/swgohgg/mods-data';

class ModResultsDto {
  public modelResults: ModUnitCalcResults;
  public targetResults: ModUnitCalcResults;

  public sameSets: boolean = false;
  public missingTarget: boolean = true;

  public set1Warning: string = null;
  public set2Warning: string = null;
  public set3Warning: string = null;

  public circleWarning: string = null;
  public crossWarning: string = null;
  public arrowWarning: string = null;
  public triangleWarning: string = null;
}

@Component({
  selector: 'app-mod-common',
  templateUrl: './mod-common.component.html',
  styleUrls: ['./mod-common.component.scss']
})
export class ModCommonComponent implements OnInit, OnDestroy {

  protected unsubscribe$ = new Subject<void>();
  modelGuildData: RootObject = null;
  calculatedGuildData: ModCalculatedData = null; // selected guild characters mod calcs
  calculatedPlayerData: ModCalculatedData = null; // target players mod calcs
  calculatedComparedResults: ModResultsDto[] = null; // dto for characters, common guild + player

  selectedCharacters: string[] = []; // characters filtered to show

  targetMods: Mods[] = null; // list of mods from target guilds selected players
  playerMods: Mods = null; // players mods

  expandedCharacter: string = null;

  constructor(private dataStoreService: DataStoreService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  round(value: number): number {
    return Math.round(value);
  }

  selectCharacters(characters) {
    this.selectedCharacters = characters;
  }

  selectTargetPlayer(playerId) {
    this.dataStoreService.setLockInput(true);
    this.dataStoreService.getPlayerModData(playerId)
      .subscribe(response => {
        console.log("get players success");
        if (response != null) {
          this.playerMods = response.value.body;
          this.reCalculate();
          this.cdr.detectChanges();
        }
      }, (error) => {
        console.log("get players error: " + error);
      }, () => {
        this.dataStoreService.setLockInput(false);
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

      if (dto.targetResults != null && dto.modelResults != null) {

        dto.missingTarget = dto.targetResults.commonSet1 == null;

        let modelList = [];
        dto.modelResults.commonSet1 != null ? modelList.push(dto.modelResults.commonSet1) : null;
        dto.modelResults.commonSet2 != null ? modelList.push(dto.modelResults.commonSet2) : null;
        dto.modelResults.commonSet3 != null ? modelList.push(dto.modelResults.commonSet3) : null;
        modelList.sort();

        let targetList = [];
        dto.targetResults.commonSet1 != null ? targetList.push(dto.targetResults.commonSet1) : null;
        dto.targetResults.commonSet2 != null ? targetList.push(dto.targetResults.commonSet2) : null;
        dto.targetResults.commonSet3 != null ? targetList.push(dto.targetResults.commonSet3) : null;
        targetList.sort();

        dto.sameSets = true;
        if (modelList.length == targetList.length) {

          for (let x = 0; x < modelList.length; x++) {
            if (modelList[x] != targetList[x]) {
              dto.sameSets = false;
            }
          }
        } else {
          dto.sameSets = false;
        }
        if (dto.sameSets == false) {

          let modelList = [];
          dto.modelResults.commonSet1 != null ? modelList.push(dto.modelResults.commonSet1) : null;
          dto.modelResults.commonSet2 != null ? modelList.push(dto.modelResults.commonSet2) : null;
          dto.modelResults.commonSet3 != null ? modelList.push(dto.modelResults.commonSet3) : null;
          modelList.sort();

          if (modelList.indexOf(dto.targetResults.commonSet1) == -1) {
            dto.set1Warning = 'WARNING';
          } else {
            this.removeElement(modelList, dto.targetResults.commonSet1);
          }
          if (modelList.indexOf(dto.targetResults.commonSet2) == -1) {
            dto.set2Warning = 'WARNING';
          } else {
            this.removeElement(modelList, dto.targetResults.commonSet2);
          }
          if (modelList.indexOf(dto.targetResults.commonSet3) == -1) {
            dto.set3Warning = 'WARNING';
          } else {
            this.removeElement(modelList, dto.targetResults.commonSet3);
          }
        }

      } else if (this.calculatedPlayerData != null && dto.targetResults == null) {
        // no mods for this character?
        dto.set1Warning = 'ERROR';
        dto.set2Warning = 'ERROR';
        dto.set3Warning = 'ERROR';
      }
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

  getFourSetPercent(results: ModUnitCalcResults): number {
    return Math.round(results.fourSetTotals.setTypeTotal / this.getSetTotal(results)) * 100;
  }
  getTwoSetPercent(results: ModUnitCalcResults): number {
    return Math.round(results.twoSetTotals.setTypeTotal / this.getSetTotal(results)) * 100;
  }
  getSetTotal(results: ModUnitCalcResults): number {
    return (results.fourSetTotals.setTypeTotal + results.twoSetTotals.setTypeTotal);
  }


  removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

}
