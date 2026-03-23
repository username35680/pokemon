import { useState, useEffect } from 'react';
import trainer from '../assets/trainer.png'; 

interface PlayerProps {
  direction: string;
  isMoving: boolean;
  isHighGrass?: boolean; // Optionnel : vrai si le joueur est dans l'herbe
}

export const Player = ({ direction, isMoving, isHighGrass = false }: PlayerProps) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isMoving) {
      setFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, 120);

    return () => clearInterval(interval);
  }, [isMoving]);

  const rowMap: Record<string, number> = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${trainer})`,
        backgroundSize: '400% 400%',
        backgroundPosition: `${(frame * 100) / 3}% ${(rowMap[direction] * 100) / 3}%`,
        imageRendering: 'pixelated',
        // Si isHighGrass est vrai, on coupe les 15% du bas du sprite (les pieds)
        clipPath: isHighGrass ? 'inset(0% 0% 15% 0%)' : 'none',
        transition: 'clip-path 0.2s ease' // Transition douce pour l'immersion
      }}
    />
  );
};