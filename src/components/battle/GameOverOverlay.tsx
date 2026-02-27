import { useBattleStore } from '../../store/useBattleStore';

export const GameOverOverlay = () => {
  const { winner, initGame } = useBattleStore();

  // Si le match n'est pas fini, on ne rend rien
  if (!winner) return null;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-in fade-in duration-500">
      <h2 className="text-5xl font-bold text-white mb-8">
        {winner === 'player' ? 'Victoire !' : 'Défaite...'}
      </h2>
      
      <button 
        onClick={initGame}
        className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full text-xl transition-transform hover:scale-105"
      >
        Rejouer
      </button>
    </div>
  );
};