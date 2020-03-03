// https://jvilk.com/MakeTypes/

export interface PlayerData {
    units?: (UnitsEntity)[] | null;
    data: Data;
}
export interface UnitsEntity {
    data: Data1;
}
export interface Data1 {
    gear?: (GearEntity | null)[] | null;
    power: number;
    combat_type: number;
    base_id: string;
    gear_level: number;
    stats: Stats;
    name: string;
    level: number;
    url: string;
    rarity: number;
    ability_data?: (AbilityDataEntity)[] | null;
    zeta_abilities?: (null)[] | null;
}
export interface GearEntity {
    slot: number;
    is_obtained: boolean;
    base_id: string;
}
export interface Stats {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    27: number;
    28: number;
    37: number;
    38: number;
    39: number;
    40: number;
}
export interface AbilityDataEntity {
    is_omega: boolean;
    is_zeta: boolean;
    name: string;
    ability_tier: number;
    id: string;
    tier_max: number;
}
export interface Data {
    last_updated: string;
    galactic_power: number;
    pve_battles_won: number;
    character_galactic_power: number;
    guild_contribution: number;
    guild_exchange_donations: number;
    fleet_arena: FleetArena;
    guild_id: number;
    arena_leader_base_id: string;
    galactic_war_won: number;
    pve_hard_won: number;
    guild_name: string;
    arena_rank: number;
    guild_raid_won: number;
    arena: Arena;
    name: string;
    ally_code: number;
    pvp_battles_won: number;
    level: number;
    ship_galactic_power: number;
    url: string;
    ship_battles_won: number;
}
export interface FleetArena {
    members?: (string)[] | null;
    reinforcements?: (string)[] | null;
    leader: string;
    rank: number;
}
export interface Arena {
    members?: (string)[] | null;
    leader: string;
    rank: number;
}
