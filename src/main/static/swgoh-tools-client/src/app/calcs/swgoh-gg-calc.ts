import { RootObject, Player } from './../model/swgohgg/guild-data';
import { PlayerData } from './../model/swgohgg/player-data';
import { Mods, ModsEntity } from './../model/swgohgg/mods-data';

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

export class ModCalcResults {
    units: ModUnitCalcResults[] = [];
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

    public circlePrimaryCounts: PrimaryCounts[] = [];
    public crossPrimaryCounts: PrimaryCounts[] = [];
    public trianglePrimaryCounts: PrimaryCounts[] = [];
    public arrowPrimaryCounts: PrimaryCounts[] = [];

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

        if (setTotalCounts.offense > 0 || setTotalCounts.speed > 0 || setTotalCounts.critDmg > 0) {
            modUnitCalcResults.fourSetTotals.setTypeTotal = modUnitCalcResults.fourSetTotals.setTypeTotal + 1;
            this.addCounts(modUnitCalcResults.fourSetTotals, setTotalCounts);
        } else {
            modUnitCalcResults.twoSetTotals.setTypeTotal = modUnitCalcResults.twoSetTotals.setTypeTotal + 1;
            this.addCounts(modUnitCalcResults.twoSetTotals, setTotalCounts);
        }


        mods.forEach(mod => {
            let modSlot: PrimaryCounts[] = null;

            switch (mod.slot) {
                case MOD_SLOT_ARROW: {
                    modSlot = modUnitCalcResults.arrowPrimaryCounts;
                    break;
                }
                case MOD_SLOT_TRIANGLE: {
                    modSlot = modUnitCalcResults.trianglePrimaryCounts;
                    break;
                }
                case MOD_SLOT_CIRCLE: {
                    modSlot = modUnitCalcResults.circlePrimaryCounts;
                    break;
                }
                case MOD_SLOT_CROSS: {
                    modSlot = modUnitCalcResults.crossPrimaryCounts;
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
        return retVal;
    }

    public static getMostCommonPrimary(primaryCounts: PrimaryCounts[]): string {

        let retVal: string = null;
        let currentMax: number = 0;
        primaryCounts.forEach(primaryCount => {
            if (primaryCount.count > currentMax) {
                retVal = primaryCount.primaryType;
            }
        });
        return retVal;
    }

    public static calculateModMostCommon(modUnitCalcResults: ModUnitCalcResults) {

        if (modUnitCalcResults.fourSetTotals.setTypeTotal >= modUnitCalcResults.twoSetTotals.setTypeTotal) {
            modUnitCalcResults.commonSet1 = this.getModSetMostCommon(["offense", "speed", "critDmg"], modUnitCalcResults.fourSetTotals);
            modUnitCalcResults.commonSet2 = this.getModSetMostCommon(["health", "defense", "critChance", "potency", "tenacity"], modUnitCalcResults.fourSetTotals);
        } else {
            // clone this object because we are going to subtract but we dont want to change calculated value
            let setTotalCounts: SetTotalCounts = new SetTotalCounts();
            this.addCounts(setTotalCounts, modUnitCalcResults.twoSetTotals);

            modUnitCalcResults.commonSet1 = this.getModSetMostCommon(["health", "defense", "critChance", "potency", "tenacity"], setTotalCounts);
            setTotalCounts[modUnitCalcResults.commonSet1] = setTotalCounts[modUnitCalcResults.commonSet1] -
                modUnitCalcResults.twoSetTotals.setTypeTotal;

            modUnitCalcResults.commonSet2 = this.getModSetMostCommon(["health", "defense", "critChance", "potency", "tenacity"], setTotalCounts);
            setTotalCounts[modUnitCalcResults.commonSet2] = setTotalCounts[modUnitCalcResults.commonSet2] -
                modUnitCalcResults.twoSetTotals.setTypeTotal;

            modUnitCalcResults.commonSet3 = this.getModSetMostCommon(["health", "defense", "critChance", "potency", "tenacity"], setTotalCounts);
        }
        modUnitCalcResults.commonArrow = this.getMostCommonPrimary(modUnitCalcResults.arrowPrimaryCounts);
        modUnitCalcResults.commonCircle = this.getMostCommonPrimary(modUnitCalcResults.circlePrimaryCounts);
        modUnitCalcResults.commonCross = this.getMostCommonPrimary(modUnitCalcResults.crossPrimaryCounts);
        modUnitCalcResults.commonTriangle = this.getMostCommonPrimary(modUnitCalcResults.trianglePrimaryCounts);
    }

    public static calculateGuildData(mods: Mods[]): any {
        let retVal = {
            units: {},
            modCalcResults: new ModCalcResults()
        };

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

        return retVal;
    }

}
