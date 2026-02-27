import { useState, useEffect,useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { useBattleStore } from '../../store/useBattleStore';

// Configuration
const TILE_SIZE = 48;
const VIEWPORT_SIZE = 10; // Affiche 10x10 cases

const BIG_MAP = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

export const Overworld = () => {
  const [pos, setPos] = useState({ x: 5, y: 5 });
  const { setGameState } = useGameStore();
  const { initGame } = useBattleStore();
  const pressedKeys = useRef<Set<string>>(new Set());
  const MOVEMENT_SPEED = 250;

  // 1. Calculs constants (ne changent pas la logique de mouvement)
  const viewStartX = Math.max(0, Math.min(pos.x - Math.floor(VIEWPORT_SIZE / 2), BIG_MAP[0].length - VIEWPORT_SIZE));
  const viewStartY = Math.max(0, Math.min(pos.y - Math.floor(VIEWPORT_SIZE / 2), BIG_MAP.length - VIEWPORT_SIZE));

  // 2. On utilise une fonction de mise à jour "fonctionnelle" (prevPos)
  // Cela permet de ne jamais avoir besoin de lire 'pos' directement dans la fonction
  const handleKeyDown = (e: KeyboardEvent) => {
    setPos((prev) => {
      let { x, y } = prev;
      if (e.key === 'ArrowUp') y -= 1;
      if (e.key === 'ArrowDown') y += 1;
      if (e.key === 'ArrowLeft') x -= 1;
      if (e.key === 'ArrowRight') x += 1;

      // Vérification des collisions
      if (BIG_MAP[y]?.[x] !== undefined && BIG_MAP[y][x] !== 2) {
        // Déclenchement combat (attention : on garde la logique de probabilité)
        if (BIG_MAP[y][x] === 1 && Math.random() < 0.2) {
          initGame();
          setGameState('battle');
        }
        return { x, y }; // On met à jour la position
      }
      return prev; // On ne change rien
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => pressedKeys.current.add(e.key);
    const handleKeyUp = (e: KeyboardEvent) => pressedKeys.current.delete(e.key);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Boucle de jeu (Game Loop)
    const interval = setInterval(() => {
      // Si aucune touche n'est pressée, on ne fait rien
      if (pressedKeys.current.size === 0) return;

      setPos((prev) => {
        let { x, y } = prev;
        // On ne gère qu'une seule direction par cycle pour éviter les diagonales bizarres
        if (pressedKeys.current.has('ArrowUp')) y -= 1;
        else if (pressedKeys.current.has('ArrowDown')) y += 1;
        else if (pressedKeys.current.has('ArrowLeft')) x -= 1;
        else if (pressedKeys.current.has('ArrowRight')) x += 1;

        // Vérification collision
        if (BIG_MAP[y]?.[x] !== undefined && BIG_MAP[y][x] !== 2) {
          // Si herbe, chance de combat
          if (BIG_MAP[y][x] === 1 && Math.random() < 0.2) {
            initGame();
            setGameState('battle');
          }
          return { x, y };
        }
        return prev;
      });
    }, MOVEMENT_SPEED); 

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(interval);
    };
  }, []);

  // 3. Le listener est lié une seule fois au montage du composant
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // <-- Dépendance vide : ne se déclenche qu'une fois

    return (
        <div className="flex justify-center items-center h-screen bg-emerald-900">
        <div 
            className="relative border-4 border-emerald-950 shadow-2xl overflow-hidden"
            style={{ width: `${VIEWPORT_SIZE * TILE_SIZE}px`, height: `${VIEWPORT_SIZE * TILE_SIZE}px` }}
        >
            {/* 2. SYNCHRONISATION : La transition doit durer exactement le même temps que le setInterval */}
            <div 
            className="grid transition-all ease-linear"
            style={{ 
                transitionDuration: `${MOVEMENT_SPEED}ms`, // <- SYNC PARFAITE
                transform: `translate(${-viewStartX * TILE_SIZE}px, ${-viewStartY * TILE_SIZE}px)`,
                gridTemplateColumns: `repeat(${BIG_MAP[0].length}, ${TILE_SIZE}px)` 
            }}
            >
            {BIG_MAP.map((row, y) =>
                row.map((tile, x) => (
                <div key={`${x}-${y}`} className={`w-12 h-12 ${
                    tile === 2 ? 'bg-stone-800' : tile === 1 ? 'bg-emerald-400' : 'bg-emerald-600'
                }`}>
                    {pos.x === x && pos.y === y && "👤"}
                </div>
                ))
            )}
            </div>
        </div>
        </div>
    );
};