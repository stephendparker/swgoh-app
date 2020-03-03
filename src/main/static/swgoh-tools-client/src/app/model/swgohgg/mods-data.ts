export interface Mods {
  count: number;
  mods?: (ModsEntity)[] | null;
}
export interface ModsEntity {
  slot: number;
  secondary_stats?: (SecondaryStatsEntity)[] | null;
  set: number;
  level: number;
  tier: number;
  primary_stat: PrimaryStat;
  character: string;
  id: string;
  rarity: number;
}
export interface SecondaryStatsEntity {
  roll: number;
  stat_id: number;
  name: string;
  value: number;
  display_value: string;
}
export interface PrimaryStat {
  stat_id: number;
  name: string;
  value: number;
  display_value: string;
}
