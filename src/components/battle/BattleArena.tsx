import { HealthBar } from './HealthBar';
import { ActionMenu } from './ActionMenu';
import { GameOverOverlay } from './GameOverOverlay';
import { PokemonSprite } from './PokemonSprite';
import { useBattleStore } from '../../store/useBattleStore';
import { BattleBackground } from './BattleBackground'; // Import

export const BattleArena = () => {
  const { player, opponent } = useBattleStore();

  return (
    // Parent : Force le centrage et prend toute la place
    <div className="flex items-center justify-center min-h-screen bg-black">
      
      {/* CONTENEUR DE JEU :
         - w-full : prend toute la largeur dispo
         - max-w-[800px] : limite la taille sur PC
         - aspect-[4/3] : maintient le format "Game Boy"
         - min-h-[400px] : ON FORCE UNE HAUTEUR MINIMALE (pour voir si ça débloque)
      */}
      <div className="relative w-full max-w-[800px] aspect-[4/3] min-h-[600px] bg-slate-800 border-4 border-black overflow-hidden">
        
        {/* LE FOND */}
        <div className="absolute inset-0">
          <BattleBackground row={1} col={0} />
        </div>

        {/* --- ZONE ENNEMI --- */}
        <div className="absolute top-[15%] right-[10%] z-10">
          {opponent && (
             <div className="flex flex-col items-center">
               <HealthBar isPlayer={false} />
               <PokemonSprite name={opponent.name} id={opponent.id} isEnemy={true} />
             </div>
          )}
        </div>
          <GameOverOverlay />
        {/* --- ZONE JOUEUR --- */}
        <div className="absolute bottom-[5%] left-[14%] z-10">
          {player && (
             <div className="flex flex-col items-center">
                <HealthBar isPlayer={true} />
               <PokemonSprite name={player.name} id={player.id} isEnemy={false} />
             </div>
          )}
        </div>

        {/* --- MENU D'ACTION --- */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <ActionMenu />
        </div>

      </div>
    </div>
  );
};