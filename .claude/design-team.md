# Équipe de skills — qui fait quoi

Lis ce fichier avant un travail d'interface ou une fonctionnalité de plus de quelques lignes.
Pour une petite correction, n'invoque aucun skill : fais-la directement.

## Ordre de priorité en cas de désaccord
1. La demande de l'utilisateur dans la conversation.
2. `CLAUDE.md` du projet (vision, identité Apple / Liquid Glass, décisions prises).
3. Ce fichier.
4. Les règles par défaut des skills.

## Rôles
| Besoin | Skill | Remarque |
|---|---|---|
| Méthode : cadrer, planifier, TDD, débogage, revue | Superpowers (`brainstorming`, `writing-plans`, `test-driven-development`, `systematic-debugging`, `requesting-code-review`, `verification-before-completion`…) | Seulement pour une fonctionnalité ou un bug non trivial. Ponytail fixe la taille : pas de plan ni de brainstorming pour une retouche. |
| Choix du modèle des sous-agents | Agents globaux `fast-worker` / `implementer` / `architect` | Quand Superpowers délègue (`subagent-driven-development`, `dispatching-parallel-agents`), il passe par ces agents. |
| Direction artistique | `frontend-design` (déjà fourni par l'app) | Référence pour l'identité globale ; elle est fixée dans `CLAUDE.md`, on l'affine, on ne la réinvente pas. |
| Système de design, palettes, typo, graphiques | `ui-ux-pro-max`, `design-system` | Ses recommandations sont des propositions. Les jetons existants de `css/styles.css` (`:root`) font foi ; on ne les remplace pas sans accord. Ignorer ses gabarits de landing page (le dashboard est une app, pas une page marketing). |
| Animations, transitions, états hover/press, tactile | `emil-design-eng` | Seul arbitre du mouvement. |
| Audit et finition visuelle | `impeccable` (`/impeccable audit`, `critique`, `polish`…), sans hook | Lancé à la demande. |
| Composants | CSS maison (`.clear-glass`, `.milk-glass`, `.btn`, `.round-btn`, `.dock-btn`, `.card`, `.sheet`, `.chip`, `.stepper`, icônes `<use href="#i-…">` dans `index.html`) | Pas de shadcn/ui : le projet est en HTML/CSS/JS sans framework. Réutiliser ces classes avant d'en créer. |
| Serveurs MCP | `mcp-builder` | Uniquement si on crée une intégration MCP. |

## Règles tranchées
- **Animations** (Emil) : `transform` et `opacity` uniquement, `ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`), 150–300 ms pour l'interface, jamais `transition: all`, toujours `prefers-reduced-motion`. Pas de GSAP ni de bibliothèque d'animation.
- **Verre** : deux matières seulement. *Verre clair* (`.clear-glass`, texte blanc) pour ce qui flotte sur le fond : barre du haut, dock, bilan, onglets. *Verre laiteux* (`.milk-glass`, texte sombre) pour le contenu dense : cartes d'aliments, feuilles. Le texte doit rester lisible (contraste 4.5:1). Icônes d'interface : SVG au trait (sprite dans `index.html`), jamais d'emoji.
- **Typographie** : la pile système Apple (`-apple-system`, SF Pro) est un choix d'identité voulu, pas un défaut à corriger.
- **Anneau de progression** : il porte une vraie donnée (calories / objectif), il est conservé.
- **Couleurs et espacements** : passer par les variables CSS existantes ; toute nouvelle couleur devient une variable, en clair et en sombre.
- **Points ouverts** (Impeccable a raison de les signaler, à décider avec l'utilisateur) : les emojis comme icônes d'aliments (temporaires, à remplacer par de vraies images) et le logo en texte dégradé.
- **Non installés volontairement** : `using-superpowers` (impose un skill à chaque message), les hooks d'Impeccable (audit automatique à chaque édition), Taste Skill (fait pour des sites vitrines, hook de fin de 10 min avec navigateur), shadcn/ui (exige React), et les skills `ui-styling`, `slides`, `banner-design`, `brand`, `design` livrés par UI UX Pro Max (hors sujet ; rangés dans `~/.claude/backups/avant-design-toolkit-2026-11-18/`).

## Réinstallation (les skills ne sont pas dans git)
- Superpowers, Emil, MCP Builder : `npx skills experimental_install` (lit `skills-lock.json`).
- Impeccable : `npx impeccable@4.9.2 install --providers=claude --scope=project --no-hooks -y`.
- UI UX Pro Max : `npx ui-ux-pro-max-cli@2.15.0 init --ai claude`, puis retirer les 5 skills non retenus ci-dessus.
