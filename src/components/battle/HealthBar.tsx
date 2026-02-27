import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useBattleStore } from '../../store/useBattleStore';

export const HealthBar = ({ isPlayer }: { isPlayer: boolean }) => {
  const pokemon = useBattleStore((state) => (isPlayer ? state.player : state.opponent));
  const controls = useAnimation();

  useEffect(() => {
    if (pokemon?.currentHp !== undefined) {
      controls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4 }
      });
    }
  }, [pokemon?.currentHp, controls]);

  if (!pokemon || !pokemon.stats) {
    return <div className="w-full bg-gray-800 h-4 rounded animate-pulse" />;
  }
  
  const hpPercentage = (pokemon.currentHp / pokemon.stats.hp) * 100;

  return (
    <motion.div 
      className="w-full"
      animate={controls}
    >
      {/* --- AJOUT DU NOM ET DES HP --- */}
      <div className="flex justify-between items-end mb-1 px-1">
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {pokemon.name}
        </span>
        <span className="text-xs font-mono text-gray-300">
          {pokemon.currentHp} / {pokemon.stats.hp}
        </span>
      </div>
      {/* ------------------------------- */}

      <div className="bg-gray-800 h-4 rounded overflow-hidden border border-gray-600">
        <motion.div 
          className={`h-full ${hpPercentage > 50 ? 'bg-green-500' : 'bg-red-500'}`}
          initial={false}
          animate={{ width: `${hpPercentage}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
      </div>
    </motion.div>
  );
};