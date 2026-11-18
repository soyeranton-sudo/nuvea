// Lancer : node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { scaled, total, totalByMeal, progress, isoDay, addDays, parseSteps } from '../js/nutrition.js';

const recipe = { meal: 'lunch', quantity: 1, kcal: 400, protein: 30, carbs: 40, fat: 12 };

test('une demi-portion divise toutes les valeurs par deux', () => {
  assert.deepEqual(scaled({ ...recipe, quantity: 0.5 }), { kcal: 200, protein: 15, carbs: 20, fat: 6 });
});

test('le total additionne les entrées de tous les repas', () => {
  const entries = [recipe, { meal: 'breakfast', quantity: 2, kcal: 100, protein: 5, carbs: 10, fat: 3 }];
  assert.deepEqual(total(entries), { kcal: 600, protein: 40, carbs: 60, fat: 18 });
});

test('totalByMeal répartit par repas et garde les repas vides à zéro', () => {
  const byMeal = totalByMeal([recipe]);
  assert.equal(byMeal.lunch.kcal, 400);
  assert.equal(byMeal.dinner.kcal, 0);
});

test('valeurs manquantes ou invalides comptent pour zéro', () => {
  assert.deepEqual(scaled({ quantity: 'x', kcal: null }), { kcal: 0, protein: 0, carbs: 0, fat: 0 });
});

test('progress est plafonné à 1 et sûr si objectif nul', () => {
  assert.equal(progress(3000, 2000), 1);
  assert.equal(progress(500, 2000), 0.25);
  assert.equal(progress(500, 0), 0);
});

test('dates locales et changement de mois', () => {
  assert.equal(isoDay(new Date(2026, 0, 5, 23, 30)), '2026-01-05');
  assert.equal(addDays('2026-02-28', 1), '2026-03-01');
  assert.equal(addDays('2026-03-01', -1), '2026-02-28');
});

test('parseSteps retire numéros et puces, ignore les lignes vides', () => {
  assert.deepEqual(parseSteps('1. Cuire les pâtes\n\n2) Égoutter\n- Servir chaud\nGoûter'),['Cuire les pâtes', 'Égoutter', 'Servir chaud', 'Goûter']);
  assert.deepEqual(parseSteps(null), []);
});
