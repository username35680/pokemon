import { useBattleStore } from '../../store/useBattleStore';

export const ActionMenu = () => {
  const player = useBattleStore((state) => state.player);
  const executeMove = useBattleStore((state) => state.executeMove);

  // Guard clause : on sort si les données ne sont pas là
  if (!player || !player.moves) {
    return <div>Chargement des capacités...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {player.moves.map((move) => (
        <button
          key={move.id}
          onClick={() => executeMove(move)}
          className="..."
        >
          {move.name}
        </button>
      ))}
    </div>
  );
};