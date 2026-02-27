import { create } from 'zustand';
import { calculateDamage } from '../engine/damageCalculator';
import type { BattlePokemon, Move } from '../types/game';
import { POKEMONS } from '../data/pokemons';

interface BattleStore {
  player: BattlePokemon;
  opponent: BattlePokemon;
  turn: 'player' | 'opponent';
  logs: string[];
  winner: 'player' | 'opponent' | null;
  
  
  // Ajout des signatures manquantes ici
  initGame: () => void;
  executeMove: (move: Move) => void;
  executeAiTurn: () => void;
  setPlayer: (pokemon: BattlePokemon) => void;
  setOpponent: (pokemon: BattlePokemon) => void;
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  player: {} as BattlePokemon,
  opponent: {} as BattlePokemon,
  turn: 'player',
  logs: [],
  winner: null,

  initGame: () => set({
    player: POKEMONS.PIKACHU,
    opponent: POKEMONS.BULBIZARRE,
    turn: 'player',
    logs: ['Le combat commence !'],
    winner: null 
  }),

  // --- Ajout des fonctions manquantes ---
  setPlayer: (pokemon: BattlePokemon) => set({ player: pokemon }),
  setOpponent: (pokemon: BattlePokemon) => set({ opponent: pokemon }),
  // --------------------------------------

  executeMove: (move: Move) => {
    const { player, opponent, turn, winner } = get();
    if (turn !== 'player' || winner) return;

    const damage = calculateDamage(player, opponent, move);
    const newOpponentHp = Math.max(0, opponent.currentHp - damage);

    const isDefeated = newOpponentHp <= 0;

    set((state) => ({
      opponent: { ...state.opponent, currentHp: newOpponentHp },
      logs: [...state.logs, `${player.name} utilise ${move.name} et inflige ${damage} dégâts !`, 
             ...(isDefeated ? [`${opponent.name} est K.O ! Vous avez gagné !`] : [])],
      turn: isDefeated ? 'player' : 'opponent',
      winner: isDefeated ? 'player' : null
    }));

    if (!isDefeated) get().executeAiTurn();
  },

  executeAiTurn: () => {
    const { player, opponent, winner } = get();
    if (winner) return;

    setTimeout(() => {
      const randomMove = opponent.moves[Math.floor(Math.random() * opponent.moves.length)];
      const damage = calculateDamage(opponent, player, randomMove);
      const newPlayerHp = Math.max(0, player.currentHp - damage);

      const isDefeated = newPlayerHp <= 0;

      set((state) => ({
        player: { ...state.player, currentHp: newPlayerHp },
        logs: [...state.logs, `L'ennemi utilise ${randomMove.name} et inflige ${damage} dégâts !`,
               ...(isDefeated ? [`Votre Pokémon est K.O ! Défaite.`] : [])],
        turn: isDefeated ? 'opponent' : 'player',
        winner: isDefeated ? 'opponent' : null
      }));
    }, 1000);
  }
}));