import backgroundImage from './background.png'; 

export const BattleBackground = ({ row, col }: { row: number; col: number }) => {
  // 1. COMPTE TES LIGNES ET COLONNES
  // Regarde ton image : combien y a-t-il de colonnes (horizontales) et de lignes (verticales) ?
  const totalCols = 8; 
  const totalRows = 8; 

  return (
    <div 
      className="absolute inset-0 w-full h-full pixelated"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        
        // 2. ZOOM : On multiplie la taille par le nombre de colonnes/lignes
        // Si totalCols = 8, ça agrandit l'image à 800%
        backgroundSize: `${totalCols * 100}% ${totalRows * 100}%`,
        
        // 3. POSITION : On décale l'image en pourcentage
        // On divise 100% par (nombre d'éléments - 1) pour sauter de case en case
        backgroundPosition: `${(col * 100) / (totalCols - 1)}% ${(row * 100) / (totalRows - 1)}%`,
        
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
};