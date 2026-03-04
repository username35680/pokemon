import { useState, useEffect} from 'react';
import trainer from '../assets/trainer.png'; 
export const Player = ({ direction, isMoving }: { direction: string, isMoving: boolean }) => {
  const [frame, setFrame] = useState(0);

  // Gérer l'animation de marche (0, 1, 2, 3)
  useEffect(() => {
    if (!isMoving) {
      setFrame(0); // Revient à la frame de repos
      return;
    }

    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, 120); // Vitesse des pas

    return () => clearInterval(interval);
  }, [isMoving]);

  // Mapping des directions vers les lignes du sprite sheet
  const rowMap: Record<string, number> = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  };

  // Taille d'une frame dans ton image d'origine (probablement 32x32 ou 64x64)
  // On utilise des % pour que ça s'adapte à n'importe quelle résolution d'image
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${trainer})`, // Assure-toi que le fichier est dans /public
        backgroundSize: '400% 400%', // Car c'est une grille 4x4
        backgroundPosition: `${(frame * 100) / 3}% ${(rowMap[direction] * 100) / 3}%`,
        imageRendering: 'pixelated',
      }}
    />
  );
};