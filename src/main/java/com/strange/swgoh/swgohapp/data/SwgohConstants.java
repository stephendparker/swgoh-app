package com.strange.swgoh.swgohapp.data;

import java.util.*;

public class SwgohConstants {

    public static int MOD_HEALTH_STAT_ID = 1;
    public static int MOD_HEALTH_PERCENT_STAT_ID = 55;
    public static int MOD_PROTECTION_STAT_ID = 28;
    public static int MOD_PROTECTION_PERCENT_STAT_ID = 56;
    public static int MOD_OFFENSE_STAT_ID = 41;
    public static int MOD_OFFENSE_PERCENT_STAT_ID = 48;
    public static int MOD_DEFENSE_STAT_ID = 42;
    public static int MOD_DEFENSE_PERCENT_STAT_ID = 49;
    public static int MOD_CRIT_CHANCE_STAT_ID = 53;
    public static int MOD_CRIT_DMG_STAT_ID = 16;
    public static int MOD_POTENCY_STAT_ID = 17;
    public static int MOD_SPEED_STAT_ID = 5;
    public static int MOD_TENACITY_STAT_ID = 18;
    public static int MOD_CRIT_AVOIDANCE_STAT_ID = 52;
    public static int MOD_ACCURACY_STAT_ID = 54;

    public static int MOD_SET_HEALTH = 1;
    public static int MOD_SET_OFFENSE = 2;
    public static int MOD_SET_DEFENSE = 3;
    public static int MOD_SET_SPEED = 4;
    public static int MOD_SET_CRIT_CHANCE = 5;
    public static int MOD_SET_CRIT_DMG = 6;
    public static int MOD_SET_POTENCY = 7;
    public static int MOD_SET_TENACITY = 8;

    public static int  MOD_SLOT_SQUARE = 1;
    public static int  MOD_SLOT_ARROW = 2;
    public static int  MOD_SLOT_DIAMOND = 3;
    public static int  MOD_SLOT_TRIANGLE = 4;
    public static int  MOD_SLOT_CIRCLE = 5;
    public static int  MOD_SLOT_CROSS = 6;

    public static List<Integer> MOD_FOUR_SETS = new ArrayList<>(Arrays.asList(MOD_SET_OFFENSE, MOD_SET_SPEED, MOD_SET_CRIT_DMG));

    public static String MOD_SET_HEALTH_NAME = "health";
    public static String MOD_SET_OFFENSE_NAME = "offense";
    public static String MOD_SET_DEFENSE_NAME = "defense";
    public static String MOD_SET_SPEED_NAME = "speed";
    public static String MOD_SET_CRIT_CHANCE_NAME = "critChance";
    public static String MOD_SET_CRIT_DMG_NAME = "critDamage";
    public static String MOD_SET_POTENCY_NAME = "potency";
    public static String MOD_SET_TENACITY_NAME = "tenacity";


    public static String MOD_SECONDARY_HEALTH_NAME = "Health";
    public static String MOD_SECONDARY_OFFENSE_NAME = "Offense";
    public static String MOD_SECONDARY_DEFENSE_NAME = "Defense";
    public static String MOD_SECONDARY_SPEED_NAME = "Speed";
    public static String MOD_SECONDARY_CRIT_CHANCE_NAME = "Critical Chance";
    public static String MOD_SECONDARY_POTENCY_NAME = "Potency";
    public static String MOD_SECONDARY_TENACITY_NAME = "Tenacity";
    public static String MOD_SECONDARY_PROTECTION_NAME = "Protection";

    public static Map<Integer, String> SECONDARY_NAME_MAP  = new HashMap<Integer, String>() {{
        put(MOD_HEALTH_STAT_ID, MOD_SECONDARY_HEALTH_NAME);
        put(MOD_HEALTH_PERCENT_STAT_ID, MOD_SECONDARY_HEALTH_NAME);
        put(MOD_OFFENSE_STAT_ID, MOD_SECONDARY_OFFENSE_NAME);
        put(MOD_OFFENSE_PERCENT_STAT_ID, MOD_SECONDARY_OFFENSE_NAME);
        put(MOD_DEFENSE_STAT_ID, MOD_SECONDARY_DEFENSE_NAME);
        put(MOD_DEFENSE_PERCENT_STAT_ID, MOD_SECONDARY_DEFENSE_NAME);
        put(MOD_SPEED_STAT_ID, MOD_SECONDARY_SPEED_NAME);
        put(MOD_CRIT_CHANCE_STAT_ID, MOD_SECONDARY_CRIT_CHANCE_NAME);
        put(MOD_POTENCY_STAT_ID, MOD_SECONDARY_POTENCY_NAME);
        put(MOD_TENACITY_STAT_ID, MOD_SECONDARY_TENACITY_NAME);
        put(MOD_PROTECTION_PERCENT_STAT_ID, MOD_SECONDARY_PROTECTION_NAME);
        put(MOD_PROTECTION_STAT_ID, MOD_SECONDARY_PROTECTION_NAME);
    }};

    public static Map<Integer, String> SET_NAME_MAP  = new HashMap<Integer, String>() {{
        put(MOD_SET_HEALTH, MOD_SET_HEALTH_NAME);
        put(MOD_SET_OFFENSE, MOD_SET_OFFENSE_NAME);
        put(MOD_SET_DEFENSE, MOD_SET_DEFENSE_NAME);
        put(MOD_SET_SPEED, MOD_SET_SPEED_NAME);
        put(MOD_SET_CRIT_CHANCE, MOD_SET_CRIT_CHANCE_NAME);
        put(MOD_SET_CRIT_DMG, MOD_SET_CRIT_DMG_NAME);
        put(MOD_SET_POTENCY, MOD_SET_POTENCY_NAME);
        put(MOD_SET_TENACITY, MOD_SET_TENACITY_NAME);
    }};
}
