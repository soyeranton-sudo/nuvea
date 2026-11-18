// Mouvement : compteurs animés et verre qui réagit au pointeur (souris ou doigt).
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

// Fait défiler un nombre de sa valeur précédente vers `to` (ease-out quartique, 700 ms).
export function tween(el, to, format, duration = 700) {
  const from = el._v ?? 0;
  el._v = to;
  cancelAnimationFrame(el._raf);
  if (reduced.matches || from === to) { el.textContent = format(to); return; }
  const t0 = performance.now();
  const frame = (now) => {
    const p = Math.min((now - t0) / duration, 1);
    el.textContent = format(from + (to - from) * (1 - (1 - p) ** 4));
    if (p < 1) el._raf = requestAnimationFrame(frame);
  };
  el._raf = requestAnimationFrame(frame);
}

// Reflet de lumière qui suit le pointeur sur le verre, et léger aimant sur les petits boutons.
const GLASS = '.clear-glass, .milk-glass, .sheet';
const MAGNET = '.dock-btn, .round-btn';
let raf = 0;
let last;
function onMove(e) {
  last = e;
  if (!raf) raf = requestAnimationFrame(() => {
    raf = 0;
    const t = last.target instanceof Element ? last.target : null;
    const glass = t?.closest(GLASS);
    if (glass) {
      const r = glass.getBoundingClientRect();
      glass.style.setProperty('--gx', `${last.clientX - r.left}px`);
      glass.style.setProperty('--gy', `${last.clientY - r.top}px`);
    }
    const m = t?.closest(MAGNET);
    if (m && last.pointerType === 'mouse' && !reduced.matches) {
      const r = m.getBoundingClientRect();
      const dx = (last.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (last.clientY - (r.top + r.height / 2)) / r.height;
      m.style.translate = `${(dx * 6).toFixed(1)}px ${(dy * 6).toFixed(1)}px`;
    }
  });
}
function onLeave(e) {
  const m = e.target instanceof Element && e.target.closest(MAGNET);
  if (m && !m.contains(e.relatedTarget)) m.style.translate = '';
}

export function initGlass() {
  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerdown', onMove, { passive: true }); // au doigt : le reflet naît où l'on touche
  document.addEventListener('pointerout', onLeave, { passive: true });
}
