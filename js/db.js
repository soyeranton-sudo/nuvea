// Seul module qui parle à Supabase. Chaque fonction lève une erreur si la requête échoue.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const check = ({ data, error }) => {
  if (error) throw error;
  return data;
};

export const DEFAULT_GOALS = { kcal: 2000, protein: 100, carbs: 250, fat: 70 };

// --- Compte
export async function getSession() {
  return check(await sb.auth.getSession()).session;
}
export async function signIn(email, password) {
  return check(await sb.auth.signInWithPassword({ email, password }));
}
export async function signOut() {
  check(await sb.auth.signOut());
}
export function onAuthChange(cb) {
  sb.auth.onAuthStateChange((_event, session) => cb(session));
}

// --- Bibliothèque
const ITEM_FIELDS = ['name', 'kind', 'emoji', 'image_url', 'description', 'ingredients', 'portion',
  'kcal', 'protein', 'carbs', 'fat', 'meals', 'favorite'];
const pick = (obj, keys) => Object.fromEntries(keys.filter((k) => k in obj).map((k) => [k, obj[k]]));

export async function listItems() {
  return check(await sb.from('items').select('*').order('favorite', { ascending: false }).order('name'));
}
export async function saveItem(item) {
  const row = pick(item, ITEM_FIELDS);
  const q = item.id ? sb.from('items').update(row).eq('id', item.id) : sb.from('items').insert(row);
  return check(await q.select().single());
}
export async function insertItems(items) {
  // defaultToNull: false — en insertion groupée, un champ absent prend sa valeur par défaut au lieu de NULL.
  return check(await sb.from('items').insert(items.map((i) => pick(i, ITEM_FIELDS)), { defaultToNull: false }).select());
}
export async function deleteItem(id) {
  check(await sb.from('items').delete().eq('id', id));
}

// --- Journal
export async function listEntries(day) {
  return check(await sb.from('entries').select('*').eq('day', day).order('created_at'));
}
// Copie les valeurs de l'aliment dans l'entrée : l'historique ne bouge plus si l'aliment change.
export async function addEntry(day, meal, item, quantity = 1) {
  const row = {
    day, meal, quantity, item_id: item.id, name: item.name, portion: item.portion,
    kcal: item.kcal, protein: item.protein, carbs: item.carbs, fat: item.fat,
  };
  return check(await sb.from('entries').insert(row).select().single());
}
// Après modification d'un aliment : applique ses nouvelles valeurs au jour affiché seulement.
export async function syncEntries(day, item) {
  const { name, portion, kcal, protein, carbs, fat } = item;
  return check(await sb.from('entries').update({ name, portion, kcal, protein, carbs, fat })
    .eq('day', day).eq('item_id', item.id).select());
}
export async function setEntryQuantity(id, quantity) {
  return check(await sb.from('entries').update({ quantity }).eq('id', id).select().single());
}
export async function deleteEntry(id) {
  check(await sb.from('entries').delete().eq('id', id));
}

// --- Objectifs
export async function getGoals() {
  return check(await sb.from('goals').select('kcal, protein, carbs, fat').maybeSingle()) || { ...DEFAULT_GOALS };
}
export async function saveGoals(goals) {
  return check(await sb.from('goals').upsert(goals).select('kcal, protein, carbs, fat').single());
}

// --- Sauvegarde complète (export JSON)
export async function exportAll() {
  const [items, entries, goals] = await Promise.all([
    sb.from('items').select('*').then(check),
    sb.from('entries').select('*').order('day').then(check),
    sb.from('goals').select('*').then(check),
  ]);
  return { exported_at: new Date().toISOString(), items, entries, goals };
}
