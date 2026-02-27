import { BattleArena } from './components/battle/BattleArena';
import { useBattleStore } from './store/useBattleStore';
import { useEffect } from 'react';

function App() {
  const initGame = useBattleStore((state) => state.initGame);

  useEffect(() => {
    initGame();
  }, [initGame]);

  return <BattleArena />;
}

export default App;