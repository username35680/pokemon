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
  const [tilePos, setTilePos] = useState({ x: 5, y: 5 });
  const [pixelPos, setPixelPos] = useState({
    x: 5 * TILE_SIZE,
    y: 5 * TILE_SIZE
  });

  const targetRef = useRef(pixelPos);
  const movingRef = useRef(false);
  const pressedKeys = useRef<Set<string>>(new Set());
  const MOVEMENT_SPEED = 250;

  const playerTileX = pixelPos.x / TILE_SIZE;
  const playerTileY = pixelPos.y / TILE_SIZE;

  const viewStartX = Math.max(
    0,
    Math.min(
      Math.floor(playerTileX - VIEWPORT_SIZE / 2),
      BIG_MAP[0].length - VIEWPORT_SIZE
    )
  );

  const viewStartY = Math.max(
    0,
    Math.min(
      Math.floor(playerTileY - VIEWPORT_SIZE / 2),
      BIG_MAP.length - VIEWPORT_SIZE
    )
  );

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
        if (BIG_MAP[y][x] === 1 && Math.random() < 0.1) {
          initGame();
          setGameState('battle');
        }
        return { x, y }; // On met à jour la position
      }
      return prev; // On ne change rien
    });
  };

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (movingRef.current) return;

    let { x, y } = tilePos;

    if (e.key === "ArrowUp") y--;
    if (e.key === "ArrowDown") y++;
    if (e.key === "ArrowLeft") x--;
    if (e.key === "ArrowRight") x++;

    if (BIG_MAP[y]?.[x] === undefined) return;
    if (BIG_MAP[y][x] === 2) return;

    // combat
    if (BIG_MAP[y][x] === 1 && Math.random() < 0.2) {
      initGame();
      setGameState("battle");
    }

    movingRef.current = true;

    targetRef.current = {
      x: x * TILE_SIZE,
      y: y * TILE_SIZE
    };

    setTilePos({ x, y });
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [tilePos]);
useEffect(() => {
  let raf: number;

  const SPEED = 4; // pixels par frame

  const loop = () => {
    setPixelPos(prev => {
      const dx = targetRef.current.x - prev.x;
      const dy = targetRef.current.y - prev.y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < SPEED) {
        movingRef.current = false;
        return targetRef.current;
      }

      return {
        x: prev.x + (dx / dist) * SPEED,
        y: prev.y + (dy / dist) * SPEED
      };
    });

    raf = requestAnimationFrame(loop);
  };

  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
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
                    <div
                      style={{
                        position: "absolute",
                        left: pixelPos.x,
                        top: pixelPos.y,
                        width: TILE_SIZE,
                        height: TILE_SIZE
                      }}
                    >
                      👤
                    </div>
                </div>
                ))
            )}
            </div>
        </div>
        </div>
    );
};