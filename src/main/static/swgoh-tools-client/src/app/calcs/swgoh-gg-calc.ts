import { RootObject, Player } from './../model/swgohgg/guild-data';
import { PlayerData, UnitsEntity } from './../model/swgohgg/player-data';
import { Mods, ModsEntity, SecondaryStatsEntity } from './../model/swgohgg/mods-data';
import { SwgohGgConstants } from './swgoh-gg-constants';

const MOD_SET_HEALTH = 1;
const MOD_SET_OFFENSE = 2;
const MOD_SET_DEFENSE = 3;
const MOD_SET_SPEED = 4;
const MOD_SET_CRIT_CHANCE = 5;
const MOD_SET_CRIT_DMG = 6;
const MOD_SET_POTENCY = 7;
const MOD_SET_TENACITY = 8;

const MOD_SLOT_SQUARE = 1;
const MOD_SLOT_ARROW = 2;
const MOD_SLOT_DIAMOND = 3;
const MOD_SLOT_TRIANGLE = 4;
const MOD_SLOT_CIRCLE = 5;
const MOD_SLOT_CROSS = 6;

const MOD_PRIMARY_HEALTH = 'Health';
const MOD_PRIMARY_PROTECTION = 'Protection';
const MOD_PRIMARY_OFFENSE = 'Offense';
const MOD_PRIMARY_DEFENSE = 'Defense';
const MOD_PRIMARY_CRIT_CHANCE = 'Critical Chance';
const MOD_PRIMARY_POTENCY = 'Potency';
const MOD_PRIMARY_TENACITY = 'Tenacity';
const MOD_PRIMARY_SPEED = 'Speed';
const MOD_PRIMARY_CRITICAL_AVOIDANCE = 'Critical Avoidance';
const MOD_PRIMARY_CRITICAL_DAMAGE = 'Critical Damage';
const MOD_PRIMARY_ACCURACY = 'Accuracy';


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
const MOD_SECONDARY_ACCURACY = 52;

export class StatsDto {
    public speed: number = 0;
    public health: number = 0;
    public protection: number = 0;
    public physicalOffense: number = 0;
    public specialOffense: number = 0;
    public physicalDefense: number = 0;
    public speciallDefense: number = 0;
    public tenacity: number = 0;
    public potency: number = 0;
    public physicalCritChance: number = 0;
    public specialCritChance: number = 0;

    public critDamage: number = 0;
    public physicalCritAvoidance: number = 0;
    public specialCritAvoidance: number = 0;
    public accuracy: number = 0;
}

export class EvaluatedModDto {
    public strength: number = 0;

    public speed?: number = 0;
    public health?: number = 0;
    public protection?: number = 0;
    public physicalOffense?: number = 0;
    public specialOffense?: number = 0;
    public critChance?: number = 0;
    public potency?: number = 0;
    public tenacity?: number = 0;
    public physicalDefense?: number = 0;
    public specialDefense?: number = 0;

    public mod: ModsEntity;
}

export class ModTotalBonus {
    public health: number = 0;
    public speed: number = 0;
    public protection: number = 0;
    public offense: number = 0;
    public defense: number = 0;

    public healthPercent: number = 0;
    public protectionPercent: number = 0;
    public offensePercent: number = 0;
    public defensePercent: number = 0;
    public speedPercent: number = 0;

    public tenactiyPercent: number = 0;
    public criticalChancePercent: number = 0;
    public potencyPercent: number = 0;
    public criticalDamagePercent: number = 0;
    public criticalAvoidancePercent: number = 0;
    public accuracyPercent: number = 0;
}

export class ModCalcResults {
    units: ModUnitCalcResults[] = [];
}

export class CommonSet {
    set1: string;
    set2: string;
    set3: string;
}

export class SecondarySpecificTypeCount {
    stat_id: number = 0;
    value: number = 0;
    rolls: number = 0;
    multiplier: number = 1;
    type: string = "";
}


export class SecondaryCounts {
    name: string;
    rolls: number = 0;
    types: SecondarySpecificTypeCount[] = [];
}

export class ModSecondaryTotals {
    public speed: number;
    public speedRank: number;
    public offense: number;
    public offensePercent: number;
    public offenseRolls: number;
    public offenseRank: number;
    public defense: number;
    public defensePercent: number;
    public defenseRolls: number;
    public defenseRank: number;
    public protection: number;
    public protectionPercent: number;
    public protectionRolls: number;
    public protectionRank: number;
    public health: number;
    public healthPercent: number;
    public healthRolls: number;
    public healthRank: number;
    public tenacity: number;
    public tenacityRank: number;
    public potency: number;
    public potencyRank: number;
    public critChance: number;
    public critChanceRank: number;
}

export class ModUnitCalcResults {
    public name: string;

    // finalCalculations
    public commonSet1: string;
    public commonSet2: string;
    public commonSet3: string;

    public commonCircle: string;
    public commonCross: string;
    public commonTriangle: string;
    public commonArrow: string;

    public fourSetTotals: SetTotalCounts = new SetTotalCounts();
    public twoSetTotals: SetTotalCounts = new SetTotalCounts();
    public allSetTotals: SetTotalCounts = new SetTotalCounts();

    public secondaryTotals: ModSecondaryTotals = new ModSecondaryTotals();

    public circlePrimaryCounts: PrimaryCounts[] = [];
    public crossPrimaryCounts: PrimaryCounts[] = [];
    public trianglePrimaryCounts: PrimaryCounts[] = [];
    public arrowPrimaryCounts: PrimaryCounts[] = [];

    // ModSecondaryResults

    public secondaryCounts: SecondaryCounts[] = [];

    constructor(name: string) {
        this.name = name;
    }
}

export class PrimaryCounts {
    public count: number = 0;
    public primaryType: string;

    constructor(primaryType: string) {
        this.primaryType = primaryType;
    }
}

export class ModCalculatedData {
    public units: {};
    public modCalcResults: ModCalcResults = new ModCalcResults();

}


export class SetTotalCounts {

    public setTypeTotal: number = 0;

    public speed: number = 0;
    public offense: number = 0;
    public critDmg: number = 0;

    public health: number = 0;
    public defense: number = 0;
    public critChance: number = 0;
    public potency: number = 0;
    public tenacity: number = 0;
}


export class SetInfo {
    public name: string;
    public id: number;
}

export class SlotInfo {
    public name: string;
    public id: number;
}

export class CharacterModDto {
  public name: string;
  public currentMods: ModsEntity[] = [];
  public lockedMods: ModsEntity[] = [];
  public pendingMods: ModsEntity[] = [];
  public unitData: UnitsEntity;
}

export class SwgohGgCalc {

    public static FULL_SET_LIST = ["offense", "speed", "critDmg", "health", "defense", "critChance", "potency", "tenacity"];
    public static TWO_SET_LIST = ["health", "defense", "critChance", "potency", "tenacity"];
    public static FOUR_SET_LIST = ["offense", "speed", "critDmg"];

    public static SETS: SetInfo[] = [
        { name: 'speed', id: MOD_SET_SPEED },        
        { name: 'critDmg', id: MOD_SET_CRIT_DMG },
        { name: 'offense', id: MOD_SET_OFFENSE },
        { name: 'health', id: MOD_SET_HEALTH },
        { name: 'critChance', id: MOD_SET_CRIT_CHANCE },
        { name: 'potency', id: MOD_SET_POTENCY },
        { name: 'tenacity', id: MOD_SET_TENACITY },
        { name: 'defense', id: MOD_SET_DEFENSE }
    ];

    public static SLOTS: SlotInfo[] = [
        { name: 'square', id: MOD_SLOT_SQUARE },
        { name: 'diamond', id: MOD_SLOT_ARROW },
        { name: 'circle', id: MOD_SLOT_DIAMOND },
        { name: 'arrow', id: MOD_SLOT_TRIANGLE },
        { name: 'triangle', id: MOD_SLOT_CIRCLE },
        { name: 'cross', id: MOD_SLOT_CROSS }
    ];

    public static getGuildAllyCodeList(guildData: RootObject): number[] {
        let retVal: number[] = [];

        guildData.players.forEach(player => {
            retVal.push(player.data.ally_code);
        });

        return retVal;
    }

    public static getTopByGalacticPower(players: Player[], count: number): Player[] {
        let playerList = players.sort((a, b) => b.data.galactic_power - a.data.galactic_power);
        return players.slice(0, count);
    }

    public static getSetCount(mods: ModsEntity[], target: number): number {
        return mods.filter(mod => mod.set == target).length;
    }


    public static addCounts(source: SetTotalCounts, adder: SetTotalCounts) {
        source.speed = source.speed + adder.speed;
        source.offense = source.offense + adder.offense;
        source.critDmg = source.critDmg + adder.critDmg;
        source.health = source.health + adder.health;
        source.defense = source.defense + adder.defense;
        source.critChance = source.critChance + adder.critChance;
        source.potency = source.potency + adder.potency;
        source.tenacity = source.tenacity + adder.tenacity;
    }

    public static addSecondaryStat(secondary: SecondaryStatsEntity, secondaryCounts: SecondaryCounts[]) {
        let count: SecondaryCounts = secondaryCounts.find(countIndex => countIndex.name == secondary.name);
        if (count == null) {
            count = new SecondaryCounts();
            count.name = secondary.name;
            secondaryCounts.push(count);
        }
        count.rolls = count.rolls + secondary.roll;

        let specificType: SecondarySpecificTypeCount = count.types.find(sstc => sstc.stat_id == secondary.stat_id);
        if (specificType == null) {
            specificType = new SecondarySpecificTypeCount();
            specificType.stat_id = secondary.stat_id;
            count.types.push(specificType);
        }
        specificType.rolls = specificType.rolls + secondary.roll;
        specificType.value = specificType.value + secondary.value;

        switch (secondary.stat_id) {
            case MOD_SECONDARY_HEALTH: {
                specificType.multiplier = 0.0001;
                break;
            }
            case MOD_SECONDARY_HEALTH_PERCENT: {
                specificType.multiplier = 0.01;
                specificType.type = "%";
                break;
            }
            case MOD_SECONDARY_PROTECTION: {
                specificType.multiplier = 0.0001;
                break;
            }
            case MOD_SECONDARY_PROTECTION_PERCENT: {
                specificType.multiplier = 0.01;
                specificType.type = "%";
                break;
            }
            case MOD_SECONDARY_OFFENSE: {
                specificType.multiplier = 0.0001;
                break;
            }
            case MOD_SECONDARY_OFFENSE_PERCENT: {
                specificType.multiplier = 0.01;
                specificType.type = "%";
                break;
            }
            case MOD_SECONDARY_DEFENSE: {
                specificType.multiplier = 0.0001;
                break;
            }
            case MOD_SECONDARY_DEFENSE_PERCENT: {
                specificType.multiplier = 0.01;
                specificType.type = "%";
                break;
            }
            case MOD_SECONDARY_CRIT_CHANCE: {
                specificType.multiplier = 0.01;
                specificType.type = "%";
                break;
            }
            case MOD_SECONDARY_POTENCY: {
                specificType.multiplier = 0.01;
                specificType.type = "%";
                break;
            }
            case MOD_SECONDARY_SPEED: {
                specificType.multiplier = 0.0001;
                break;
            }
            case MOD_SECONDARY_TENACITY: {
                specificType.multiplier = 0.01;
                specificType.type = "%";
                break;
            }
        }

        // multiplier: number = 1;
        // type: string = "";
    }

    public static createSecondaryOffPrimary(mod: ModsEntity): SecondaryStatsEntity {
        let retVal: SecondaryStatsEntity = {
            roll: 5,
            stat_id: null,
            name: mod.primary_stat.name,
            value: mod.primary_stat.value,
            display_value: null
        };

        switch (mod.primary_stat.name) {
            case MOD_PRIMARY_HEALTH: {
                retVal.stat_id = MOD_SECONDARY_HEALTH_PERCENT;
                break;
            }
            case MOD_PRIMARY_PROTECTION: {
                retVal.stat_id = MOD_SECONDARY_PROTECTION_PERCENT;
                break;
            }
            case MOD_PRIMARY_OFFENSE: {
                retVal.stat_id = MOD_SECONDARY_OFFENSE_PERCENT;
                break;
            }
            case MOD_PRIMARY_DEFENSE: {
                retVal.stat_id = MOD_SECONDARY_DEFENSE_PERCENT;
                break;
            }
            case MOD_PRIMARY_CRIT_CHANCE: {
                retVal.stat_id = MOD_SECONDARY_CRIT_CHANCE;
                break;
            }
            case MOD_PRIMARY_POTENCY: {
                retVal.stat_id = MOD_SECONDARY_POTENCY;
                break;
            }
            case MOD_PRIMARY_TENACITY: {
                retVal.stat_id = MOD_SECONDARY_TENACITY;
                break;
            }
            case MOD_PRIMARY_SPEED: {
                retVal.stat_id = MOD_SECONDARY_SPEED;
                break;
            }
        }
        return retVal;
    }

    public static getSets(mods: ModsEntity[]): SetTotalCounts {
        let setTotalCounts: SetTotalCounts = new SetTotalCounts();
        setTotalCounts.offense = Math.floor(this.getSetCount(mods, MOD_SET_OFFENSE) / 4);
        setTotalCounts.speed = Math.floor(this.getSetCount(mods, MOD_SET_SPEED) / 4);
        setTotalCounts.critDmg = Math.floor(this.getSetCount(mods, MOD_SET_CRIT_DMG) / 4);
        setTotalCounts.health = Math.floor(this.getSetCount(mods, MOD_SET_HEALTH) / 2);
        setTotalCounts.defense = Math.floor(this.getSetCount(mods, MOD_SET_DEFENSE) / 2);
        setTotalCounts.critChance = Math.floor(this.getSetCount(mods, MOD_SET_CRIT_CHANCE) / 2);
        setTotalCounts.potency = Math.floor(this.getSetCount(mods, MOD_SET_POTENCY) / 2);
        setTotalCounts.tenacity = Math.floor(this.getSetCount(mods, MOD_SET_TENACITY) / 2);

        return setTotalCounts;
    }

    public static addPlayerMods(mods: ModsEntity[], modUnitCalcResults: ModUnitCalcResults) {

        let setTotalCounts: SetTotalCounts = this.getSets(mods);

        modUnitCalcResults.allSetTotals.setTypeTotal = modUnitCalcResults.allSetTotals.setTypeTotal + 1;
        this.addCounts(modUnitCalcResults.allSetTotals, setTotalCounts);
        if (setTotalCounts.offense > 0 || setTotalCounts.speed > 0 || setTotalCounts.critDmg > 0) {
            modUnitCalcResults.fourSetTotals.setTypeTotal = modUnitCalcResults.fourSetTotals.setTypeTotal + 1;
            this.addCounts(modUnitCalcResults.fourSetTotals, setTotalCounts);
        } else {
            modUnitCalcResults.twoSetTotals.setTypeTotal = modUnitCalcResults.twoSetTotals.setTypeTotal + 1;
            this.addCounts(modUnitCalcResults.twoSetTotals, setTotalCounts);
        }


        mods.forEach(mod => {

            if (mod.secondary_stats) {
                mod.secondary_stats.forEach(secondaryStat => {
                    this.addSecondaryStat(secondaryStat, modUnitCalcResults.secondaryCounts);
                });
            }

            let modSlot: PrimaryCounts[] = null;

            let primaryAsSecondary = this.createSecondaryOffPrimary(mod);

            switch (mod.slot) {
                case MOD_SLOT_ARROW: {
                    modSlot = modUnitCalcResults.arrowPrimaryCounts;
                    // if (primaryAsSecondary.stat_id != null)
                    //     this.addSecondaryStat(primaryAsSecondary, modUnitCalcResults.secondaryCounts);
                    break;
                }
                case MOD_SLOT_TRIANGLE: {
                    modSlot = modUnitCalcResults.trianglePrimaryCounts;
                    // if (primaryAsSecondary.stat_id != null)
                    //     this.addSecondaryStat(primaryAsSecondary, modUnitCalcResults.secondaryCounts);
                    break;
                }
                case MOD_SLOT_CIRCLE: {
                    modSlot = modUnitCalcResults.circlePrimaryCounts;
                    // if (primaryAsSecondary.stat_id != null)
                    //     this.addSecondaryStat(primaryAsSecondary, modUnitCalcResults.secondaryCounts);
                    break;
                }
                case MOD_SLOT_CROSS: {
                    modSlot = modUnitCalcResults.crossPrimaryCounts;
                    // if (primaryAsSecondary.stat_id != null)
                    //     this.addSecondaryStat(primaryAsSecondary, modUnitCalcResults.secondaryCounts);
                    break;
                }
            }

            if (modSlot != null) {
                let modPrimaryType = modSlot.find(primaryCounts => primaryCounts.primaryType == mod.primary_stat.name);
                if (modPrimaryType == null) {
                    modPrimaryType = new PrimaryCounts(mod.primary_stat.name)
                    modSlot.push(modPrimaryType);
                }
                modPrimaryType.count = modPrimaryType.count + 1;
            }
        });


    }

    public static getModSetMostCommon(setList: string[], counts: SetTotalCounts): string {
        let retVal: string = setList[0];
        let highestValue: number = counts[setList[0]];

        setList.forEach(propertyName => {
            if (counts[propertyName] > highestValue) {
                retVal = propertyName;
                highestValue = counts[propertyName];
            }
        });
        if (highestValue > 0)
            return retVal;
        else return null;
    }

    public static getMostCommonPrimary(primaryCounts: PrimaryCounts[]): string {

        let retVal: string = null;
        let currentMax: number = 0;
        primaryCounts.forEach(primaryCount => {
            if (primaryCount.count > currentMax) {
                retVal = primaryCount.primaryType;
                currentMax = primaryCount.count;
            }
        });
        if (currentMax > 0)
            return retVal;
        else
            return null;
    }

    public static getCountOfSets(setTotalCounts: SetTotalCounts, sets: string[]): number {
        let retVal = 0;
        sets.filter(set => sets.indexOf(set) != -1).forEach(set => retVal = retVal + setTotalCounts[set]);
        return retVal;
    }

    public static getLargest(setTotalCounts: SetTotalCounts, sets: string[]): number {
        let retVal = 0;
        sets.filter(set => sets.indexOf(set) != -1).forEach(set => {
            if (setTotalCounts[set] > retVal)
                retVal = setTotalCounts[set]
        });
        return retVal;
    }


    public static calculateModSetStrength(mod: ModsEntity, modUnitCalcResults: ModUnitCalcResults): number {

        if (modUnitCalcResults == null) {
            return 0;
        }
        let setTotalCounts: SetTotalCounts = new SetTotalCounts();
        this.addCounts(setTotalCounts, modUnitCalcResults.allSetTotals);
        setTotalCounts.offense = setTotalCounts.offense * 2;
        setTotalCounts.speed = setTotalCounts.speed * 2;
        setTotalCounts.critDmg = setTotalCounts.critDmg * 2;

        switch (mod.set) {
            case MOD_SET_OFFENSE: {
                return setTotalCounts.offense / SwgohGgCalc.getLargest(setTotalCounts, this.FULL_SET_LIST)
            }
            case MOD_SET_SPEED: {
                return setTotalCounts.speed / SwgohGgCalc.getLargest(setTotalCounts, this.FULL_SET_LIST)
            }
            case MOD_SET_CRIT_DMG: {
                return setTotalCounts.critDmg / SwgohGgCalc.getLargest(setTotalCounts, this.FULL_SET_LIST)
            }
            case MOD_SET_HEALTH: {
                return setTotalCounts.health / SwgohGgCalc.getLargest(setTotalCounts, this.FULL_SET_LIST)
            }
            case MOD_SET_DEFENSE: {
                return setTotalCounts.defense / SwgohGgCalc.getLargest(setTotalCounts, this.FULL_SET_LIST)
            }
            case MOD_SET_CRIT_CHANCE: {
                return setTotalCounts.critChance / SwgohGgCalc.getLargest(setTotalCounts, this.FULL_SET_LIST)
            }
            case MOD_SET_POTENCY: {
                return setTotalCounts.potency / SwgohGgCalc.getLargest(setTotalCounts, this.FULL_SET_LIST)
            }
            case MOD_SET_TENACITY: {
                return setTotalCounts.tenacity / SwgohGgCalc.getLargest(setTotalCounts, this.FULL_SET_LIST)
            }
        }
        return 0;
    }


    public static calculateSetValue(commonSet1: string, commonSet2: string, commonSet3: string, modUnitCalcResults: ModUnitCalcResults): number {

        let setTotalCounts: SetTotalCounts = new SetTotalCounts();
        this.addCounts(setTotalCounts, modUnitCalcResults.allSetTotals);

        let totalNumberOfPlayer = modUnitCalcResults.allSetTotals.setTypeTotal;
        let fourSetChance = SwgohGgCalc.getCountOfSets(setTotalCounts, this.FOUR_SET_LIST) / modUnitCalcResults.allSetTotals.setTypeTotal;
        let noFourSetChance = 1 - fourSetChance;
        let twoSetTotal = SwgohGgCalc.getCountOfSets(setTotalCounts, this.TWO_SET_LIST);

        if (this.FOUR_SET_LIST.indexOf(commonSet1) > -1) {

            let commonSet1Chance = setTotalCounts[commonSet1] / SwgohGgCalc.getLargest(setTotalCounts, this.FOUR_SET_LIST);
            let commonSet2Chance = commonSet2 == null ? 0 : setTotalCounts[commonSet2] / SwgohGgCalc.getLargest(setTotalCounts, this.TWO_SET_LIST);

            return fourSetChance * commonSet1Chance * commonSet2Chance;
        } else {

            let commonSetList: string[] = [];

            commonSet1 == null ? null : commonSetList.push(commonSet1);
            commonSet2 == null ? null : commonSetList.push(commonSet2);
            commonSet3 == null ? null : commonSetList.push(commonSet3);

            commonSetList.sort((a, b) => {
                return setTotalCounts[b] - setTotalCounts[a];
            });

            commonSet1 = commonSetList[0];
            commonSet2 = commonSetList[1];
            commonSet3 = commonSetList[2];

            let commonSet1Reduction = setTotalCounts[commonSet1] * 1 / 3;
            let commonSet2Reduction = setTotalCounts[commonSet2] * 1 / 3;
            let commonSet3Reduction = setTotalCounts[commonSet3] * 1 / 3;

            let commonSet1Chance = commonSet1 == null ? 0 : setTotalCounts[commonSet1] / SwgohGgCalc.getLargest(setTotalCounts, this.TWO_SET_LIST);
            setTotalCounts[commonSet1] = setTotalCounts[commonSet1] - commonSet1Reduction;
            let commonSet2Chance = commonSet2 == null ? 0 : setTotalCounts[commonSet2] / SwgohGgCalc.getLargest(setTotalCounts, this.TWO_SET_LIST);
            setTotalCounts[commonSet2] = setTotalCounts[commonSet2] - commonSet2Reduction;
            let commonSet3Chance = commonSet3 == null ? 0 : setTotalCounts[commonSet3] / SwgohGgCalc.getLargest(setTotalCounts, this.TWO_SET_LIST);

            return noFourSetChance * commonSet1Chance * commonSet2Chance * commonSet3Chance;
        }

    }

    public static convertPrimaryTitleToNumber(name: string): number {
        switch (name) {
            case MOD_PRIMARY_HEALTH: {
                return SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID;
            }
            case MOD_PRIMARY_PROTECTION: {
                return SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID;
            }
            case MOD_PRIMARY_OFFENSE: {
                return SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID;
            }
            case MOD_PRIMARY_DEFENSE: {
                return SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID;
            }
            case MOD_PRIMARY_CRIT_CHANCE: {
                return SwgohGgConstants.MOD_CRIT_CHANCE_STAT_ID;
            }
            case MOD_PRIMARY_POTENCY: {
                return SwgohGgConstants.MOD_POTENCY_STAT_ID;
            }
            case MOD_PRIMARY_TENACITY: {
                return SwgohGgConstants.MOD_TENACITY_STAT_ID;
            }
            case MOD_PRIMARY_SPEED: {
                return SwgohGgConstants.MOD_SPEED_STAT_ID;
            }
            case MOD_PRIMARY_CRITICAL_AVOIDANCE: {
                return SwgohGgConstants.MOD_CRIT_AVOIDANCE_STAT_ID;
            }
            case MOD_PRIMARY_CRITICAL_DAMAGE: {
                return SwgohGgConstants.MOD_CRIT_DMG_STAT_ID;
            }
            case MOD_PRIMARY_ACCURACY: {
                return SwgohGgConstants.MOD_ACCURACY_STAT_ID;
            }                                                                                                            
        }
        return null;
    }

    public static convertSetPropertyNameToNumber(name: string): number {
        switch (name) {
            case "health": {
                return MOD_SECONDARY_HEALTH;
            }
            case "offense": {
                return MOD_SET_OFFENSE;
            }
            case "defense": {
                return MOD_SET_DEFENSE;
            }
            case "speed": {
                return MOD_SET_SPEED;
            }
            case "critChance": {
                return MOD_SET_CRIT_CHANCE;
            }
            case "critDmg": {
                return MOD_SET_CRIT_DMG;
            }
            case "potency": {
                return MOD_SET_POTENCY;
            }
            case "tenacity": {
                return MOD_SET_TENACITY;
            }
        }
        return null;
    }

    public static getCommonSet(sourceTotalCounts: SetTotalCounts): CommonSet {
        let retVal: CommonSet = new CommonSet();

        let setTotalCounts: SetTotalCounts = new SetTotalCounts();
        this.addCounts(setTotalCounts, sourceTotalCounts);
        setTotalCounts.critDmg = setTotalCounts.critDmg * 2;
        setTotalCounts.speed = setTotalCounts.speed * 2;
        setTotalCounts.offense = setTotalCounts.offense * 2;

        let mostCommon = this.getModSetMostCommon(this.FULL_SET_LIST, setTotalCounts);

        if (mostCommon == null) {

        } else if (this.FOUR_SET_LIST.indexOf(mostCommon) > -1) {
            // most common is a four set
            retVal.set1 = mostCommon;
            retVal.set2 = this.getModSetMostCommon(this.TWO_SET_LIST, setTotalCounts);
        } else {

            // let commonSet1Chance = setTotalCounts[commonSet1] / SwgohGgCalc.getLargest(setTotalCounts, this.TWO_SET_LIST);
            // setTotalCounts[commonSet1] = setTotalCounts[commonSet1] * 2 / 3;
            // let commonSet2Chance = setTotalCounts[commonSet2] / SwgohGgCalc.getLargest(setTotalCounts, this.TWO_SET_LIST);
            // setTotalCounts[commonSet1] = setTotalCounts[commonSet1] * 2 / 3;
            // let commonSet3Chance = setTotalCounts[commonSet3] / SwgohGgCalc.getLargest(setTotalCounts, this.TWO_SET_LIST);


            // most common is a two set, check if second most
            // setTotalCounts[mostCommon] = setTotalCounts[mostCommon] - sourceTotalCounts.setTypeTotal;

            let mostCommonReduction = setTotalCounts[mostCommon] * 1 / 3;

            setTotalCounts[mostCommon] = setTotalCounts[mostCommon] - mostCommonReduction;

            let secondMostCommon = this.getModSetMostCommon(this.FULL_SET_LIST, setTotalCounts);
            if (secondMostCommon == null) {
                retVal.set1 = mostCommon;
            } else if (this.FOUR_SET_LIST.indexOf(secondMostCommon) > -1) {
                retVal.set1 = secondMostCommon;
                retVal.set2 = mostCommon;
            } else {
                // setTotalCounts[mostCommon] = setTotalCounts[mostCommon] - sourceTotalCounts.setTypeTotal;

                // setTotalCounts[secondMostCommon] = setTotalCounts[secondMostCommon] - sourceTotalCounts.setTypeTotal;

                let secondMostCommonReduction = setTotalCounts[secondMostCommon] * 1 / 3;
                if (mostCommon == secondMostCommon) {
                    secondMostCommonReduction = mostCommonReduction;
                }

                setTotalCounts[secondMostCommon] = setTotalCounts[secondMostCommon] - secondMostCommonReduction;

                retVal.set1 = mostCommon;
                retVal.set2 = secondMostCommon;
                retVal.set3 = this.getModSetMostCommon(this.TWO_SET_LIST, setTotalCounts);
            }
        }

        return retVal;
    }

    public static calculateModTotalBonus(mods: ModsEntity[], upgradeMods: boolean = false): ModTotalBonus {

        let retVal: ModTotalBonus = new ModTotalBonus();

        if (mods != null) {
            let existingSets: SetTotalCounts = SwgohGgCalc.getSets(mods);

            retVal.criticalChancePercent = retVal.criticalChancePercent + existingSets.critChance * 8;
            retVal.criticalDamagePercent = retVal.criticalDamagePercent + existingSets.critDmg * 30;
            retVal.defensePercent = retVal.defensePercent + existingSets.defense * 25;
            retVal.healthPercent = retVal.healthPercent + existingSets.health * 10;
            retVal.offensePercent = retVal.offensePercent + existingSets.offense * 15;
            retVal.potencyPercent = retVal.potencyPercent + existingSets.potency * 15;
            retVal.speedPercent = retVal.speedPercent + existingSets.speed * 10;
            retVal.tenactiyPercent = retVal.tenactiyPercent + existingSets.tenacity * 20;

            mods.forEach(mod => {

                let healthModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.26;
                let healthPercentModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.86;
                let critChanceModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.04;
                let offenseModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.1;
                let offensePercentModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 3.02;
                let potencyModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.33;
                let protectionModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.11;
                let protectionPercentModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.33;
                let speedModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.03;
                let tenacityPercentModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.33;
                let defenseModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 1.63;
                let defensePercentModifier: number = !upgradeMods || mod.rarity == 6 ? 1 : 2.34;

                retVal.health = retVal.health + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_HEALTH) * healthModifier);
                retVal.healthPercent = retVal.healthPercent + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_HEALTH_PERCENT) * healthPercentModifier);

                retVal.protection = retVal.protection + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_PROTECTION) * protectionModifier);
                retVal.protectionPercent = retVal.protectionPercent + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_PROTECTION_PERCENT) * protectionPercentModifier);

                retVal.offense = retVal.offense + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_OFFENSE) * offenseModifier);
                retVal.offensePercent = retVal.offensePercent + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_OFFENSE_PERCENT) * offensePercentModifier);

                retVal.defense = retVal.defense + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_DEFENSE) * defenseModifier);
                retVal.defensePercent = retVal.defensePercent + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_DEFENSE_PERCENT) * defensePercentModifier);

                retVal.criticalChancePercent = retVal.criticalChancePercent + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_CRIT_CHANCE) * critChanceModifier);
                retVal.potencyPercent = retVal.potencyPercent + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_POTENCY) * potencyModifier);
                retVal.speed = retVal.speed + (Math.ceil(this.getSecondaryValueFromMod(mod, MOD_SECONDARY_SPEED) * speedModifier));
                retVal.tenactiyPercent = retVal.tenactiyPercent + (this.getSecondaryValueFromMod(mod, MOD_SECONDARY_TENACITY) * tenacityPercentModifier);

                let offensePrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 8.50;
                let defensePrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 20;
                let healthPrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 16;
                let protectionPrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 24;
                let speedPrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.0001 : 32;
                let accuracyPrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 30;
                let criticalAvoidancePrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 35;
                let ciriticalDamagePrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 42;
                let criticalChancePrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 20;
                let potencyPrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 30;
                let tenacityPrimary: number = !upgradeMods || mod.rarity == 6 ? mod.primary_stat.value * 0.01 : 35;

                // Offense %	5.88%	8.50%
                // Defense %	11.75%	20%
                // Health %	5.88%	16%
                // Protection %	23.50%	24%
                // Speed	30	32
                // Accuracy %	12%	30%
                // Critical Avoidance %	24%	35%
                // Critical Damage %	36%	42%
                // Critical Chance %	12%	20%
                // Potency %	24%	30%
                // Tenacity %	24%	35%

                switch (mod.primary_stat.name) {
                    case MOD_PRIMARY_HEALTH: {
                        retVal.healthPercent = retVal.healthPercent + healthPrimary;
                        break;
                    }
                    case MOD_PRIMARY_PROTECTION: {
                        retVal.protectionPercent = retVal.protectionPercent + protectionPrimary;
                        break;
                    }
                    case MOD_PRIMARY_OFFENSE: {
                        retVal.offensePercent = retVal.offensePercent + offensePrimary;
                        break;
                    }
                    case MOD_PRIMARY_DEFENSE: {
                        retVal.defensePercent = retVal.defensePercent + defensePrimary;
                        break;
                    }
                    case MOD_PRIMARY_CRIT_CHANCE: {
                        retVal.criticalChancePercent = retVal.criticalChancePercent + criticalChancePrimary;
                        break;
                    }
                    case MOD_PRIMARY_POTENCY: {
                        retVal.potencyPercent = retVal.potencyPercent + potencyPrimary;
                        break;
                    }
                    case MOD_PRIMARY_TENACITY: {
                        retVal.tenactiyPercent = retVal.tenactiyPercent + tenacityPrimary;
                        break;
                    }
                    case MOD_PRIMARY_SPEED: {
                        retVal.speed = retVal.speed + speedPrimary;
                        break;
                    }
                    case MOD_PRIMARY_CRITICAL_AVOIDANCE: {
                        retVal.criticalAvoidancePercent = retVal.criticalAvoidancePercent + criticalAvoidancePrimary;
                        break;
                    }
                    case MOD_PRIMARY_CRITICAL_DAMAGE: {
                        retVal.criticalDamagePercent = retVal.criticalDamagePercent + ciriticalDamagePrimary;
                        break;
                    }
                    case MOD_PRIMARY_ACCURACY: {
                        retVal.accuracyPercent = retVal.accuracyPercent + accuracyPrimary;
                        break;
                    }
                }

            })
        }
        return retVal;
    }

    public static calculateModMostCommon(modUnitCalcResults: ModUnitCalcResults) {

        let commonSet: CommonSet = this.getCommonSet(modUnitCalcResults.allSetTotals);
        modUnitCalcResults.commonSet1 = commonSet.set1;
        modUnitCalcResults.commonSet2 = commonSet.set2;
        modUnitCalcResults.commonSet3 = commonSet.set3;

        // Primaries
        modUnitCalcResults.commonArrow = this.getMostCommonPrimary(modUnitCalcResults.arrowPrimaryCounts);
        modUnitCalcResults.commonCircle = this.getMostCommonPrimary(modUnitCalcResults.circlePrimaryCounts);
        modUnitCalcResults.commonCross = this.getMostCommonPrimary(modUnitCalcResults.crossPrimaryCounts);
        modUnitCalcResults.commonTriangle = this.getMostCommonPrimary(modUnitCalcResults.trianglePrimaryCounts);

        modUnitCalcResults.arrowPrimaryCounts.sort(this.sortPrimaryCounts);
        modUnitCalcResults.circlePrimaryCounts.sort(this.sortPrimaryCounts);
        modUnitCalcResults.crossPrimaryCounts.sort(this.sortPrimaryCounts);
        modUnitCalcResults.trianglePrimaryCounts.sort(this.sortPrimaryCounts);

        // secondaries
        modUnitCalcResults.secondaryCounts.sort((a, b) => {
            return b.rolls - a.rolls;
        });
        modUnitCalcResults.secondaryCounts.forEach(secondaryCount => {
            secondaryCount.types.sort((a, b) => {
                return b.multiplier - a.multiplier;
            });
        });

        modUnitCalcResults.secondaryTotals.speed = this.getSecondaryValue(modUnitCalcResults, 'Speed', '');
        modUnitCalcResults.secondaryTotals.offense = this.getSecondaryValue(modUnitCalcResults, 'Offense', '');
        modUnitCalcResults.secondaryTotals.offensePercent = this.getSecondaryValue(modUnitCalcResults, 'Offense', '%');
        modUnitCalcResults.secondaryTotals.offenseRolls = this.getSecondaryRolls(modUnitCalcResults, 'Offense');
        modUnitCalcResults.secondaryTotals.critChance = this.getSecondaryValue(modUnitCalcResults, 'Critical Chance', '%');
        modUnitCalcResults.secondaryTotals.potency = this.getSecondaryValue(modUnitCalcResults, 'Potency', '%');
        modUnitCalcResults.secondaryTotals.defense = this.getSecondaryValue(modUnitCalcResults, 'Defense', '');
        modUnitCalcResults.secondaryTotals.defensePercent = this.getSecondaryValue(modUnitCalcResults, 'Defense', '%');
        modUnitCalcResults.secondaryTotals.defenseRolls = this.getSecondaryRolls(modUnitCalcResults, 'Defense');
        modUnitCalcResults.secondaryTotals.protection = this.getSecondaryValue(modUnitCalcResults, 'Protection', '');
        modUnitCalcResults.secondaryTotals.protectionPercent = this.getSecondaryValue(modUnitCalcResults, 'Protection', '%');
        modUnitCalcResults.secondaryTotals.protectionRolls = this.getSecondaryRolls(modUnitCalcResults, 'Protection');
        modUnitCalcResults.secondaryTotals.health = this.getSecondaryValue(modUnitCalcResults, 'Health', '');
        modUnitCalcResults.secondaryTotals.healthPercent = this.getSecondaryValue(modUnitCalcResults, 'Health', '%');
        modUnitCalcResults.secondaryTotals.healthRolls = this.getSecondaryRolls(modUnitCalcResults, 'Health');
        modUnitCalcResults.secondaryTotals.tenacity = this.getSecondaryValue(modUnitCalcResults, 'Tenacity', '%');
    }

    public static assignRankings(property: string, rankName: string, dtos: ModSecondaryTotals[]) {
        dtos.sort(this.sortByProperty(property));
        dtos.forEach((value, index) => {
            value[rankName] = index + 1;
        });
    }

    public static sortByProperty(propertyName: string) {
        return (a, b) => {
            return b[propertyName] - a[propertyName];
        }
    }

    public static getSecondaryValue(calcResults: ModUnitCalcResults, stat: string, multiplier: string): number {
        let retVal: number = 0;

        let count = calcResults.secondaryCounts.find(sc => sc.name == stat);
        if (count != null) {
            let sstc = count.types.find(sstcIndex => sstcIndex.type == multiplier);
            if (sstc != null) {
                retVal = Math.round(sstc.value * sstc.multiplier / calcResults.allSetTotals.setTypeTotal);
            }
        }
        return retVal;
    }

    public static getSecondaryRolls(calcResults: ModUnitCalcResults, stat: string): number {
        let retVal: number = 0;

        let count = calcResults.secondaryCounts.find(sc => sc.name == stat);
        if (count != null) {
            retVal = Math.round(count.rolls / calcResults.allSetTotals.setTypeTotal);
        }
        return retVal;
    }

    public static sortPrimaryCounts(a, b): number {
        return b.count - a.count;
    };

    public static calculateMods(mods: Mods[]): ModCalculatedData {
        let retVal = new ModCalculatedData();

        if (mods == null) return retVal;

        let characterList: string[] = [];
        console.log('generate a list of characters');
        mods.forEach(playerMods => {
            playerMods.mods.forEach(mod => {
                characterList.indexOf(mod.character) === -1 ? characterList.push(mod.character) : null;
            });
        });

        console.log('add player sets');
        characterList.forEach(character => {
            let unit: ModUnitCalcResults = new ModUnitCalcResults(character);
            retVal.modCalcResults.units.push(unit);

            mods.forEach(playerMods => {
                let modsForAPlayer: ModsEntity[] = playerMods.mods.filter(modEntity => modEntity.character == character);
                this.addPlayerMods(modsForAPlayer, unit);
            })
        });

        console.log('calculate most commons');
        characterList.forEach(character => {
            let unit: ModUnitCalcResults = retVal.modCalcResults.units.find(unit => unit.name == character);
            this.calculateModMostCommon(unit);
        });

        let modSecondaryTotals = retVal.modCalcResults.units.map(unit => {
            return unit.secondaryTotals;
        });

        this.assignRankings('speed', 'speedRank', modSecondaryTotals);
        this.assignRankings('offenseRolls', 'offenseRank', modSecondaryTotals);
        this.assignRankings('critChance', 'critChanceRank', modSecondaryTotals);
        this.assignRankings('potency', 'potencyRank', modSecondaryTotals);
        this.assignRankings('defenseRolls', 'defenseRank', modSecondaryTotals);
        this.assignRankings('protectionRolls', 'protectionRank', modSecondaryTotals);
        this.assignRankings('healthRolls', 'healthRank', modSecondaryTotals);
        this.assignRankings('tenacity', 'tenacityRank', modSecondaryTotals);

        retVal.units = null;

        return retVal;
    }

    public static isSwgohSet(swgohSetId: number, englishSet: string) {

        return englishSet != null && ((swgohSetId == MOD_SET_HEALTH && englishSet == 'health') ||
            (swgohSetId == MOD_SET_OFFENSE && englishSet == 'offense') ||
            (swgohSetId == MOD_SET_DEFENSE && englishSet == 'defense') ||
            (swgohSetId == MOD_SET_SPEED && englishSet == 'speed') ||
            (swgohSetId == MOD_SET_CRIT_CHANCE && englishSet == 'critChance') ||
            (swgohSetId == MOD_SET_CRIT_DMG && englishSet == 'critDmg') ||
            (swgohSetId == MOD_SET_POTENCY && englishSet == 'potency') ||
            (swgohSetId == MOD_SET_TENACITY && englishSet == 'tenacity'));
    }


    public static getSwgohSetLabel(swgohSetId: number): string {

        switch (swgohSetId) {
            case MOD_SECONDARY_HEALTH: {
                return "Health"
            }
            case MOD_SET_OFFENSE: {
                return "Offense"
            }
            case MOD_SET_DEFENSE: {
                return "Defense"
            }
            case MOD_SET_SPEED: {
                return "Speed";
            }
            case MOD_SET_CRIT_CHANCE: {
                return "Critical Chance";
            }
            case MOD_SET_CRIT_DMG: {
                return "Critical Damage";
            }
            case MOD_SET_POTENCY: {
                return "Potency";
            }
            case MOD_SET_TENACITY: {
                return "Tenacity";
            }
        }

        return "unknown";
    }

    public static calculateModMatchStrength(mod: ModsEntity, modUnitCalcResults: ModUnitCalcResults): number {
        let retVal = 0;

        let primaryStrength: number = 1;

        if (modUnitCalcResults != null) {

            let primaryCounts: PrimaryCounts[] = null;

            switch (mod.slot) {
                case MOD_SLOT_ARROW: {
                    primaryCounts = modUnitCalcResults.arrowPrimaryCounts;
                    break;
                }
                case MOD_SLOT_TRIANGLE: {
                    primaryCounts = modUnitCalcResults.trianglePrimaryCounts;
                    break;
                }
                case MOD_SLOT_CIRCLE: {
                    primaryCounts = modUnitCalcResults.circlePrimaryCounts;
                    break;
                }
                case MOD_SLOT_CROSS: {
                    primaryCounts = modUnitCalcResults.crossPrimaryCounts;
                    break;
                }
            }
            if (primaryCounts != null) {
                let maxPrimarycounts = 0;
                let modPrimaryCounts = 0;
                primaryCounts.forEach(primaryCount => {

                    if (primaryCount.count > maxPrimarycounts) {
                        maxPrimarycounts = primaryCount.count;
                    }
                    if (primaryCount.primaryType == mod.primary_stat.name) {
                        modPrimaryCounts = primaryCount.count;
                    }
                });
                primaryStrength = modPrimaryCounts / maxPrimarycounts;
            }
        }

        if (modUnitCalcResults != null && modUnitCalcResults.secondaryCounts != null) {
            let totalRolls = 0;
            modUnitCalcResults.secondaryCounts.forEach(sc => {
                totalRolls = totalRolls + sc.rolls;
            });

            modUnitCalcResults.secondaryCounts.forEach(sc => {
                let percent = sc.rolls / totalRolls;
                retVal = retVal + (percent * this.getSecondaryQuality(sc.name, mod));
            });
        }
        return retVal * primaryStrength;
    }

    public static getSecondaryValueFromMod(mod: ModsEntity, secondary: number): number {
        let retVal: number = 0;

        mod.secondary_stats.forEach(secondaryStat => {
            if (secondaryStat.stat_id == secondary) {

                switch (secondary) {
                    case MOD_SECONDARY_HEALTH: {
                        retVal = secondaryStat.value * 0.0001;
                        break;
                    }
                    case MOD_SECONDARY_HEALTH_PERCENT: {
                        retVal = secondaryStat.value * 0.01;
                        break;
                    }
                    case MOD_SECONDARY_PROTECTION: {
                        retVal = secondaryStat.value * 0.0001;
                        break;
                    }
                    case MOD_SECONDARY_PROTECTION_PERCENT: {
                        retVal = secondaryStat.value * 0.01;
                        break;
                    }
                    case MOD_SECONDARY_OFFENSE: {
                        retVal = secondaryStat.value * 0.0001;
                        break;
                    }
                    case MOD_SECONDARY_OFFENSE_PERCENT: {
                        retVal = secondaryStat.value * 0.01;
                        break;
                    }
                    case MOD_SECONDARY_DEFENSE: {
                        retVal = secondaryStat.value * 0.0001;
                        break;
                    }
                    case MOD_SECONDARY_DEFENSE_PERCENT: {
                        retVal = secondaryStat.value * 0.01;
                        break;
                    }
                    case MOD_SECONDARY_CRIT_CHANCE: {
                        retVal = secondaryStat.value * 0.01;
                        break;
                    }
                    case MOD_SECONDARY_POTENCY: {
                        retVal = secondaryStat.value * 0.01;
                        break;
                    }
                    case MOD_SECONDARY_SPEED: {
                        retVal = secondaryStat.value * 0.0001;
                        break;
                    }
                    case MOD_SECONDARY_TENACITY: {
                        retVal = secondaryStat.value * 0.01;
                        break;
                    }
                }
            }
        });
        return retVal;
    }

    public static getSecondaryQuality(secondary: string, mod: ModsEntity): number {

        let healthRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_HEALTH) / 428;
        let healthPercentRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_HEALTH_PERCENT) / 1.13;
        let healthOverallQuality: number = healthRollQuality + healthPercentRollQuality;

        let protectionRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_PROTECTION) / 830;
        let protectionPercentRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_PROTECTION_PERCENT) / 2.33;
        let protectionOverallQuality: number = protectionRollQuality + protectionPercentRollQuality;

        let offenseRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_OFFENSE) / 46;
        let offensePercentRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_OFFENSE_PERCENT) / .56;
        let offenseOverallQuality: number = offenseRollQuality + offensePercentRollQuality;

        let defenseRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_DEFENSE) / 9;
        let defensePercentRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_DEFENSE_PERCENT) / 1.7;
        let defenseOverallQuality: number = defenseRollQuality + defensePercentRollQuality;

        let critChanceRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_CRIT_CHANCE) / 2.25;
        let potencyRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_POTENCY) / 2.25;
        let speedRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_SPEED) / 6;
        let tenacityRollQuality: number = this.getSecondaryValueFromMod(mod, MOD_SECONDARY_TENACITY) / 2.25;

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

    public static getStats(unitEntity: UnitsEntity): StatsDto {
        let retVal: StatsDto = new StatsDto();

        retVal.speed = unitEntity.data.stats[SwgohGgConstants.SPEED_STAT_ID];
        retVal.health = unitEntity.data.stats[SwgohGgConstants.HEALTH_STAT_ID];
        retVal.protection = unitEntity.data.stats[SwgohGgConstants.PROTECTION_STAT_ID];
        retVal.physicalOffense = unitEntity.data.stats[SwgohGgConstants.PHYSICAL_OFFENSE];
        retVal.specialOffense = unitEntity.data.stats[SwgohGgConstants.SPECIAL_OFFENSE];
        retVal.tenacity = unitEntity.data.stats[SwgohGgConstants.TENACITY_STAT_ID] * 100;
        retVal.potency = unitEntity.data.stats[SwgohGgConstants.POTENCY_STAT_ID] * 100;
        retVal.physicalCritChance = unitEntity.data.stats[SwgohGgConstants.PHYSICAL_CRIT_CHANCE_STAT_ID];
        retVal.specialCritChance = unitEntity.data.stats[SwgohGgConstants.SPECIAL_CRIT_CHANCE_STAT_ID];
        retVal.critDamage = unitEntity.data.stats[SwgohGgConstants.CRIT_DMG] * 100;
        retVal.specialCritAvoidance = unitEntity.data.stats[SwgohGgConstants.SPECIAL_CRITICAL_AVOIDANCE_STAT_ID];
        retVal.physicalCritAvoidance = unitEntity.data.stats[SwgohGgConstants.PHYSCICAL_CRITICAL_AVOIDANCE_STAT_ID];

        retVal.physicalDefense = unitEntity.data.stats[SwgohGgConstants.PHYSICAL_ARMOR];
        retVal.speciallDefense = unitEntity.data.stats[SwgohGgConstants.SPECIAL_RESISTANCE];
        return retVal;
    }


    public static deriveBaseStats(unitEntity: UnitsEntity, currentModBonus: ModTotalBonus): StatsDto {
        let retVal: StatsDto = this.getStats(unitEntity);

        retVal.speed = (retVal.speed - currentModBonus.speed) / (1 + currentModBonus.speedPercent / 100);
        retVal.health = (retVal.health - currentModBonus.health) / (1 + currentModBonus.healthPercent / 100);
        retVal.protection = (retVal.protection - currentModBonus.protection) / (1 + currentModBonus.protectionPercent / 100);
        retVal.physicalOffense = (retVal.physicalOffense - currentModBonus.offense) / (1 + currentModBonus.offensePercent / 100);
        retVal.specialOffense = (retVal.specialOffense - currentModBonus.offense) / (1 + currentModBonus.offensePercent / 100);
        retVal.tenacity = retVal.tenacity - currentModBonus.tenactiyPercent;
        retVal.potency = retVal.potency - currentModBonus.potencyPercent;
        retVal.physicalCritChance = retVal.physicalCritChance - currentModBonus.criticalChancePercent;
        retVal.specialCritChance = retVal.specialCritChance - currentModBonus.criticalChancePercent;
        retVal.critDamage = retVal.critDamage - currentModBonus.criticalDamagePercent;
        retVal.specialCritAvoidance = retVal.specialCritAvoidance - currentModBonus.criticalAvoidancePercent;
        retVal.physicalCritAvoidance = retVal.physicalCritAvoidance - currentModBonus.criticalAvoidancePercent;

        retVal.physicalDefense = (retVal.physicalDefense - currentModBonus.defense / 10) / (1 + currentModBonus.defensePercent / 100);
        retVal.speciallDefense = (retVal.speciallDefense - currentModBonus.defense / 10) / (1 + currentModBonus.defensePercent / 100);

        //   public physicalDefense: number = 0;
        //   public speciallDefense: number = 0;
        //   public accuracy: number = 0;

        return retVal;
    }

    public static applyBonuses(statsDto: StatsDto, currentModBonus: ModTotalBonus): StatsDto {
        let retVal: StatsDto = new StatsDto();

        retVal.speed = (statsDto.speed) * (1 + currentModBonus.speedPercent / 100) + currentModBonus.speed;
        retVal.health = (statsDto.health) * (1 + currentModBonus.healthPercent / 100) + currentModBonus.health;
        retVal.protection = (statsDto.protection) * (1 + currentModBonus.protectionPercent / 100) + currentModBonus.protection;
        retVal.physicalOffense = (statsDto.physicalOffense) * (1 + currentModBonus.offensePercent / 100) + currentModBonus.offense;
        retVal.specialOffense = (statsDto.specialOffense) * (1 + currentModBonus.offensePercent / 100) + currentModBonus.offense;
        retVal.tenacity = statsDto.tenacity + currentModBonus.tenactiyPercent;
        retVal.potency = statsDto.potency + currentModBonus.potencyPercent;
        retVal.physicalCritChance = statsDto.physicalCritChance + currentModBonus.criticalChancePercent;
        retVal.specialCritChance = statsDto.specialCritChance + currentModBonus.criticalChancePercent;
        retVal.critDamage = statsDto.critDamage + currentModBonus.criticalDamagePercent;
        retVal.specialCritAvoidance = statsDto.specialCritAvoidance + currentModBonus.criticalAvoidancePercent;
        retVal.physicalCritAvoidance = statsDto.physicalCritAvoidance + currentModBonus.criticalAvoidancePercent;

        retVal.physicalDefense = (statsDto.physicalDefense) * (1 + currentModBonus.defensePercent / 100) + currentModBonus.defense / 10;
        retVal.speciallDefense = (statsDto.speciallDefense) * (1 + currentModBonus.defensePercent / 100) + currentModBonus.defense / 10;


        //   public physicalDefense: number = 0;
        //   public speciallDefense: number = 0;
        //   public accuracy: number = 0;

        return retVal;
    }
}
