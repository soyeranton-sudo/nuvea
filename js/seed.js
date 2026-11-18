// Bibliothèque de départ : recettes de docs/recettes-semaine.md (prise de masse).
// Valeurs par portion, approximatives (tables usuelles, produits crus / secs).
// `recipe` : une étape par ligne. `ingredients` : « nom : quantité ».
const ing = (text) => text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
  const i = l.indexOf(':');
  return i < 0 ? { name: l, qty: '' } : { name: l.slice(0, i).trim(), qty: l.slice(i + 1).trim() };
});
const MAIN = ['lunch', 'dinner'];

export const OLD_SEED_NAMES = [
  'Yaourt nature', "Flocons d'avoine", 'Banane', 'Tartines beurrées', 'Œufs durs', 'Lait demi-écrémé',
  'Porridge banane', 'Poulet grillé', 'Riz basmati cuit', 'Pâtes cuites', 'Saumon', 'Salade verte vinaigrette',
  'Bowl poulet riz légumes', 'Pomme', 'Amandes', 'Fromage blanc', 'Chocolat noir', 'Soupe de légumes', 'Omelette',
  'Lentilles cuites', 'Légumes vapeur', 'Barre de céréales', "Jus d'orange", 'Chips',
];

export const SEED_ITEMS = [
  // ---------- Petit-déjeuner
  {
    emoji: '🥣', name: 'Bol fromage blanc, fruits rouges, avoine et beurre de cacahuète', kind: 'recipe',
    portion: '1 grand bol', kcal: 500, protein: 29, carbs: 45, fat: 21, meals: ['breakfast', 'snack'],
    description: 'Prêt en 3 minutes, sans cuisson.',
    ingredients: ing(`Fromage blanc 3 % : 250 g
Fruits rouges surgelés : 100 g
Flocons d'avoine : 40 g
Beurre de cacahuète : 20 g`),
    recipe: `Passer les fruits rouges 1 min au micro-ondes pour les décongeler (ou les sortir la veille).
Verser le fromage blanc dans un bol, ajouter les flocons d'avoine et mélanger.
Déposer les fruits rouges et leur jus par-dessus.
Finir avec le beurre de cacahuète en filet.`,
  },
  {
    emoji: '🍳', name: 'Omelette 3 œufs au cheddar et pain complet grillé', kind: 'recipe',
    portion: '1 assiette', kcal: 536, protein: 32, carbs: 31, fat: 30, meals: ['breakfast'],
    ingredients: ing(`Œufs : 3
Pain de mie complet : 2 tranches (70 g)
Cheddar râpé : 20 g
Huile ou beurre : 1 c.c.
Sel, poivre`),
    recipe: `Battre les œufs avec le sel et le poivre.
Faire chauffer l'huile ou le beurre à feu moyen et verser les œufs.
Quand le dessus est presque pris, parsemer le cheddar au milieu et plier l'omelette.
Griller le pain et servir à côté.`,
  },
  {
    emoji: '🫙', name: 'Overnight oats aux fruits rouges et beurre de cacahuète', kind: 'recipe',
    portion: '1 bocal', kcal: 620, protein: 27, carbs: 72, fat: 23, meals: ['breakfast'],
    description: 'À préparer la veille au soir.',
    ingredients: ing(`Flocons d'avoine : 70 g
Lait entier : 200 ml
Fromage blanc : 100 g
Fruits rouges surgelés : 80 g
Beurre de cacahuète : 15 g
Miel : 1 c.c. (10 g)`),
    recipe: `Le soir, mettre tous les ingrédients dans un bocal ou un bol fermé et bien mélanger.
Laisser toute la nuit au frigo.
Le matin, c'est prêt : les fruits ont décongelé, il suffit de mélanger.`,
  },

  // ---------- Déjeuner / dîner
  {
    emoji: '🥘', name: 'Hachis parmentier à la patate douce', kind: 'recipe',
    portion: '1 portion (lot de 3)', kcal: 704, protein: 56, carbs: 73, fat: 23, meals: MAIN,
    description: 'Lot de 3 portions, se garde 3 jours au frigo.',
    ingredients: ing(`Patate douce épluchée : 1 kg (≈ 1,2 kg brute)
Bœuf haché 5 % : 600 g
Oignon : 1 (100 g)
Concentré de tomate : 1 c.s. (20 g)
Lait : 100 ml
Beurre : 20 g
Mozzarella râpée : 90 g
Ail, paprika, sel, poivre`),
    recipe: `Cuire la patate douce en cubes 15 à 20 min dans l'eau salée, puis l'écraser avec le beurre et le lait.
Faire revenir l'oignon, ajouter le bœuf et l'émietter.
Ajouter le concentré de tomate, l'ail, le paprika, le sel et le poivre.
Dans un plat : la viande en bas, la purée dessus, puis la mozzarella.
Enfourner 20 min à 200 °C.`,
  },
  {
    emoji: '🌮', name: 'Tacos de poulet croustillants, sauce crémeuse et salsa', kind: 'recipe',
    portion: '2 tacos', kcal: 934, protein: 64, carbs: 70, fat: 43, meals: MAIN,
    description: 'Astuce : cuire tout le poulet du lot d’un coup, il se garde 3 jours.',
    ingredients: ing(`Blanc de poulet en petits cubes : 180 g
Grandes tortillas : 2 (120 g)
Mozzarella : 40 g
Huile : 2 c.c.
Paprika fumé, cumin, ail en poudre, citron vert, sel
Sauce : 30 g de fromage blanc + 15 g de mayo + sauce piquante
Salsa : 1 tomate + ¼ d'oignon rouge + citron vert`),
    recipe: `Mariner le poulet 15 min avec les épices, le citron vert et 1 c.c. d'huile.
Le cuire 8 à 10 min à la poêle.
Poser une tortilla dans la poêle huilée, mozzarella et poulet sur une moitié, plier et dorer des deux côtés.
Mélanger la sauce et couper la salsa, servir avec les tacos.`,
  },
  {
    emoji: '🍔', name: 'Burger de poulet croustillant au miel piquant', kind: 'recipe',
    portion: '1 burger', kcal: 713, protein: 47, carbs: 64, fat: 29, meals: MAIN,
    description: '2 burgers font un gros repas.',
    ingredients: ing(`Pain burger : 1
Blanc de poulet aplati : 120 g
Œuf : ½
Chapelure panko : 20 g
Farine : 8 g
Huile : 1 c.c.
Cheddar : 20 g
Mayo : 10 g + fromage blanc : 10 g
Miel : 1 c.c. + sauce piquante
Tomate, salade`),
    recipe: `Paner le poulet : farine, puis œuf battu (sel, paprika, ail), puis chapelure.
Le cuire dans un fond d'huile 4 à 5 min par face (ou 18 min au four à 200 °C).
Le badigeonner de miel et de sauce piquante, poser le cheddar pour qu'il fonde.
Monter le burger : pain, sauce mayo-fromage blanc, salade, tomate, poulet.`,
  },
  {
    emoji: '🍔', name: 'Burger de bœuf au cheddar fondu', kind: 'recipe',
    portion: '1 burger', kcal: 666, protein: 35, carbs: 43, fat: 38, meals: MAIN,
    ingredients: ing(`Pain burger : 1
Steak haché 15 % : 125 g
Cheddar : 20 g
Mayo : 10 g
Ketchup : 15 g
Tomate, salade, oignon`),
    recipe: `Toaster le pain coupé en deux à la poêle, face coupée contre le fond.
Saler le steak et le cuire 3 min par face à feu vif.
Poser le cheddar dessus la dernière minute, couvrir pour qu'il fonde.
Tartiner le pain de mayo et de ketchup, puis salade, tomate, oignon et steak.`,
  },
  {
    emoji: '🍝', name: 'Penne crème-fromage et tenders de poulet', kind: 'recipe',
    portion: '1 assiette', kcal: 988, protein: 47, carbs: 103, fat: 42, meals: MAIN,
    ingredients: ing(`Penne (sec) : 110 g
Crème légère 15 % : 80 g
Lait : 50 ml
Mozzarella : 25 g
Cheddar : 25 g
Tenders surgelés : 120 g (≈ 4)
Ail, poivre`),
    recipe: `Cuire les tenders au four ou à l'air fryer selon le paquet.
Cuire les penne al dente.
Pendant ce temps, chauffer la crème, le lait et l'ail, puis faire fondre les fromages à feu doux.
Mélanger les pâtes à la sauce et poser les tenders coupés par-dessus.`,
  },
  {
    emoji: '🍲', name: 'Coquillettes au poulet, crème et fromage', kind: 'recipe',
    portion: '1 assiette', kcal: 904, protein: 62, carbs: 96, fat: 29, meals: MAIN,
    ingredients: ing(`Coquillettes (sec) : 130 g
Blanc de poulet en dés : 150 g
Crème 15 % : 60 g
Mozzarella : 20 g
Cheddar : 20 g
Huile : 1 c.c.
Paprika, ail`),
    recipe: `Cuire les coquillettes dans l'eau salée.
Dorer le poulet dans l'huile avec le paprika et l'ail.
Ajouter la crème et les fromages, laisser fondre 2 min à feu doux.
Mélanger avec les coquillettes égouttées.`,
  },
  {
    emoji: '🍝', name: 'Pâtes à la bolognaise de bœuf', kind: 'recipe',
    portion: '1 assiette', kcal: 846, protein: 56, carbs: 107, fat: 21, meals: MAIN,
    ingredients: ing(`Pâtes (sec) : 130 g
Bœuf haché 5 % : 150 g
Passata : 150 g
Oignon : ½
Cheddar : 20 g
Huile : 1 c.c.
Ail, herbes de Provence`),
    recipe: `Faire revenir l'oignon dans l'huile, puis ajouter le bœuf et l'émietter.
Verser la passata avec l'ail et les herbes, laisser mijoter 10 min à feu doux.
Cuire les pâtes pendant ce temps.
Servir la sauce sur les pâtes avec le cheddar.`,
  },
  {
    emoji: '🍛', name: 'Poulet à la crème moutarde, riz et lentilles corail', kind: 'recipe',
    portion: '1 assiette', kcal: 768, protein: 57, carbs: 90, fat: 18, meals: MAIN,
    description: 'Le riz et les lentilles cuisent ensemble dans la même casserole.',
    ingredients: ing(`Blanc de poulet : 170 g
Riz (sec) : 80 g
Lentilles corail (sec) : 40 g
Crème 15 % : 60 g
Oignon : ½
Moutarde : 1 c.c.
Huile : 1 c.c.`),
    recipe: `Cuire le riz et les lentilles corail ensemble, environ 15 min dans 2,5 volumes d'eau.
Dorer le poulet en dés avec l'oignon dans l'huile.
Ajouter la crème et la moutarde, laisser 5 min à feu doux.
Servir sur le riz et les lentilles.`,
  },

  // ---------- Collation
  {
    emoji: '🥤', name: 'Gainer maison banane, avoine et fruits rouges', kind: 'recipe',
    portion: '1 grand shaker', kcal: 850, protein: 30, carbs: 102, fat: 34, meals: ['snack'],
    description: 'Créatine : 3 à 5 g tous les jours, à boire dans la foulée.',
    ingredients: ing(`Lait entier : 400 ml
Flocons d'avoine : 60 g
Banane : 1
Beurre de cacahuète : 30 g
Fruits rouges surgelés : 80 g
Miel : 1 c.s. (15 g)
Créatine : 3 à 5 g`),
    recipe: `Mettre tous les ingrédients dans le blender, la banane coupée en morceaux.
Mixer 30 à 45 secondes jusqu'à ce que ce soit bien lisse.
Ajouter la créatine, mixer encore 5 secondes et boire tout de suite.`,
  },
  {
    emoji: '🥤', name: 'Gainer maison à la whey', kind: 'recipe',
    portion: '1 grand shaker', kcal: 964, protein: 53, carbs: 104, fat: 35, meals: ['snack'],
    description: 'La même recette avec 30 g de whey en plus.',
    ingredients: ing(`Lait entier : 400 ml
Flocons d'avoine : 60 g
Banane : 1
Beurre de cacahuète : 30 g
Fruits rouges surgelés : 80 g
Miel : 1 c.s. (15 g)
Whey : 30 g
Créatine : 3 à 5 g`),
    recipe: `Mettre tous les ingrédients sauf la whey dans le blender, la banane coupée en morceaux.
Mixer 30 à 45 secondes jusqu'à ce que ce soit bien lisse.
Ajouter la whey et la créatine, mixer encore 5 à 10 secondes et boire tout de suite.`,
  },
];
