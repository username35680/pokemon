import { useState, useEffect, useMemo } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { useBattleStore } from '../../store/useBattleStore';
import { Player } from '../Player';
import map from '../../assets/tileset.png'; 

// Configuration
const TILE_SIZE = 48;
const VIEWPORT_SIZE = 10; // Affiche 10x10 cases

const BIG_MAP = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,2],
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
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
const MOVEMENT_DURATION = 200; // ms pour traverser une case

const TILE_MAP: Record<number, { x: number; y: number }> = {
  0: { x: 0, y: 0 }, // Herbe courte (index 0 dans ton BIG_MAP)
  1: { x: 11, y: 7 }, // Hautes herbes (index 1)
  2: { x: 8, y: 5 }, // Mur / Rocher (index 2)
};

const getTilePos = (indexX: number, indexY: number) => {
  const columns = 16; 
  const rows = 16;
  return `${(indexX / (columns - 1)) * 100}% ${(indexY / (rows - 1)) * 100}%`;
};

export const Overworld = () => {
  const [pos, setPos] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('down'); // Nouvelle state
  const [isMoving, setIsMoving] = useState(false);
  const { setGameState } = useGameStore();
  const { initGame } = useBattleStore();

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
    let newDir = direction;

    if (e.key === 'ArrowUp') { nextY--; newDir = 'up'; }
    else if (e.key === 'ArrowDown') { nextY++; newDir = 'down'; }
    else if (e.key === 'ArrowLeft') { nextX--; newDir = 'left'; }
    else if (e.key === 'ArrowRight') { nextX++; newDir = 'right'; }
    else return;

    setDirection(newDir); // On tourne même si on est bloqué

    const tile = BIG_MAP[nextY]?.[nextX];
    if (tile === undefined || tile === 2) return;

    setIsMoving(true);
    setPos({ x: nextX, y: nextY });

    if (tile === 1 && Math.random() < 0.1) {
       setTimeout(() => {
         initGame();
         setGameState('battle');
       }, MOVEMENT_DURATION);
    }

    setTimeout(() => setIsMoving(false), MOVEMENT_DURATION);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pos, isMoving, direction]); // Ajout de direction ici

  return (
    <div className="flex justify-center items-center h-screen bg-emerald-900">
      <div 
        className="relative overflow-hidden bg-emerald-800 border-4 border-emerald-950"
        style={{ width: VIEWPORT_SIZE * TILE_SIZE, height: VIEWPORT_SIZE * TILE_SIZE }}
      >
        <div 
          className="absolute transition-transform ease-linear"
          style={{ 
            transitionDuration: `${MOVEMENT_DURATION}ms`,
            transform: `translate3d(${-cameraX * TILE_SIZE}px, ${-cameraY * TILE_SIZE}px, 0)`,
            display: 'grid',
            gridTemplateColumns: `repeat(${BIG_MAP[0].length}, ${TILE_SIZE}px)`
          }}
        >
         {BIG_MAP.map((row, y) => row.map((tile, x) => {
            const isPlayerOnThisTile = pos.x === x && pos.y === y;
            const isHighGrass = tile === 1;

            return (
              <div 
                key={`${x}-${y}`} 
                className={isHighGrass && isPlayerOnThisTile ? 'high-grass-anim' : ''}
                style={{
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  backgroundImage: `url(${map})`,
                  backgroundSize: '1600%', 
                  backgroundPosition: getTilePos(TILE_MAP[tile].x, TILE_MAP[tile].y),
                  imageRendering: 'pixelated',
                }}
              />
            );
          }))}

          {/* 2. LE JOUEUR (Modifié ici) */}
          <div
            className="absolute transition-all ease-linear"
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              transform: `translate3d(${pos.x * TILE_SIZE}px, ${pos.y * TILE_SIZE}px, 0)`,
              transitionDuration: `${MOVEMENT_DURATION}ms`,
              zIndex: 10, // On s'assure qu'il est au dessus de la grille
            }}
          >
            <Player 
              direction={direction} 
              isMoving={isMoving} 
              isHighGrass={BIG_MAP[pos.y][pos.x] === 1} // <-- L'OUBLI ÉTAIT ICI !
            />
          </div>
        </div>
      </div>
    </div>
  );
};