import { RootObject, Player } from './../model/swgohgg/guild-data';
import { PlayerData } from './../model/swgohgg/player-data';
import { Mods, ModsEntity, SecondaryStatsEntity } from './../model/swgohgg/mods-data';

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

export class ModCalcResults {
    units: ModUnitCalcResults[] = [];
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

    ModSecondaryResults

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

export class SwgohGgCalc {

    public static FULL_SET_LIST = ["offense", "speed", "critDmg", "health", "defense", "critChance", "potency", "tenacity"];
    public static TWO_SET_LIST = ["health", "defense", "critChance", "potency", "tenacity"];
    public static FOUR_SET_LIST = ["offense", "speed", "critDmg"];

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

    public static addPlayerMods(mods: ModsEntity[], modUnitCalcResults: ModUnitCalcResults) {

        let setTotalCounts: SetTotalCounts = new SetTotalCounts();

        setTotalCounts.offense = Math.floor(this.getSetCount(mods, MOD_SET_OFFENSE) / 4);
        setTotalCounts.speed = Math.floor(this.getSetCount(mods, MOD_SET_SPEED) / 4);
        setTotalCounts.critDmg = Math.floor(this.getSetCount(mods, MOD_SET_CRIT_DMG) / 4);
        setTotalCounts.health = Math.floor(this.getSetCount(mods, MOD_SET_HEALTH) / 2);
        setTotalCounts.defense = Math.floor(this.getSetCount(mods, MOD_SET_DEFENSE) / 2);
        setTotalCounts.critChance = Math.floor(this.getSetCount(mods, MOD_SET_CRIT_CHANCE) / 2);
        setTotalCounts.potency = Math.floor(this.getSetCount(mods, MOD_SET_POTENCY) / 2);
        setTotalCounts.tenacity = Math.floor(this.getSetCount(mods, MOD_SET_TENACITY) / 2);

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
                    if (primaryAsSecondary.stat_id != null)
                        this.addSecondaryStat(primaryAsSecondary, modUnitCalcResults.secondaryCounts);
                    break;
                }
                case MOD_SLOT_TRIANGLE: {
                    modSlot = modUnitCalcResults.trianglePrimaryCounts;
                    if (primaryAsSecondary.stat_id != null)
                        this.addSecondaryStat(primaryAsSecondary, modUnitCalcResults.secondaryCounts);
                    break;
                }
                case MOD_SLOT_CIRCLE: {
                    modSlot = modUnitCalcResults.circlePrimaryCounts;
                    if (primaryAsSecondary.stat_id != null)
                        this.addSecondaryStat(primaryAsSecondary, modUnitCalcResults.secondaryCounts);
                    break;
                }
                case MOD_SLOT_CROSS: {
                    modSlot = modUnitCalcResults.crossPrimaryCounts;
                    if (primaryAsSecondary.stat_id != null)
                        this.addSecondaryStat(primaryAsSecondary, modUnitCalcResults.secondaryCounts);
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

    public static calculateModMostCommon(modUnitCalcResults: ModUnitCalcResults) {

        let setTotalCounts: SetTotalCounts = new SetTotalCounts();
        this.addCounts(setTotalCounts, modUnitCalcResults.allSetTotals);
        setTotalCounts.critDmg = setTotalCounts.critDmg * 2;
        setTotalCounts.speed = setTotalCounts.speed * 2;
        setTotalCounts.offense = setTotalCounts.offense * 2;

        let mostCommon = this.getModSetMostCommon(this.FULL_SET_LIST, setTotalCounts);
        if (this.FOUR_SET_LIST.indexOf(mostCommon) > -1) {
            modUnitCalcResults.commonSet1 = mostCommon;
            modUnitCalcResults.commonSet2 = this.getModSetMostCommon(this.TWO_SET_LIST, setTotalCounts);
        } else {
            setTotalCounts[mostCommon] = setTotalCounts[mostCommon] - modUnitCalcResults.allSetTotals.setTypeTotal;
            let secondMostCommon = this.getModSetMostCommon(this.FULL_SET_LIST, setTotalCounts);
            if (["offense", "speed", "critDmg"].indexOf(secondMostCommon) > -1) {
                modUnitCalcResults.commonSet1 = secondMostCommon;
                modUnitCalcResults.commonSet2 = mostCommon;
            } else {
                setTotalCounts[mostCommon] = setTotalCounts[mostCommon] - modUnitCalcResults.allSetTotals.setTypeTotal;
                modUnitCalcResults.commonSet1 = mostCommon;
                modUnitCalcResults.commonSet2 = secondMostCommon;
                modUnitCalcResults.commonSet3 = this.getModSetMostCommon(this.TWO_SET_LIST, setTotalCounts);
            }
        }

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

        return retVal;
    }

}
