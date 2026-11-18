// Calculs nutritionnels purs (aucun accès réseau ni DOM), testés dans tests/nutrition.test.mjs.

export const MACROS = ['kcal', 'protein', 'carbs', 'fat'];

export const MEALS = [
  { id: 'breakfast', label: 'Petit-déjeuner', emoji: '☀️' },
  { id: 'lunch', label: 'Déjeuner', emoji: '🥗' },
  { id: 'snack', label: 'Collation', emoji: '🍎' },
  { id: 'dinner', label: 'Dîner', emoji: '🌙' },
  { id: 'other', label: 'Snacks & autres', emoji: '🍫' },
];

const zero = () => ({ kcal: 0, protein: 0, carbs: 0, fat: 0 });

// Valeurs d'une entrée = valeurs par portion × nombre de portions consommées.
export function scaled(entry) {
  const q = Number(entry.quantity) || 0;
  const out = zero();
  for (const m of MACROS) out[m] = (Number(entry[m]) || 0) * q;
  return out;
}

export function total(entries) {
  const out = zero();
  for (const e of entries) {
    const s = scaled(e);
    for (const m of MACROS) out[m] += s[m];
  }
  return out;
}

export function totalByMeal(entries) {
  const out = Object.fromEntries(MEALS.map((m) => [m.id, zero()]));
  for (const e of entries) {
    const s = scaled(e);
    const bucket = out[e.meal] || (out[e.meal] = zero());
    for (const m of MACROS) bucket[m] += s[m];
  }
  return out;
}

// Part de l'objectif atteinte, de 0 à 1 (plafonnée pour l'affichage).
export function progress(value, goal) {
  if (!(goal > 0)) return 0;
  return Math.min(value / goal, 1);
}

export const round = (n) => Math.round(n);
export const round1 = (n) => Math.round(n * 10) / 10;

// Date locale au format AAAA-MM-JJ (toISOString donnerait la date UTC, fausse le soir en France).
export function isoDay(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number);
  return isoDay(new Date(y, m - 1, d + n));
}
