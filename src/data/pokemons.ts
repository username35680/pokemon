import type { BattlePokemon } from '../types/game';
import { MOVES } from './moves';

export const POKEMONS: Record<string, BattlePokemon> = {
  PIKACHU: {
    id:25,
    name: 'Pikachu',
    types: ['Electric'],
    stats: { hp: 100, atk: 55, def: 40, spd: 90 },
    moves: [MOVES.TACKLE, MOVES.THUNDERBOLT],
    currentHp: 100,
    status: null
  },
  BULBIZARRE: {
    id: 2,
    name: 'Bulbizarre',
    types: ['Grass'],
    stats: { hp: 120, atk: 49, def: 49, spd: 45 },
    moves: [MOVES.TACKLE, MOVES.VINE_WHIP],
    currentHp: 120,
    status: null
  },
  CARAPUCE: {
    id: 3,
    name: 'Carapuce',
    types: ['Water'],
    stats: { hp: 100, atk: 45, def: 49, spd: 45 },
    moves: [MOVES.TACKLE, MOVES.VINE_WHIP],
    currentHp: 100,
    status: null
  }
};