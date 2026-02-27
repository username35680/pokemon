import { useBattleStore } from '../../store/useBattleStore';
import { useGameStore } from '../../store/useGameStore';
// Inside GameOverOverlay.tsx
export const GameOverOverlay = () => {
  const { winner, initGame } = useBattleStore();
  const { setGameState } = useGameStore();

  if (!winner) return null;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <h2 className="text-5xl font-bold text-white mb-8">
        {winner === 'player' ? 'Victoire !' : 'Défaite...'}
      </h2>
      
      <div className="flex gap-4">
        <button 
          onClick={initGame}
          className="px-8 py-4 bg-yellow-500 rounded-full font-bold"
        >
          Rejouer
        </button>
        <button 
          onClick={() => setGameState('exploration')}
          className="px-8 py-4 bg-white/20 text-white rounded-full font-bold"
        >
          Retourner explorer
        </button>
      </div>
    </div>
  );
};