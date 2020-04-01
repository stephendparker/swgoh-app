package com.strange.swgoh.swgohapp.data.dto;

import java.util.ArrayList;
import java.util.List;

public class Mod {

    public int slot;
    public List<ModSecondaryStats> secondary_stats = new ArrayList<>();
    public int set;
    public int level;
    public int tier;
    public ModPrimaryStat primary_stat;
    public String id;
    public int rarity;

//    slot: number;
//    secondary_stats?: (SecondaryStatsEntity)[] | null;
//    set: number;
//    level: number;
//    tier: number;
//    primary_stat: PrimaryStat;
//    character: string;
//    id: string;
//    rarity: number;
}
