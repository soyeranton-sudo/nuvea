// Bibliothèque de départ, proposée quand la bibliothèque est vide. Valeurs approximatives
// (tables nutritionnelles usuelles, par portion indiquée) : à ajuster à tes produits réels.
const f = (emoji, name, portion, kcal, protein, carbs, fat, meals, extra = {}) =>
  ({ emoji, name, portion, kcal, protein, carbs, fat, meals, kind: 'food', ...extra });
const r = (emoji, name, portion, kcal, protein, carbs, fat, meals, ingredients) =>
  ({ emoji, name, portion, kcal, protein, carbs, fat, meals, kind: 'recipe', ingredients });

export const SEED_ITEMS = [
  // Petit-déjeuner
  f('🥛', 'Yaourt nature', '1 pot (125 g)', 80, 4.5, 6, 4, ['breakfast', 'snack', 'dinner']),
  f('🌾', "Flocons d'avoine", '40 g', 150, 5.4, 24, 2.8, ['breakfast']),
  f('🍌', 'Banane', '1 moyenne', 105, 1.3, 27, 0.4, ['breakfast', 'snack']),
  f('🍞', 'Tartines beurrées', '2 tranches + 10 g beurre', 225, 5, 30, 9, ['breakfast']),
  f('🥚', 'Œufs durs', '2 œufs', 155, 13, 1, 11, ['breakfast', 'dinner']),
  f('🥛', 'Lait demi-écrémé', '250 ml', 115, 8, 12, 4, ['breakfast']),
  r('🥣', 'Porridge banane', '1 bol', 295, 12, 47, 6.5, ['breakfast'], [
    { name: "Flocons d'avoine", qty: '40 g' }, { name: 'Lait demi-écrémé', qty: '200 ml' }, { name: 'Banane', qty: '½' },
  ]),
  // Déjeuner
  f('🍗', 'Poulet grillé', '150 g', 248, 46, 0, 5.4, ['lunch', 'dinner']),
  f('🍚', 'Riz basmati cuit', '150 g', 195, 4, 43, 0.5, ['lunch', 'dinner']),
  f('🍝', 'Pâtes cuites', '200 g', 300, 11, 60, 2, ['lunch', 'dinner']),
  f('🐟', 'Saumon', '130 g', 270, 26, 0, 18, ['lunch', 'dinner']),
  f('🥬', 'Salade verte vinaigrette', '1 assiette', 80, 1, 2, 8, ['lunch', 'dinner']),
  r('🥗', 'Bowl poulet riz légumes', '1 bol', 520, 40, 60, 12, ['lunch'], [
    { name: 'Poulet', qty: '120 g' }, { name: 'Riz cuit', qty: '150 g' }, { name: 'Légumes', qty: '150 g' }, { name: "Huile d'olive", qty: '1 c. à café' },
  ]),
  // Collation
  f('🍎', 'Pomme', '1 moyenne', 80, 0.4, 19, 0.3, ['snack']),
  f('🌰', 'Amandes', '30 g', 175, 6, 2.6, 15, ['snack']),
  f('🥄', 'Fromage blanc', '100 g', 75, 7.5, 4, 3, ['snack', 'dinner']),
  f('🍫', 'Chocolat noir', '20 g', 110, 1.8, 7, 8.5, ['snack', 'other']),
  // Dîner
  f('🍲', 'Soupe de légumes', '300 ml', 90, 3, 14, 2, ['dinner']),
  f('🍳', 'Omelette', '3 œufs', 230, 19, 1, 17, ['dinner']),
  f('🥘', 'Lentilles cuites', '200 g', 230, 18, 33, 1, ['lunch', 'dinner']),
  f('🥦', 'Légumes vapeur', '200 g', 60, 3, 9, 0.5, ['lunch', 'dinner']),
  // Snacks & autres
  f('🥨', 'Barre de céréales', '1 barre (25 g)', 100, 1.5, 17, 3, ['other', 'snack']),
  f('🍊', "Jus d'orange", '200 ml', 90, 1.4, 20, 0.4, ['other', 'breakfast']),
  f('🥔', 'Chips', '30 g', 160, 2, 15, 10, ['other']),
];
