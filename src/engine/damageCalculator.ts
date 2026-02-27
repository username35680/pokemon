import type { Move, BattlePokemon } from '../types/game';

// Ta table reste la même, elle est parfaite.
const TYPE_EFFECTIVENESS: Record<string, Record<string, number>> = {
  Fire: { Fire: 0.5, Water: 0.5, Grass: 2, Electric: 1, Normal: 1 },
  Water: { Fire: 2, Water: 0.5, Grass: 0.5, Electric: 1, Normal: 1 },
  Grass: { Fire: 0.5, Water: 2, Grass: 0.5, Electric: 1, Normal: 1 },
  Electric: { Fire: 1, Water: 2, Grass: 0.5, Electric: 0.5, Normal: 1 },
  Normal: { Fire: 1, Water: 1, Grass: 1, Electric: 1, Normal: 1 },
};

// 1. Les Modificateurs (La Pipeline)
const getStab = (attacker: BattlePokemon, move: Move) => 
  attacker.types.includes(move.type) ? 1.5 : 1;

const getEffectiveness = (defender: BattlePokemon, move: Move) => 
  defender.types.reduce((acc, defType) => 
    acc * (TYPE_EFFECTIVENESS[move.type]?.[defType] || 1), 1);

const getStatus = (attacker: BattlePokemon, move: Move) => 
  (attacker.status === 'burned' && move.power > 0) ? 0.5 : 1;

// 2. La fonction Orchestrateur
export const calculateDamage = (
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  level: number = 50
): number => {
  
  // On calcule le multiplicateur total en multipliant tous les modificateurs
  const totalModifier = getStab(attacker, move) * getEffectiveness(defender, move) * getStatus(attacker, move);

  // Formule de base
  const baseDamage = Math.floor(
    ((((2 * level) / 5 + 2) * move.power * (attacker.stats.atk / defender.stats.def)) / 50 + 2) 
    * totalModifier
  );

  return Math.max(1, baseDamage);
};