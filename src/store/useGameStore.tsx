// src/store/useGameStore.ts
import { create } from 'zustand';

interface GameState {
  gameState: 'exploration' | 'battle';
  setGameState: (state: 'exploration' | 'battle') => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameState: 'exploration',
  setGameState: (state) => set({ gameState: state }),
}));