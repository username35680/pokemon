export const PokemonSprite = ({ id, name, isEnemy }: { id: number; name: string; isEnemy: boolean }) => {
  const getSpriteUrl = (pokemonId: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`;
  };

  // On définit le zoom souhaité
  const zoomFactor = 2.5; 

  // On crée la chaîne de transformation : 
  // Si c'est le joueur, on fait un scaleX(-1) + le zoom.
  // Si c'est l'ennemi, on fait juste le zoom.
  const transformValue = !isEnemy ? `scaleX(-1) scale(${zoomFactor})` : `scale(${zoomFactor})`;

  return (
    <div className={`relative ${isEnemy ? 'w-48 h-48' : 'w-64 h-64'} flex items-center justify-center overflow-visible`}>
      <img
        src={getSpriteUrl(id)}
        alt={name}
        // On supprime les classes "scale-[2]" et "scale-x-[-1]" ici
        className="max-h-full max-w-full object-contain pixelated"
        style={{ 
          imageRendering: 'pixelated',
          transform: transformValue // On applique la fusion ici
        }}
        onError={(e) => { e.currentTarget.src = '/fallback-sprite.png'; }}
      />
    </div>
  );
};