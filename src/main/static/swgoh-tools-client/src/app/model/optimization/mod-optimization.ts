/* tslint:disable */
// Generated using typescript-generator version 2.13.489 on 2020-04-14 13:20:06.

export interface ModCalculatorCharacterResultsDto {
    name: string;
    count: number;
    primaryMultipliers: { [index: string]: { [index: string]: number } };
    primaryCounts: { [index: string]: { [index: string]: number } };
    fourSetsMultiplier: number;
    twoSetsMultiplier: number;
    setCounts: { [index: string]: number };
    fourSetMultipliers: { [index: string]: number };
    twoSetMax: number;
    twoSetCounts: { [index: string]: number };
    twoSetOccurrenceCounts: TwoSetOccurrence[];
    modsBySetCount: { [index: string]: number };
    commonSet1Name: string;
    commonSet2Name: string;
    commonSet3Name: string;
    secondaryCounts: { [index: string]: number };
    secondaryMultipliers: { [index: string]: number };
    secondaryTypeCounts: { [index: string]: number };
    secondaryTypeMultipliers: { [index: string]: number };
}

export interface ModCalculatorResultsDto {
    characterResults: ModCalculatorCharacterResultsDto[];
}

export interface TwoSetOccurrence {
    set: number;
    occurrence: number;
    count: number;
}
