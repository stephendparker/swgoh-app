

export class SwgohGgConstants {

    public static MOD_SLOT_SQUARE = 1;
    public static MOD_SLOT_ARROW = 2;
    public static MOD_SLOT_DIAMOND = 3;
    public static MOD_SLOT_TRIANGLE = 4;
    public static MOD_SLOT_CIRCLE = 5;
    public static MOD_SLOT_CROSS = 6;

    public static MOD_SECONDARY_HEALTH_NAME = "Health";
    public static MOD_SECONDARY_OFFENSE_NAME = "Offense";
    public static MOD_SECONDARY_DEFENSE_NAME = "Defense";
    public static MOD_SECONDARY_SPEED_NAME = "Speed";
    public static MOD_SECONDARY_CRIT_CHANCE_NAME = "Critical Chance";
    public static MOD_SECONDARY_POTENCY_NAME = "Potency";
    public static MOD_SECONDARY_TENACITY_NAME = "Tenacity";
    public static MOD_SECONDARY_PROTECTION_NAME = "Protection";

    public static ALL_SECONDARIES = [SwgohGgConstants.MOD_SECONDARY_HEALTH_NAME, SwgohGgConstants.MOD_SECONDARY_OFFENSE_NAME, SwgohGgConstants.MOD_SECONDARY_DEFENSE_NAME,
    SwgohGgConstants.MOD_SECONDARY_SPEED_NAME, SwgohGgConstants.MOD_SECONDARY_CRIT_CHANCE_NAME, SwgohGgConstants.MOD_SECONDARY_POTENCY_NAME,
    SwgohGgConstants.MOD_SECONDARY_TENACITY_NAME, SwgohGgConstants.MOD_SECONDARY_PROTECTION_NAME];

    public static HEALTH_STAT_ID = 1;
    public static STR_STAT_ID = 2;
    public static AGILITY_STAT_ID = 3;
    public static TACTICS_STAT_ID = 4;
    public static SPEED_STAT_ID = 5;
    public static PHYSICAL_OFFENSE = 6;
    public static SPECIAL_OFFENSE = 7;
    public static PHYSICAL_ARMOR = 8;
    public static SPECIAL_RESISTANCE = 9;
    public static ARMOR_PENETRATION = 10;
    public static RESISTANCE_PENETRATION = 11;
    public static PHYSICAL_CRIT_CHANCE_STAT_ID = 14;
    public static SPECIAL_CRIT_CHANCE_STAT_ID = 15;
    public static CRIT_DMG = 16;
    public static POTENCY_STAT_ID = 17;
    public static TENACITY_STAT_ID = 18;
    public static PROTECTION_STAT_ID = 28;

    public static PHYSCICAL_CRITICAL_AVOIDANCE_STAT_ID = 39;
    public static SPECIAL_CRITICAL_AVOIDANCE_STAT_ID = 40;



    public static MOD_HEALTH_STAT_ID = 1;
    public static MOD_HEALTH_PERCENT_STAT_ID = 55;
    public static MOD_PROTECTION_STAT_ID = 28;
    public static MOD_PROTECTION_PERCENT_STAT_ID = 56;
    public static MOD_OFFENSE_STAT_ID = 41;
    public static MOD_OFFENSE_PERCENT_STAT_ID = 48;
    public static MOD_DEFENSE_STAT_ID = 42;
    public static MOD_DEFENSE_PERCENT_STAT_ID = 49;
    public static MOD_CRIT_CHANCE_STAT_ID = 53;
    public static MOD_CRIT_DMG_STAT_ID = 16;
    public static MOD_POTENCY_STAT_ID = 17;
    public static MOD_SPEED_STAT_ID = 5;
    public static MOD_TENACITY_STAT_ID = 18;
    public static MOD_CRIT_AVOIDANCE_STAT_ID = 54;
    public static MOD_ACCURACY_STAT_ID = 52;

    public static PRIMARY_LABEL_MAP = {
        55: 'Health',
        56: 'Protection',
        48: 'Offense',
        49: 'Defense',
        53: 'Critical Chance',
        16: 'Critical Damage',
        17: 'Potency',
        5: 'Speed',
        18: 'Tenacity',
        54: 'Critical Avoidance',
        52: 'Accuracy'
    }

    public static MOD_SET_HEALTH = 1;
    public static MOD_SET_OFFENSE = 2;
    public static MOD_SET_DEFENSE = 3;
    public static MOD_SET_SPEED = 4;
    public static MOD_SET_CRIT_CHANCE = 5;
    public static MOD_SET_CRIT_DMG = 6;
    public static MOD_SET_POTENCY = 7;
    public static MOD_SET_TENACITY = 8;


    public static SET_LABEL_MAP = {
        1: 'health',
        2: 'offense',
        3: 'defense',
        4: 'speed',
        5: 'critChance',
        6: 'critDmg',
        7: 'potency',
        8: 'tenacity'
    }

    public static FOUR_SETS = [SwgohGgConstants.MOD_SET_SPEED, SwgohGgConstants.MOD_SET_OFFENSE, SwgohGgConstants.MOD_SET_CRIT_DMG];
    public static TWO_SETS = [SwgohGgConstants.MOD_SET_HEALTH, SwgohGgConstants.MOD_SET_DEFENSE, SwgohGgConstants.MOD_SET_CRIT_CHANCE,
    SwgohGgConstants.MOD_SET_POTENCY, SwgohGgConstants.MOD_SET_TENACITY];

    public static ALL_PRIMARIES = [SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID, SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID,
    SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID, SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID, SwgohGgConstants.MOD_CRIT_CHANCE_STAT_ID, SwgohGgConstants.MOD_CRIT_DMG_STAT_ID,
    SwgohGgConstants.MOD_POTENCY_STAT_ID, SwgohGgConstants.MOD_SPEED_STAT_ID, SwgohGgConstants.MOD_TENACITY_STAT_ID, SwgohGgConstants.MOD_CRIT_AVOIDANCE_STAT_ID,
    SwgohGgConstants.MOD_ACCURACY_STAT_ID];


    public static ALL_CIRCLE_PRIMARIES = [SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID, SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID];

    public static ALL_TRIANGLE_PRIMARIES = [SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID, SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID,
    SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID, SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID, SwgohGgConstants.MOD_CRIT_CHANCE_STAT_ID, SwgohGgConstants.MOD_CRIT_DMG_STAT_ID];

    public static ALL_CROSS_PRIMARIES = [SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID, SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID, SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID,
    SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID, SwgohGgConstants.MOD_POTENCY_STAT_ID, SwgohGgConstants.MOD_TENACITY_STAT_ID];

    public static ALL_ARROW_PRIMARIES = [SwgohGgConstants.MOD_HEALTH_PERCENT_STAT_ID, SwgohGgConstants.MOD_PROTECTION_PERCENT_STAT_ID, SwgohGgConstants.MOD_SPEED_STAT_ID,
    SwgohGgConstants.MOD_OFFENSE_PERCENT_STAT_ID, SwgohGgConstants.MOD_DEFENSE_PERCENT_STAT_ID, SwgohGgConstants.MOD_CRIT_AVOIDANCE_STAT_ID, SwgohGgConstants.MOD_ACCURACY_STAT_ID];

}