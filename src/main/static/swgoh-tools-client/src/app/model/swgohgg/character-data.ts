export interface CharacterData {
  name: string;
  base_id: string;
  pk: number;
  url: string;
  image: string;
  power: number;
  description: string;
  combat_type: number;
  gear_levels?: (GearLevelsEntity)[] | null;
  alignment: string;
  categories?: (string)[] | null;
  ability_classes?: (string)[] | null;
  role: string;
  ship: string;
  ship_slot?: number | null;
  activate_shard_count: number;
}
export interface GearLevelsEntity {
  tier: number;
  gear?: (string)[] | null;
}
