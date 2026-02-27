// src/components/GameController.tsx
import { useGameStore } from '../store/useGameStore';
import { BattleArena } from './battle/BattleArena';
import { Overworld } from './world/Overworld';

export const GameController = () => {
  const { gameState } = useGameStore();

  return (
    <>
      {gameState === 'exploration' && <Overworld />}
      {gameState === 'battle' && <BattleArena />}
    </>
  );
};