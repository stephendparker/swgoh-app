import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStoreService } from './../../services/data-store.service';
import { Mods } from './../../model/swgohgg/mods-data';
import { ModCalculatedData, SwgohGgCalc, SecondaryCounts, SecondarySpecificTypeCount, ModUnitCalcResults } from './../../calcs/swgoh-gg-calc';
import { delay } from 'rxjs/operators';

const MOD_SLOT_SQUARE = "1";
const MOD_SLOT_ARROW = "2";
const MOD_SLOT_DIAMOND = "3";
const MOD_SLOT_TRIANGLE = "4";
const MOD_SLOT_CIRCLE = "5";
const MOD_SLOT_CROSS = "6";

const MOD_SECONDARY_HEALTH = 1;
const MOD_SECONDARY_HEALTH_PERCENT = 55;
const MOD_SECONDARY_PROTECTION = 28;
const MOD_SECONDARY_PROTECTION_PERCENT = 56;
const MOD_SECONDARY_OFFENSE = 41;
const MOD_SECONDARY_OFFENSE_PERCENT = 48;
const MOD_SECONDARY_DEFENSE = 42;
const MOD_SECONDARY_DEFENSE_PERCENT = 49;
const MOD_SECONDARY_CRIT_CHANCE = 53;
const MOD_SECONDARY_POTENCY = 17;
const MOD_SECONDARY_SPEED = 5;
const MOD_SECONDARY_TENACITY = 18;

class CharacterMatchStrength {
  public name: string;
  public strength: number;
}

@Component({
  selector: 'app-mod-match-character',
  templateUrl: './mod-match-character.component.html',
  styleUrls: ['./mod-match-character.component.scss']
})
export class ModMatchCharacterComponent implements OnInit, OnDestroy {

  modelSource: string;
  protected unsubscribe$ = new Subject<void>();
  playerMods: Mods = null; // players mods
  modelGuildMods: Mods[] = null;
  modSet: string;
  primary: string;
  slot: number;

  characterMatchStrength: CharacterMatchStrength[] = [];

  secondarySpeed: number = 0;
  secondaryHealth: number = 0;
  secondaryHealthPercent: number = 0;
  secondaryProtection: number = 0;
  secondaryProtectionPercent: number = 0;
  secondaryOffense: number = 0;
  secondaryOffensePercent: number = 0;
  secondaryDefense: number = 0;
  secondaryDefensePercent: number = 0;
  secondaryCritChance: number = 0;
  secondaryPotency: number = 0;
  secondaryTenacity: number = 0;


  calculatedPlayerData: ModCalculatedData = null; // target players mod calcs
  calculatedModelGuildData: ModCalculatedData = null;

  constructor(private dataStoreService: DataStoreService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectGuildPlayers(players: number[]) {

    (async () => {
      await delay(1);
      this.dataStoreService.setLockInput(true);
      this.dataStoreService.getPlayerListModData(players)
        .subscribe(response => {

          //handle success response
          console.log("get players success");
          if (response != null) {
            this.modelGuildMods = response;
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

  calculateMatchStrength(modUnitCalcResults: ModUnitCalcResults): number {
    let retVal = 0;

    if (modUnitCalcResults != null && modUnitCalcResults.secondaryCounts != null) {
      let totalRolls = 0;
      modUnitCalcResults.secondaryCounts.forEach(sc => {
        totalRolls = totalRolls + sc.rolls;
      });

      modUnitCalcResults.secondaryCounts.forEach(sc => {
        let percent = sc.rolls / totalRolls;
        retVal = retVal + (percent * this.getSecondaryQuality(sc.name));

        // sc.types.forEach(specificRoll => {
        //   let rollCount = this.getSoftRollsCountByStatId(specificRoll.stat_id);
        //   retVal = retVal + (percent * rollCount);
        // });

      });
    }
    return retVal;
  }

  getSecondaryQuality(secondary: string): number {

    let healthRollQuality: number = this.secondaryHealth / 428;
    let healthPercentRollQuality: number = this.secondaryHealthPercent / 1.13;
    let healthOverallQuality: number = healthRollQuality + healthPercentRollQuality;

    let protectionRollQuality: number = this.secondaryProtection / 830;
    let protectionPercentRollQuality: number = this.secondaryProtectionPercent / 2.33;
    let protectionOverallQuality: number = protectionRollQuality + protectionPercentRollQuality;

    let offenseRollQuality: number = this.secondaryOffense / 46;
    let offensePercentRollQuality: number = this.secondaryOffensePercent / .56;
    let offenseOverallQuality: number = offenseRollQuality + offensePercentRollQuality;

    let defenseRollQuality: number = this.secondaryDefense / 9;
    let defensePercentRollQuality: number = this.secondaryDefensePercent / 1.7;
    let defenseOverallQuality: number = defenseRollQuality + defensePercentRollQuality;

    let critChanceRollQuality: number = this.secondaryCritChance / 2.25;
    let potencyRollQuality: number = this.secondaryPotency / 2.25;
    let speedRollQuality: number = this.secondarySpeed / 6;
    let tenacityRollQuality: number = this.secondaryTenacity / 2.25;

    switch (secondary) {


      case "Health": {
        return healthOverallQuality;
      }
      case "Protection": {
        return protectionOverallQuality;
      }
      case "Offense": {
        return offenseOverallQuality;
      }
      case "Defense": {
        return defenseOverallQuality;
      }
      case "Critical Chance": {
        return critChanceRollQuality;
      }
      case "Potency": {
        return potencyRollQuality;
      }
      case "Speed": {
        return speedRollQuality;
      }
      case "Tenacity": {
        return tenacityRollQuality;
      }
    }

  }

  getMatchStrength(name: string): number {

    let matchStrength = this.characterMatchStrength.find(matchStrength => matchStrength.name == name);
    if (matchStrength != null) {
      return matchStrength.strength;
    }
    return null;
  }

  matchingMods() {
    if (this.getModelData() != null) {

      this.characterMatchStrength = [];

      let filteredPlayers = this.getModelData().modCalcResults.units.filter(unit => {

        this.characterMatchStrength.push({
          name: unit.name,
          strength: this.calculateMatchStrength(unit)
        })

        if (this.modSet != null && (this.modSet === unit.commonSet1 || this.modSet == unit.commonSet2 || this.modSet == unit.commonSet3)) {

          switch (this.slot + '') {
            case MOD_SLOT_CIRCLE: {
              return this.primary == null || unit.commonCircle == this.primary;
            }
            case MOD_SLOT_CROSS: {
              return this.primary == null || unit.commonCross == this.primary;
            }
            case MOD_SLOT_TRIANGLE: {
              return this.primary == null || unit.commonTriangle == this.primary;
            }
            case MOD_SLOT_ARROW: {
              return this.primary == null || unit.commonArrow == this.primary;
            }
          }
          return true;
        } else {
          return false;
        }
      });
      filteredPlayers.sort((n1, n2) => {
        let n1Val = this.getMatchStrength(n1.name);
        let n2Val = this.getMatchStrength(n2.name);
        return n2Val - n1Val;
      });
      return filteredPlayers;
    }

  }

  containsSecondaries(scType: SecondarySpecificTypeCount): boolean {
    let retVal: boolean = false;

    switch (scType.stat_id) {

      case MOD_SECONDARY_HEALTH: {
        return this.secondaryHealth > 0;
      }
      case MOD_SECONDARY_HEALTH_PERCENT: {
        return this.secondaryHealthPercent > 0;;
      }
      case MOD_SECONDARY_PROTECTION: {
        return this.secondaryProtection > 0;;
      }
      case MOD_SECONDARY_PROTECTION_PERCENT: {
        return this.secondaryProtectionPercent > 0;;
      }
      case MOD_SECONDARY_OFFENSE: {
        return this.secondaryOffense > 0;;
      }
      case MOD_SECONDARY_OFFENSE_PERCENT: {
        return this.secondaryOffensePercent > 0;;
      }
      case MOD_SECONDARY_DEFENSE: {
        return this.secondaryDefense > 0;;
      }
      case MOD_SECONDARY_DEFENSE_PERCENT: {
        return this.secondaryDefensePercent > 0;;
      }
      case MOD_SECONDARY_CRIT_CHANCE: {
        return this.secondaryCritChance > 0;;
      }
      case MOD_SECONDARY_POTENCY: {
        return this.secondaryPotency > 0;;
      }
      case MOD_SECONDARY_SPEED: {
        return this.secondarySpeed > 0;;
      }
      case MOD_SECONDARY_TENACITY: {
        return this.secondaryTenacity > 0;;
      }
    }

    return retVal;
  }

  round(value: number): number {
    return Math.round(value);
  }

  getModelData(): ModCalculatedData {
    if (this.modelSource == 'guild') {
      return this.calculatedModelGuildData;
    } else {
      return this.calculatedPlayerData
    }
  }

  reCalculate() {
    this.calculatedModelGuildData = this.modelGuildMods == null ? null : SwgohGgCalc.calculateMods(this.modelGuildMods);
    this.calculatedPlayerData = this.playerMods == null ? null : SwgohGgCalc.calculateMods([this.playerMods]);
  }
}
