export interface Gear {
  base_id: string;
  recipes?: (RecipesEntity | null)[] | null;
  tier: number;
  required_level: number;
  stats: Stats;
  mark: string;
  cost: number;
  image: string;
  url: string;
  ingredients?: (IngredientsEntity | null)[] | null;
  name: string;
}
export interface RecipesEntity {
  base_id: string;
  result_id: string;
  cost: number;
  ingredients?: (IngredientsEntity1)[] | null;
}
export interface IngredientsEntity1 {
  amount: number;
  gear: string;
}
export interface Stats {
  3?: number | null;
  4?: number | null;
  6?: number | null;
  2?: number | null;
  10?: number | null;
  17?: number | null;
  1?: number | null;
  7?: number | null;
  14?: number | null;
  18?: number | null;
  5?: number | null;
  9?: number | null;
  27?: number | null;
  11?: number | null;
  15?: number | null;
  8?: number | null;
}
export interface IngredientsEntity {
  amount: number;
  gear: string;
}
