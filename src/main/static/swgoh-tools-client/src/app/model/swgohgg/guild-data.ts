
export interface Stats {
    27: number;
    28: number;
    40: number;
    1: number;
    3: number;
    2: number;
    5: number;
    4: number;
    7: number;
    6: number;
    9: number;
    8: number;
    39: number;
    12: number;
    11: number;
    10: number;
    13: number;
    38: number;
    15: number;
    14: number;
    17: number;
    16: number;
    18: number;
    37: number;
}

export interface AbilityData {
    is_omega: boolean;
    is_zeta: boolean;
    name: string;
    ability_tier: number;
    id: string;
    tier_max: number;
}

export interface Gear {
    slot: number;
    is_obtained: boolean;
    base_id: string;
}

export interface Data {
    gear_level: number;
    name: string;
    power: number;
    level: number;
    url: string;
    combat_type: number;
    rarity: number;
    base_id: string;
    stats: Stats;
    zeta_abilities: string[];
    ability_data: AbilityData[];
    gear: Gear[];
    mod_set_ids: string[];
}

export interface Unit {
    data: Data;
}

export interface Data2 {
    arena?: any;
    arena_rank?: any;
    arena_leader_base_id?: any;
    last_updated: number;
    name: string;
    galactic_war_won: number;
    ally_code: number;
    galactic_power: number;
    level: number;
    pve_hard_won: number;
    pve_battles_won: number;
    character_galactic_power: number;
    fleet_arena?: any;
    ship_galactic_power: number;
    pvp_battles_won: number;
    guild_exchange_donations: number;
    url: string;
    guild_contribution: number;
    ship_battles_won: number;
    guild_raid_won: number;
}

export interface Player {
    units: Unit[];
    data: Data2;
}

export interface Data3 {
    name: string;
    member_count: number;
    galactic_power: number;
    rank: number;
    profile_count: number;
    id: number;
}

export interface RootObject {
    players: Player[];
    data: Data3;
}
