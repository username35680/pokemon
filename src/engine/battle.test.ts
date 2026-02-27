import { describe, it, expect } from 'vitest';
import { calculateDamage } from './damageCalculator';
import { POKEMONS } from '../data/pokemons';
import { MOVES } from '../data/moves';

describe('Logique de combat', () => {
  it('devrait infliger des dégâts et réduire les PV du défenseur', () => {
    // Setup : On clone les objets pour ne pas muter les données originales (immutabilité)
    const attacker = { ...POKEMONS.PIKACHU };
    const defender = { ...POKEMONS.BULBIZARRE };
    const move = MOVES.THUNDERBOLT;

    // Action : Calcul des dégâts
    const damage = calculateDamage(attacker, defender, move);

    // Assertions (Vérifications)
    expect(damage).toBeGreaterThan(0); // On doit infliger au moins un minimum
    
    const newHp = defender.currentHp - damage;
    expect(newHp).toBeLessThan(defender.currentHp); // Les PV doivent avoir baissé
    expect(newHp).toBeGreaterThanOrEqual(0); // Pas de PV négatifs
  });

  it('devrait infliger plus de dégâts avec un avantage de type (super efficace)', () => {
    const attacker = { ...POKEMONS.PIKACHU };
    const defender = { ...POKEMONS.CARAPUCE };
    
    const damage = calculateDamage(attacker, defender, MOVES.THUNDERBOLT);
    
    // Le tonnerre (Électrique) est super efficace contre l'Eau (x2)
    // On vérifie que les dégâts sont bien supérieurs à une attaque neutre
    expect(damage).toBeGreaterThan(50); 
  });
});