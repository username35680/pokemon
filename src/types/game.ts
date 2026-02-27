// src/types/game.ts

export type PokemonType = 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Normal';
export type StatusCondition = 'paralyzed' | 'burned' | 'poisoned' | 'asleep' | null;

export interface Move {
  id: string;
  name: string;
  type: PokemonType;
  power: number;
  accuracy: number;
  pp: number;
}

export interface PokemonBase {
  id: number;
  name: string;
  types: PokemonType[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spd: number;
  };
  moves: Move[];
}

export interface BattlePokemon extends PokemonBase {
  currentHp: number;
  status: StatusCondition;
}

export interface BattleState {
  player: {
    pokemon: BattlePokemon;
  };
  opponent: {
    pokemon: BattlePokemon;
  };
  turn: 'player' | 'opponent';
  log: string[];
}