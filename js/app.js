// Interface : état local + rendu. Les calculs sont dans nutrition.js, l'accès aux données dans db.js.
import * as db from './db.js';
import { MEALS, total, totalByMeal, progress, round, round1, isoDay, addDays } from './nutrition.js';
import { SEED_ITEMS } from './seed.js';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const state = {
  day: isoDay(new Date()),
  meal: mealForNow(),
  items: [],
  entries: [],
  goals: { ...db.DEFAULT_GOALS },
};

function mealForNow() {
  const h = new Date().getHours();
  if (h < 11) return 'breakfast';
  if (h < 15) return 'lunch';
  if (h < 18) return 'snack';
  return 'dinner';
}

// ---------- Messages
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}
function fail(err) {
  console.error(err);
  // Le détail technique aide à diagnostiquer (ex. « null value in column … »).
  toast(navigator.onLine ? `La sauvegarde a échoué : ${err?.message || 'erreur inconnue'}` : 'Pas de connexion internet.');
}

// ---------- Connexion
async function showLogin() {
  $('#app').hidden = true;
  $('#login').hidden = false;
}

$('#login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const btn = e.target.querySelector('button');
  btn.disabled = true;
  $('#login-error').textContent = '';
  try {
    await db.signIn(form.get('email'), form.get('password'));
  } catch {
    $('#login-error').textContent = 'E-mail ou mot de passe incorrect.';
  } finally {
    btn.disabled = false;
  }
});

let started = false;
async function startApp() {
  if (started) return;
  started = true;
  $('#login').hidden = true;
  $('#app').hidden = false;
  try {
    [state.items, state.goals] = await Promise.all([db.listItems(), db.getGoals()]);
    await loadDay();
  } catch (err) {
    fail(err);
  }
}

async function loadDay() {
  state.entries = await db.listEntries(state.day);
  render();
}

// ---------- Rendu
function render() {
  renderDay();
  renderSummary();
  renderTabs();
  renderGrid();
}

function renderDay() {
  const today = isoDay(new Date());
  const [y, m, d] = state.day.split('-').map(Number);
  const label = new Date(y, m - 1, d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const names = { [today]: "Aujourd'hui", [addDays(today, -1)]: 'Hier' };
  $('#today-btn').innerHTML = `<strong>${esc(names[state.day] || label)}</strong>${names[state.day] ? `<span>${esc(label)}</span>` : ''}`;
  $('#next-day').disabled = state.day >= today;
}

function ring(value, goal) {
  const r = 52, c = 2 * Math.PI * r;
  const p = progress(value, goal);
  return `
    <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="${r}" class="ring-track"/>
      <circle cx="60" cy="60" r="${r}" class="ring-fill" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p)}"/>
    </svg>`;
}

function renderSummary() {
  const t = total(state.entries);
  const g = state.goals;
  const left = round(g.kcal - t.kcal);
  const bars = [
    ['protein', 'Protéines'],
    ['carbs', 'Glucides'],
    ['fat', 'Lipides'],
  ].map(([k, label]) => `
    <div class="macro macro-${k}">
      <div class="macro-head"><span>${label}</span><span><strong>${round(t[k])}</strong> / ${round(g[k])} g</span></div>
      <div class="bar"><i style="width:${progress(t[k], g[k]) * 100}%"></i></div>
    </div>`).join('');

  const byMeal = totalByMeal(state.entries);
  const split = MEALS.filter((m) => byMeal[m.id].kcal > 0)
    .map((m) => `<span class="chip-sm">${m.emoji} ${round(byMeal[m.id].kcal)}</span>`).join('');

  $('#summary').innerHTML = `
    <div class="kcal">
      ${ring(t.kcal, g.kcal)}
      <div class="kcal-text">
        <strong>${round(t.kcal)}</strong>
        <span>/ ${round(g.kcal)} kcal</span>
      </div>
    </div>
    <div class="macros">
      <p class="remaining">${left >= 0 ? `Encore <strong>${left} kcal</strong> disponibles` : `<strong>${-left} kcal</strong> au-dessus de l'objectif`}</p>
      ${bars}
      ${split ? `<div class="split">${split}</div>` : ''}
    </div>`;
}

function renderTabs() {
  const byMeal = totalByMeal(state.entries);
  $('#meal-tabs').innerHTML = MEALS.map((m) => `
    <button role="tab" class="tab ${m.id === state.meal ? 'active' : ''}" data-meal="${m.id}" aria-selected="${m.id === state.meal}">
      <span class="tab-emoji">${m.emoji}</span>
      <span class="tab-label">${m.label}</span>
      ${byMeal[m.id].kcal > 0 ? `<span class="tab-kcal">${round(byMeal[m.id].kcal)}</span>` : ''}
    </button>`).join('');
}

const fmtQty = (q) => (q === 0.5 ? '½' : String(q).replace('.5', '½').replace('.', ','));

function card({ key, emoji, image, name, portion, kcal, protein, entry, missing }) {
  const q = entry ? Number(entry.quantity) : 0;
  const shown = entry ? q : 1;
  return `
    <article class="card glass ${entry ? 'selected' : ''}" data-key="${esc(key)}" tabindex="0" role="checkbox" aria-checked="${!!entry}">
      <div class="card-media">${image ? `<img src="${esc(image)}" alt="" loading="lazy">` : `<span>${esc(emoji || '🍽️')}</span>`}</div>
      <span class="check" aria-hidden="true">✓</span>
      <div class="card-body">
        <h3>${esc(name)}</h3>
        <p class="muted">${esc(portion)}${missing ? ' · retiré de la bibliothèque' : ''}</p>
        <p class="card-macros"><strong>${round(kcal * shown)}</strong> kcal · ${round1(protein * shown)} g prot.</p>
      </div>
      ${entry ? `
        <div class="stepper" data-entry="${entry.id}">
          <button data-step="-0.5" aria-label="Moins" ${q <= 0.5 ? 'disabled' : ''}>−</button>
          <span>${fmtQty(q)} portion${q > 1 ? 's' : ''}</span>
          <button data-step="0.5" aria-label="Plus">+</button>
        </div>` : ''}
      ${!missing ? `<button class="edit-btn" data-edit="${esc(key)}" aria-label="Modifier">✎</button>` : ''}
    </article>`;
}

function renderGrid() {
  const meal = state.meal;
  const mealEntries = state.entries.filter((e) => e.meal === meal);
  const byItem = new Map(mealEntries.filter((e) => e.item_id).map((e) => [e.item_id, e]));
  const offered = state.items.filter((i) => i.meals.includes(meal) || byItem.has(i.id));

  const cards = offered.map((i) => {
    const entry = byItem.get(i.id);
    const v = entry || i; // coché : on affiche les valeurs enregistrées, les mêmes que le bilan
    return card({ key: i.id, emoji: i.emoji, image: i.image_url, name: v.name, portion: v.portion,
      kcal: v.kcal, protein: v.protein, entry });
  });
  // Entrées dont l'aliment a été supprimé : on les montre quand même pour un historique exact.
  for (const e of mealEntries.filter((x) => !x.item_id || !state.items.some((i) => i.id === x.item_id))) {
    cards.push(card({ key: `entry:${e.id}`, emoji: '🗂️', name: e.name, portion: e.portion, kcal: e.kcal, protein: e.protein, entry: e, missing: true }));
  }

  const empty = !state.items.length ? `
    <div class="empty glass">
      <p>Ta bibliothèque est vide.</p>
      <button class="btn primary" id="seed-btn">Ajouter les aliments de base</button>
      <p class="muted">${SEED_ITEMS.length} aliments et recettes courants, modifiables ensuite.</p>
    </div>` : '';

  $('#grid').innerHTML = empty + cards.join('') + `
    <button class="card add-card" id="add-here"><span>＋</span>Ajouter un aliment</button>`;
}

// ---------- Actions : cocher, quantités
const pending = new Set(); // ignore un double tap pendant l'enregistrement
async function toggle(key) {
  if (key.startsWith('entry:')) return removeEntry(key.slice(6));
  const item = state.items.find((i) => i.id === key);
  const existing = state.entries.find((e) => e.item_id === key && e.meal === state.meal);
  if (existing) return removeEntry(existing.id);
  if (pending.has(key)) return;
  pending.add(key);
  try {
    const entry = await db.addEntry(state.day, state.meal, item);
    state.entries.push(entry);
    render();
  } catch (err) { fail(err); } finally { pending.delete(key); }
}

async function removeEntry(id) {
  const before = state.entries;
  state.entries = state.entries.filter((e) => e.id !== id);
  render();
  try { await db.deleteEntry(id); } catch (err) { state.entries = before; render(); fail(err); }
}

async function step(entryId, delta) {
  const e = state.entries.find((x) => x.id === entryId);
  const q = Math.max(0.5, Number(e.quantity) + delta);
  const old = e.quantity;
  e.quantity = q;
  render();
  try { await db.setEntryQuantity(entryId, q); } catch (err) { e.quantity = old; render(); fail(err); }
}

$('#grid').addEventListener('click', (ev) => {
  const stepBtn = ev.target.closest('[data-step]');
  if (stepBtn) return step(stepBtn.closest('.stepper').dataset.entry, Number(stepBtn.dataset.step));
  if (ev.target.closest('.stepper')) return;
  const edit = ev.target.closest('[data-edit]');
  if (edit) return openItem(state.items.find((i) => i.id === edit.dataset.edit));
  if (ev.target.closest('#add-here')) return openItem(null, state.meal);
  if (ev.target.closest('#seed-btn')) return seed();
  const c = ev.target.closest('.card[data-key]');
  if (c) toggle(c.dataset.key);
});
$('#grid').addEventListener('keydown', (ev) => {
  if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches('.card[data-key]')) {
    ev.preventDefault();
    toggle(ev.target.dataset.key);
  }
});

$('#meal-tabs').addEventListener('click', (ev) => {
  const t = ev.target.closest('[data-meal]');
  if (!t) return;
  state.meal = t.dataset.meal;
  renderTabs();
  renderGrid();
});

async function changeDay(iso) {
  state.day = iso;
  try { await loadDay(); } catch (err) { fail(err); }
}
$('#prev-day').addEventListener('click', () => changeDay(addDays(state.day, -1)));
$('#next-day').addEventListener('click', () => changeDay(addDays(state.day, 1)));
$('#today-btn').addEventListener('click', () => changeDay(isoDay(new Date())));

async function seed() {
  try {
    await db.insertItems(SEED_ITEMS);
    state.items = await db.listItems();
    render();
    toast('Bibliothèque prête ✨');
  } catch (err) { fail(err); }
}

// ---------- Fiche aliment / recette
const itemDialog = $('#item-dialog');
const itemForm = $('#item-form');
let editing = null;

$('#meal-checks').innerHTML = MEALS.map((m) =>
  `<label class="chip"><input type="checkbox" name="meals" value="${m.id}"><span>${m.emoji} ${m.label}</span></label>`).join('');

const parseIngredients = (text) => text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
  const i = l.indexOf(':');
  return i < 0 ? { name: l, qty: '' } : { name: l.slice(0, i).trim(), qty: l.slice(i + 1).trim() };
});
const formatIngredients = (list) => (list || []).map((x) => (x.qty ? `${x.name} : ${x.qty}` : x.name)).join('\n');

function openItem(item, meal) {
  editing = item;
  itemForm.reset();
  $('#item-title').textContent = item ? 'Modifier' : 'Nouvel aliment';
  $('#delete-item').hidden = !item;
  const v = item || { kind: 'food', portion: '1 portion', meals: meal ? [meal] : [] };
  for (const k of ['name', 'emoji', 'portion', 'kcal', 'protein', 'carbs', 'fat', 'description', 'image_url']) {
    itemForm.elements[k].value = v[k] ?? '';
  }
  itemForm.elements.kind.value = v.kind;
  itemForm.elements.favorite.checked = !!v.favorite;
  itemForm.elements.ingredients.value = formatIngredients(v.ingredients);
  for (const cb of itemForm.querySelectorAll('[name=meals]')) cb.checked = v.meals.includes(cb.value);
  itemDialog.returnValue = ''; // sinon Échap rejouerait le dernier « save »
  itemDialog.showModal();
}

itemDialog.addEventListener('close', async () => {
  if (itemDialog.returnValue !== 'save') return;
  const f = itemForm.elements;
  const meals = [...itemForm.querySelectorAll('[name=meals]:checked')].map((cb) => cb.value);
  const item = {
    id: editing?.id,
    kind: f.kind.value,
    name: f.name.value.trim(),
    emoji: f.emoji.value.trim() || null,
    portion: f.portion.value.trim(),
    kcal: Number(f.kcal.value), protein: Number(f.protein.value), carbs: Number(f.carbs.value), fat: Number(f.fat.value),
    meals,
    ingredients: parseIngredients(f.ingredients.value),
    description: f.description.value.trim() || null,
    image_url: f.image_url.value.trim() || null,
    favorite: f.favorite.checked,
  };
  try {
    const saved = await db.saveItem(item);
    if (item.id) await db.syncEntries(state.day, saved);
    [state.items, state.entries] = await Promise.all([db.listItems(), db.listEntries(state.day)]);
    render();
    renderLibrary();
    toast(meals.length ? 'Enregistré' : 'Enregistré — coche un repas pour le voir dans les cartes');
  } catch (err) { fail(err); }
});

$('#delete-item').addEventListener('click', async () => {
  if (!editing || !confirm(`Supprimer « ${editing.name} » ? Tes journées passées garderont leurs valeurs.`)) return;
  try {
    await db.deleteItem(editing.id);
    itemDialog.close('deleted');
    state.items = state.items.filter((i) => i.id !== editing.id);
    render();
    renderLibrary();
    toast('Supprimé');
  } catch (err) { fail(err); }
});

// ---------- Bibliothèque
const libraryDialog = $('#library-dialog');
function renderLibrary() {
  const label = Object.fromEntries(MEALS.map((m) => [m.id, m.emoji]));
  $('#library-list').innerHTML = state.items.length ? state.items.map((i) => `
    <button class="lib-row" data-id="${i.id}">
      <span class="lib-emoji">${esc(i.emoji || '🍽️')}</span>
      <span class="lib-main"><strong>${i.favorite ? '★ ' : ''}${esc(i.name)}</strong>
        <span class="muted">${esc(i.portion)} · ${round(i.kcal)} kcal · P ${round1(i.protein)} · G ${round1(i.carbs)} · L ${round1(i.fat)}</span></span>
      <span class="lib-meals">${i.meals.map((m) => label[m] || '').join('')}</span>
    </button>`).join('') : '<p class="muted center">Aucun élément pour l’instant.</p>';
}
$('#open-library').addEventListener('click', () => { renderLibrary(); libraryDialog.showModal(); });
$('#library-list').addEventListener('click', (ev) => {
  const row = ev.target.closest('[data-id]');
  if (row) openItem(state.items.find((i) => i.id === row.dataset.id));
});
$('#new-item').addEventListener('click', () => openItem(null, state.meal));
document.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));

// ---------- Objectifs, export, déconnexion
const goalsDialog = $('#goals-dialog');
const goalsForm = $('#goals-form');
$('#open-goals').addEventListener('click', () => {
  for (const k of ['kcal', 'protein', 'carbs', 'fat']) goalsForm.elements[k].value = state.goals[k];
  goalsDialog.returnValue = '';
  goalsDialog.showModal();
});
goalsDialog.addEventListener('close', async () => {
  if (goalsDialog.returnValue !== 'save') return;
  const f = goalsForm.elements;
  try {
    state.goals = await db.saveGoals({ kcal: Number(f.kcal.value), protein: Number(f.protein.value), carbs: Number(f.carbs.value), fat: Number(f.fat.value) });
    renderSummary();
    toast('Objectifs enregistrés');
  } catch (err) { fail(err); }
});

$('#export-btn').addEventListener('click', async () => {
  try {
    const data = await db.exportAll();
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: `nuvea-sauvegarde-${isoDay(new Date())}.json` });
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) { fail(err); }
});

$('#logout-btn').addEventListener('click', async () => {
  goalsDialog.close();
  try { await db.signOut(); } catch (err) { fail(err); }
});

// ---------- Démarrage
db.onAuthChange((session) => {
  if (session) startApp();
  else { started = false; showLogin(); }
});
db.getSession().then((s) => (s ? startApp() : showLogin())).catch(() => showLogin());
