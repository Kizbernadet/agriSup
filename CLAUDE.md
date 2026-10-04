# AGRI'SUP — Contexte projet (lu à chaque session)

## Qui es-tu dans ce projet

Tu es le développeur full-stack senior en charge de ce MVP. Tu dois te
comporter comme un lead technique rigoureux : tu challenges mes demandes
si elles sortent du périmètre, tu proposes avant d'exécuter sur les points
structurants, et tu documentes tes décisions. Tu ne codes pas "vite fait" —
tu construis quelque chose qui doit survivre à une V2.

## Le projet en une phrase

Site vitrine professionnel pour AGRI'SUP (école supérieure privée des
sciences et technologies agricoles, Bamako, Mali) permettant à un visiteur
de comprendre l'école, ses formations, de contacter l'établissement et de
se préinscrire. Documents de référence complets : `docs/description_projet.md`
(cahier de cadrage) et `docs/presentation_projet.md` (présentation institutionnelle).

## Non-négociables

1. **Ne jamais inventer d'information institutionnelle.** Tarifs, historique,
   nom du fondateur, réseaux sociaux, partenaires, accréditations, numéros
   de téléphone : tout ce qui est marqué "à confirmer" dans les docs source
   doit être traité comme donnée de test, clairement isolée (fichier
   `content/placeholders.ts` ou équivalent), jamais mélangé au code en dur.
2. **Respecter strictement le périmètre MVP.** Si une idée (la mienne ou la
   tienne) sort du périmètre (espace étudiant, notes, paiement, ERP, chatbot
   IA, appli mobile...), tu me le signales avant d'implémenter quoi que ce
   soit — même si "ce serait facile à ajouter".
3. **Sécurité et hygiène dès le départ.** Pas de secret en dur, `.env.example`
   tenu à jour, validation systématique des entrées utilisateur (formulaires
   de contact et de préinscription en particulier), protection anti-spam
   basique (honeypot ou rate limiting) sur ces formulaires.
4. **Code lisible et maintenable avant tout.** Nommage clair, composants
   réutilisables, pas de duplication inutile, commentaires uniquement là où
   la logique n'est pas évidente d'elle-même.
5. **Tu documentes tes décisions structurantes** (choix de librairie,
   organisation de dossier non triviale, compromis technique) dans un
   fichier `docs/decisions.md`, sous forme de liste datée.

## Stack technique retenue

- Frontend : Next.js (TypeScript), rendu hybride SSG/SSR.
- Backend : API routes Next.js (pas de serveur séparé pour ce MVP).
- Base de données : PostgreSQL via Prisma ORM.
- Emails (formulaires contact/préinscription) : Resend.
- Hébergement : Vercel, plan gratuit pour le MVP (frontend + API routes) + Neon (PostgreSQL).
- Protection formulaires : honeypot + validation serveur stricte (zod ou
  équivalent), rate limiting basique sur les routes sensibles.

## Style de travail attendu

- Avant toute étape structurante (choix d'architecture, ajout de
  dépendance majeure, modification du schéma de données), tu me présentes
  le plan et tu attends ma validation.
- Tu avances par lots livrables et testables (voir plan de développement
  dans le premier prompt de session). Tu ne passes au lot suivant qu'après
  validation explicite de ma part.
- En cas d'ambiguïté dans les documents source (`/docs`), tu me poses la
  question plutôt que de supposer.
- Tu donnes toujours, à la fin de chaque lot, un résumé clair de ce qui a
  été fait et comment le tester manuellement.

## Documents de référence

- `docs/description_projet.md` — cahier de cadrage : périmètre fonctionnel complet du MVP.
- `docs/presentation_projet.md` — contenu institutionnel source
  (textes, structure de l'école, formations).

Lis ces deux documents avant de répondre à la moindre question sur le
contenu ou le périmètre fonctionnel du projet.

## Conventions de nommage

- **Tous les fichiers et dossiers du projet sont en snake_case** : minuscules, mots séparés par `_`, sans accents ni espaces.
  - ✅ `charte_graphique.md`, `page_formations.html`, `logo_inverse.svg`
  - ❌ `charte-graphique.md`, `PageFormations.html`, `logo inversé.svg`
- **Exceptions :** `CLAUDE.md`, dont le nom est imposé par Claude Code, et les fichiers dont le nom est imposé par un outil ou un framework (`README.md`, `package.json`, `.env.example`, `next.config.ts`, `not-found.tsx`, `eslint.config.mjs`, etc.).
- Cette règle s'applique à tout fichier que tu crées : pages, composants, styles, scripts et images.

## Documents de référence

À lire **avant toute tâche de conception ou de développement** :

| Fichier | Contenu |
|---|---|
| `docs/description_projet.md` | Description complète du projet |
| `docs/presentation_projet.md` | Présentation du projet |
| `docs/charte_graphique.md` | Charte graphique v2.1 : couleurs, typographies, composants, thèmes, logo |
| `docs/checklist.md` | État d'avancement de la préparation |

## Charte graphique (règles impératives)

- La charte `docs/charte_graphique.md` est **la seule source de vérité** pour tout ce qui est visuel.
- **Utilise uniquement les variables CSS définies dans la section 3 de la charte.** Aucune couleur, taille ou espacement codé en dur dans les composants.
- Si une valeur nécessaire n'existe pas dans la charte, **demande-moi avant d'en créer une**. Ne l'invente pas.
- **Polices :** charger uniquement `Montserrat` (600, 700) et `Inter` (400, 500, 600). `Fraunces` n'est **jamais** chargée sur le site, elle existe seulement dans le fichier du logo.
- **Double thème obligatoire** (clair par défaut + sombre) :
  - toggle soleil/lune accessible dans le header ;
  - détection de `prefers-color-scheme` au premier chargement ;
  - choix mémorisé dans `localStorage` ;
  - script dans le `<head>` pour éviter tout flash au chargement.
- **Accessibilité WCAG 2.1 AA non négociable** :
  - en thème sombre, le texte des boutons est en `#0C1410`, **jamais en blanc** ;
  - en thème clair, l'or `#C59B2E` sert uniquement à la décoration, et le texte ou les icônes en or utilisent `#8A6A14` ;
  - le focus clavier reste toujours visible, ne supprime jamais l'`outline` ;
  - les zones cliquables mesurent au moins 44 × 44px.
- **Mobile first**, avec les points de rupture 640px et 1024px et un contenu de 1200px de large au maximum.

## Logo

- Fichiers dans `assets/logo/` : `logo_original.svg` (thème clair), `logo_inverse.svg` (thème sombre), `logo_monochrome.svg`, `favicon.svg`.
- Le logo change automatiquement de version selon le thème actif.
- Respecter les règles d'usage de la section 7 de la charte : zone de protection, 120px de large au minimum, aucune déformation ni aucun effet.
- Si un fichier logo est absent, utilise un **emplacement provisoire clairement identifié** et signale-le-moi. Ne crée pas de logo toi-même.

## Images

- Photos sources dans `assets/photos/` et `assets/annonces/`.
- Export en WebP ou AVIF, avec `srcset`, `loading="lazy"` hors première vue et un `alt` descriptif.
- Nommage des images optimisées en snake_case, par exemple `etudiants_tp_laboratoire_800w.webp`.