# CLAUDE.md — Vision et contexte du projet

## 1. Présentation générale du projet

Je souhaite développer un dashboard personnel de nutrition, accessible depuis un navigateur et pensé pour être utilisé quotidiennement, aussi bien sur ordinateur que sur iPhone.

Ce projet est destiné à mon usage personnel. Il ne s'agit pas de créer immédiatement un produit commercial ou une application destinée au grand public.

L'objectif est de construire progressivement un véritable assistant nutritionnel personnel, avec une interface moderne, élégante et intuitive.

Le concept central est simple :

> Je sélectionne les aliments et les recettes que j'ai consommés pendant la journée, et le dashboard calcule automatiquement mon bilan nutritionnel quotidien, conserve mon historique et m'aide à équilibrer les repas suivants.

Il faut toujours garder cette vision globale à l'esprit lorsque tu travailles sur le projet.

## 2. Fonctionnement principal : suivi alimentaire quotidien

Le cœur du dashboard repose sur une organisation par repas. Les catégories principales envisagées sont :

- Petit-déjeuner
- Déjeuner
- Collation
- Dîner
- Snacks / autres consommations

Chaque catégorie dispose de sa propre section contenant une bibliothèque d'aliments et de recettes préenregistrés.

### Fonctionnement des repas

Je veux une utilisation extrêmement simple et rapide.

Exemple : je me réveille et ouvre la section Petit-déjeuner. Je découvre plusieurs aliments et recettes disponibles, présentés visuellement avec des images. Par exemple :

- Yaourt
- Flocons d'avoine
- Banane
- Tartines
- Œufs
- Différentes recettes de petit-déjeuner.

Je peux simplement cocher les aliments ou recettes que j'ai consommés. Dès que je coche un élément, ses valeurs nutritionnelles sont automatiquement ajoutées à mon bilan de la journée. Si je décoche un élément, ses valeurs sont retirées.

Je souhaite retrouver exactement le même fonctionnement pour tous les autres repas.

### Bibliothèque de recettes et d'aliments

Le dashboard doit proposer une bibliothèque contenant des aliments et des recettes préenregistrés. Chaque élément doit pouvoir posséder :

- Un nom.
- Une image représentative.
- Une description facultative.
- Une liste d'ingrédients.
- Des quantités.
- Des calories (kcal).
- Des protéines (g).
- Des glucides (g).
- Des lipides (g).

Je dois pouvoir :

- Ajouter mes propres aliments.
- Créer mes propres recettes.
- Modifier les recettes existantes.
- Supprimer des éléments.
- Modifier les quantités consommées.
- Réutiliser facilement mes recettes favorites.

Les valeurs nutritionnelles doivent être associées aux quantités réellement consommées. Par exemple, si une recette représente 400 kcal pour une portion et que j'en consomme une demi-portion, le dashboard doit calculer automatiquement 200 kcal et ajuster les autres macronutriments proportionnellement.

## 3. Bilan nutritionnel quotidien

Toutes les consommations enregistrées dans les différentes catégories doivent alimenter automatiquement un bilan nutritionnel centralisé. Je souhaite pouvoir consulter à tout moment :

- Calories consommées.
- Protéines consommées.
- Glucides consommés.
- Lipides consommés.
- Progression par rapport aux objectifs quotidiens.
- Répartition nutritionnelle entre les différents repas.

Le bilan doit se mettre à jour instantanément lorsqu'un aliment est ajouté, retiré ou modifié.

Je veux également pouvoir consulter les journées précédentes et retrouver précisément ce que j'ai consommé.

Les données doivent être conservées durablement.

## 4. Suggestions nutritionnelles intelligentes

C'est l'une des fonctionnalités les plus importantes et intéressantes du projet à long terme.

Je ne veux pas uniquement un compteur de calories : je souhaite que le dashboard soit capable d'analyser ce que j'ai déjà consommé pendant la journée et d'adapter ses suggestions pour les repas suivants.

### Exemple de fonctionnement

Imaginons que mon petit-déjeuner soit particulièrement léger. Le dashboard constate que mes apports en calories et en protéines sont encore faibles par rapport à mes objectifs quotidiens. Lorsque j'arrive au déjeuner, il peut me proposer des recettes plus consistantes et adaptées à ce qu'il me reste à consommer.

Autre exemple : si mon déjeuner était particulièrement copieux et riche en lipides, le dashboard pourrait me proposer pour la collation ou le dîner des alternatives différentes, plus légères et complémentaires.

L'idée est de tenir compte de l'ensemble de la journée, et non de traiter chaque repas indépendamment.

### Ce que le système doit prendre en compte

Les suggestions doivent idéalement analyser :

- Les calories déjà consommées.
- Les protéines déjà consommées.
- Les glucides déjà consommés.
- Les lipides déjà consommés.
- Les objectifs nutritionnels de la journée.
- Les repas déjà enregistrés.
- Les apports qu'il reste à atteindre.
- Le type de repas et le moment de la journée.
- Les recettes disponibles dans ma bibliothèque.

### Intelligence artificielle ou algorithme ?

Je ne sais pas encore si cette fonctionnalité nécessite une véritable intelligence artificielle. Tu devras étudier les possibilités.

Je privilégie dans un premier temps un système intelligent basé sur des règles nutritionnelles et des calculs fiables. Une intégration d'IA pourra éventuellement être envisagée par la suite si elle apporte une réelle valeur ajoutée.

Je veux surtout éviter d'ajouter une API payante ou une dépendance complexe sans nécessité.

Les suggestions doivent rester indicatives, équilibrées et non culpabilisantes. Un repas plus ou moins riche ne doit jamais être présenté comme une erreur à corriger absolument.

## 5. Historique et statistiques

Le dashboard doit conserver les données quotidiennes pour permettre un véritable suivi dans le temps. Je souhaite notamment disposer de graphiques permettant de visualiser :

- L'évolution des calories consommées chaque jour.
- L'évolution des protéines, glucides et lipides.
- Les moyennes nutritionnelles sur plusieurs jours.
- La régularité du suivi.
- Les tendances et les évolutions dans le temps.

Je souhaite également intégrer un suivi du poids corporel :

- Enregistrement du poids.
- Historique des pesées.
- Graphique d'évolution.
- Moyennes et tendances.
- Possibilité de consulter les évolutions sur différentes périodes.

L'objectif est d'avoir une vision globale de ma progression et de pouvoir comparer mes habitudes alimentaires au fil du temps.

## 6. Direction artistique et expérience utilisateur

L'esthétique est un élément très important du projet. Je souhaite une interface qui s'inspire fortement de l'univers Apple.

### Style recherché

- Design minimaliste et épuré.
- Esthétique premium.
- Inspiration Liquid Glass.
- Transparences et effets de profondeur maîtrisés.
- Cartes avec des arrondis harmonieux.
- Typographie élégante et lisible.
- Animations fluides et discrètes.
- Hiérarchie visuelle claire.
- Icônes cohérentes.
- Graphiques modernes.
- Images de qualité pour les recettes et les aliments.

Je veux éviter les dashboards génériques qui ressemblent à des templates administratifs classiques. L'interface doit être visuellement soignée, cohérente et agréable à utiliser au quotidien.

### Présentation des repas

Les aliments et recettes doivent être présentés de manière visuelle, idéalement sous forme de cartes avec une image, le nom et les principales informations nutritionnelles.

L'action principale doit rester très simple : sélectionner ou désélectionner ce que j'ai mangé. Il faut éviter les formulaires trop longs et les manipulations inutiles.

### Expérience mobile

Le dashboard doit être responsive et particulièrement agréable à utiliser sur iPhone. Les interactions tactiles, les boutons, les cartes et les différentes sections doivent être adaptés à un écran mobile. L'expérience doit rester cohérente avec l'expérience sur ordinateur.

## 7. Philosophie de développement

Je souhaite construire ce projet progressivement. Il faut distinguer deux choses :

- **La vision finale** : un assistant nutritionnel personnel complet, intelligent, esthétique et capable de suivre mes habitudes alimentaires et leur évolution.
- **Le prototype initial** : une première version fonctionnelle, relativement simple, centrée sur l'enregistrement des repas, les valeurs nutritionnelles, les recettes préenregistrées et le bilan quotidien.

Ne cherche pas à développer toutes les fonctionnalités avancées immédiatement. Privilégie une architecture suffisamment propre et évolutive pour pouvoir les ajouter plus tard sans devoir reconstruire entièrement le projet.

### Principes à respecter

- Privilégier les solutions simples et fiables.
- Éviter le surdéveloppement.
- Ne pas ajouter des fonctionnalités simplement parce qu'elles sont possibles.
- Éviter les dépendances inutiles.
- Garantir la cohérence des calculs nutritionnels.
- Préserver les données enregistrées.
- Séparer clairement les différentes fonctionnalités.
- Maintenir un code lisible et facilement évolutif.
- Tester les fonctionnalités importantes.
- Ne pas casser les fonctionnalités existantes lors des modifications.

## 8. Ta manière de travailler sur ce projet

Je souhaite que tu agisses comme un véritable développeur et conseiller technique sur le projet. Ne te contente pas d'exécuter aveuglément mes demandes. Je veux que tu sois capable de :

- Proposer des améliorations pertinentes.
- Identifier les problèmes de conception.
- Anticiper les difficultés techniques.
- Me conseiller sur les fonctionnalités réellement intéressantes.
- Proposer des solutions plus simples lorsqu'elles existent.
- Signaler les fonctionnalités qui risquent de compliquer inutilement le projet.

Lorsque je propose une nouvelle fonctionnalité, réfléchis à son intérêt, sa faisabilité et son intégration dans l'architecture existante.

Ne prends cependant pas de décisions importantes qui changent radicalement la vision du projet sans m'en parler. Si une information essentielle manque, pose-moi des questions plutôt que d'inventer des exigences.

## Décisions prises

- **2026-11-18 — Données synchronisées entre PC et iPhone** via une base de données en ligne (pas de stockage uniquement local). Prévoir un export des données en secours.
- **2026-11-18 — Base de données : Supabase** (Postgres + authentification + stockage des images, offre gratuite). Accès protégé par Row Level Security : chaque donnée n'est lisible que par mon compte. Seules l'URL du projet et la clé publique (anon/publishable) vont dans le code ; jamais la clé `service_role` ni le mot de passe de la base. Le projet gratuit se met en pause après 7 jours sans activité.

## Notes techniques

- **Nom provisoire : Nuvéa** (à confirmer).
- **Stack :** HTML + CSS + JavaScript (modules ES) sans framework ni étape de build ; `supabase-js` chargé depuis jsDelivr, version figée. Site statique.
- **Fichiers :** `js/nutrition.js` (calculs purs, testés), `js/db.js` (seul accès à Supabase), `js/app.js` (interface), `js/seed.js` (bibliothèque de départ, valeurs approximatives), `supabase/schema.sql` (tables + RLS), `css/styles.css` (variables clair/sombre).
- **Historique :** une entrée copie les valeurs de l'aliment au moment où il est coché ; modifier un aliment ne met à jour que le jour affiché, les jours passés restent intacts.
- **Tests :** `node --test tests/`.
- **Lancer en local :** `python -m http.server 5198` puis http://localhost:5198 (config `.claude/launch.json`).
- **En ligne :** https://soyeranton-sudo.github.io/nuvea/ — dépôt public GitHub `soyeranton-sudo/nuvea`, GitHub Pages depuis `main` (racine). Publier = `git push` sur `main`, en ligne en ~1 min.
- **Icônes :** `icons/` (PNG, générées par `tools/make_icons.py`).
- **Pas encore fait :** upload d'images, graphiques/historique, poids, suggestions, mode hors connexion.

## 9. Règle fondamentale

À chaque nouvelle session de travail, utilise ce fichier comme référence pour comprendre le projet et conserver sa cohérence.

Avant une modification importante, examine l'architecture et le code existants. Ne pars jamais du principe qu'il faut tout reconstruire.

Garde toujours en tête l'objectif final :

> Créer un dashboard nutritionnel personnel, visuellement premium, extrêmement simple à utiliser, qui transforme le suivi alimentaire quotidien en une expérience rapide, intelligente et motivante.
