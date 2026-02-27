import type { Move } from '../types/game';

export const MOVES: Record<string, Move> = {
  TACKLE: { id: 'm1', name: 'Charge', type: 'Normal', power: 40, accuracy: 100, pp: 35 },
  THUNDERBOLT: { id: 'm2', name: 'Tonnerre', type: 'Electric', power: 90, accuracy: 100, pp: 15 },
  VINE_WHIP: { id: 'm3', name: 'Fouet Lianes', type: 'Grass', power: 45, accuracy: 100, pp: 25 },
  EMBER: { id: 'm4', name: 'Flammèche', type: 'Fire', power: 40, accuracy: 100, pp: 25 },
};