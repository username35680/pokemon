import { useState, useEffect, useMemo } from 'react';
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
const MOVEMENT_DURATION = 200; // ms pour traverser une case

export const Overworld = () => {
  // On ne garde qu'une seule source de vérité pour la position (en cases)
  const [pos, setPos] = useState({ x: 5, y: 5 });
  const [isMoving, setIsMoving] = useState(false);
  const { setGameState } = useGameStore();
  const { initGame } = useBattleStore();

  // Calcul du décalage de la caméra
  const cameraX = useMemo(() => 
    Math.max(0, Math.min(pos.x - VIEWPORT_SIZE / 2, BIG_MAP[0].length - VIEWPORT_SIZE)), 
  [pos.x]);
  
  const cameraY = useMemo(() => 
    Math.max(0, Math.min(pos.y - VIEWPORT_SIZE / 2, BIG_MAP.length - VIEWPORT_SIZE)), 
  [pos.y]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isMoving) return;

    let nextX = pos.x;
    let nextY = pos.y;

    if (e.key === 'ArrowUp') nextY--;
    else if (e.key === 'ArrowDown') nextY++;
    else if (e.key === 'ArrowLeft') nextX--;
    else if (e.key === 'ArrowRight') nextX++;
    else return;

    // Collision & Limites
    const tile = BIG_MAP[nextY]?.[nextX];
    if (tile === undefined || tile === 2) return;

    // Logique de mouvement
    setIsMoving(true);
    setPos({ x: nextX, y: nextY });

    // Combat
    if (tile === 1 && Math.random() < 0.1) {
       setTimeout(() => { // Attendre la fin du mouvement visuel
         initGame();
         setGameState('battle');
       }, MOVEMENT_DURATION);
    }

    // Débloquer le mouvement après la transition
    setTimeout(() => setIsMoving(false), MOVEMENT_DURATION);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pos, isMoving]);

  return (
    <div className="flex justify-center items-center h-screen bg-emerald-900">
      {/* Fenêtre de vue (Viewport) */}
      <div 
        className="relative overflow-hidden bg-emerald-800 border-4 border-emerald-950"
        style={{ width: VIEWPORT_SIZE * TILE_SIZE, height: VIEWPORT_SIZE * TILE_SIZE }}
      >
        {/* Le Monde (Grille) */}
        <div 
          className="absolute transition-transform ease-linear"
          style={{ 
            // Correction ici : 'duration' devient 'transitionDuration'
            transitionDuration: `${MOVEMENT_DURATION}ms`,
            transform: `translate3d(${-cameraX * TILE_SIZE}px, ${-cameraY * TILE_SIZE}px, 0)`,
            display: 'grid',
            gridTemplateColumns: `repeat(${BIG_MAP[0].length}, ${TILE_SIZE}px)`
          }}
        >
          {BIG_MAP.map((row, y) => row.map((tile, x) => (
            <div 
              key={`${x}-${y}`} 
              className={`w-12 h-12 ${tile === 2 ? 'bg-stone-800' : tile === 1 ? 'bg-emerald-400' : 'bg-emerald-600'}`} 
            />
          )))}

          {/* Le Joueur (Positionné absolument par rapport au MONDE) */}
          <div
            className="absolute flex items-center justify-center text-2xl transition-all ease-linear"
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              transform: `translate3d(${pos.x * TILE_SIZE}px, ${pos.y * TILE_SIZE}px, 0)`,
              transitionDuration: `${MOVEMENT_DURATION}ms`
            }}
          >
            👤
          </div>
        </div>
      </div>
    </div>
  );
};