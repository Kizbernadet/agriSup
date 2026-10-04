# Journal des décisions — AGRI'SUP

Liste datée des décisions structurantes (choix de librairie, organisation, compromis).
Chaque entrée indique la décision, sa raison et, le cas échéant, ce qu'il faudra revoir.

---

## 2026-10-04

- **Stack : option A.** Next.js (App Router, TypeScript) + API routes + Prisma/PostgreSQL + Resend.
  Formations et actualités sont stockées en base, comme dans le modèle de données du cahier.
  L'édition par une personne non développeuse arrivera avec l'administration V1.5.
  *Alternative écartée :* le CMS Keystatic, qui ajoutait une deuxième source de données et s'écartait du cahier.

- **Base de données : Neon** plutôt que Supabase ou Railway.
  Le plan gratuit de Supabase met le projet en pause après 7 jours d'inactivité. Neon est du PostgreSQL standard compatible Prisma, avec une intégration native à Vercel.
  Région : Europe (Francfort), proche des fonctions Vercel à Paris (`cdg1`), qui sont elles-mêmes au plus près de Bamako.
  *Compromis :* la base se met en veille quand elle est inutilisée, ce qui ajoute quelques centaines de ms à la première requête.

- **Hébergement : Vercel, plan gratuit (Hobby) pour le MVP.**
  ⚠️ Les conditions du plan Hobby excluent l'usage commercial. Il faudra passer au plan Pro avant le lancement officiel.

- **Styles : CSS Modules + variables CSS de la charte**, sans Tailwind.
  Cela garantit qu'aucune valeur n'est codée en dur hors des variables de la charte.

- **Variables CSS ajoutées à la charte** (autorisées par la responsable du projet), toutes commentées dans `tokens.css` :
  `--color-surface-raised`, couleurs d'état, `--color-link`, `--color-header-bg`,
  échelle typographique en `rem`, `--container-max`, `--tap-target`, `--photo-text-gradient`.

- **Internationalisation : français + anglais dans le MVP**, avec `next-intl`.
  Le bambara est reporté, mais l'architecture le permettra sans refonte.
  Les traductions anglaises seront rédigées à partir des textes français et marquées « à relire ».

- **Nommage :** fichiers et dossiers en snake_case. Les noms imposés par les outils font exception
  (`README.md`, `package.json`, `not-found.tsx`, `[locale]`, `[slug]`…).
  Les **URL publiques** et les identifiants d'URL (slugs) sont en kebab-case (`/fr/mentions-legales`, `/fr/formations/licence-pro-agronomie`), ce que recommande Google pour le référencement.
  Les URL sont traduites via la configuration `pathnames` de `next-intl`, indépendamment des noms de dossiers.

- **Rate limiting dans PostgreSQL** (table de compteurs), sans service supplémentaire.
  Un compteur en mémoire ne fonctionne pas sur Vercel, où chaque requête peut tomber sur une instance différente.

- **Notifications des formulaires : email via Resend** à l'adresse de test, et enregistrement en base.
  Pas d'accusé de réception au candidat dans le MVP (cahier §8.5).
  *Contrainte :* sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte.

- **WhatsApp : liens Click-to-Chat (`wa.me`)**, sans l'API WhatsApp Business, qui est hors périmètre.

- **Coordonnées de test et officielles** séparées : les coordonnées de test passent par les variables d'environnement, les officielles sont dans `content/placeholders.ts`.

- **Analytics : Vercel Web Analytics.** Pas de cookie, donc pas de bandeau de consentement, et un impact négligeable sur la performance.

- **Données fictives (chiffres clés, actualités de test)** : autorisées pour les tests, isolées dans `content/placeholders.ts` et dans les données de test (seed), chacune commentée comme fictive. Leur remplacement est un point bloquant de la checklist de mise en ligne.

- **Partenaires : noms affichés uniquement, sans logo.** `presentation_projet.md` §11 exige une autorisation avant tout usage de logo.

- **Pages AGRI'SUP et Admission :** une page par rubrique, avec des ancres pour les sous-parties (`/agrisup#histoire`).

- **Page Mentions légales et confidentialité** ajoutée au MVP. Les formulaires collectent des données personnelles (loi malienne n° 2013-015).

- **Logo provisoire :** `logo_1.jpg`, signalé comme provisoire, en attendant les SVG officiels. Écarts relevés avec la charte : « Privée » absent, pas de vert dans l'emblème, format matriciel.

- **Images fournies :** les affiches 1 à 4 sont générées par IA et montrent des personnes fictives. Elles ne seront pas présentées comme des photos de l'école ; elles servent d'inspiration pour les annonces de test.
  L'image 5 (photo réelle du kakémono) sert de **source documentaire** pour la liste des formations, à confirmer.

### Phase 1

- **Next.js 16.3 + next-intl 4.** Next.js 16 remplace `middleware.ts` par `src/proxy.ts`.
  `AGENTS.md` (généré et maintenu par Next.js) est importé dans `CLAUDE.md` : il renvoie vers la documentation embarquée dans `node_modules/next/dist/docs/`.
- **URL :** `/` redirige vers `/fr` ou `/en` selon la langue du navigateur. Les anciennes formes (`/fr/mentions_legales`, `/en/formations`) redirigent vers les URL publiques (`/fr/mentions-legales`, `/en/programs`).
- **Cookie `NEXT_LOCALE`** posé par next-intl pour mémoriser la langue. C'est un cookie fonctionnel, exempté de consentement ; il sera mentionné dans la page Mentions légales.
- **Typage des traductions** d'après `messages/fr.json` : une clé manquante ou mal orthographiée provoque une erreur TypeScript.
- **Prettier + eslint-config-prettier** pour une mise en forme uniforme. `.gitattributes` force les fins de ligne LF (le poste de développement est sous Windows).
- **`.env.example` sans coordonnées réelles :** les coordonnées de test (numéro et email personnels) vont uniquement dans `.env.local`, qui n'est pas versionné.
### Phase 2

- **Variables ajoutées** dans `src/styles/tokens.css`, chacune marquée `[AJOUT]` avec sa source. En plus de la liste ci-dessus : `--color-on-photo` (#F3F4F6, déjà dans la charte), `--border-width`, les graisses, l'anneau de focus, `--opacity-disabled` et `--line-length`.
- **Contrastes vérifiés par calcul** : tous les textes respectent le niveau AA dans les deux thèmes (minimum 4,84:1). En revanche, `--color-border` (#E5E7EB, 1,18:1) ne suffit pas pour le contour d'un champ de formulaire (WCAG 1.4.11 exige 3:1). Les champs utiliseront donc `--color-text-muted` (7,2:1) en phase 3, sans nouvelle variable.
- **Polices auto-hébergées par `next/font`** : aucune requête vers Google côté visiteur. `--font-heading` et `--font-body` pointent vers les variables de next/font, car next/font renomme les familles.
- **Thème** : l'état est porté par `<html data-theme>`, posé par un script dans le `<head>` avant le premier affichage. Clé `localStorage` : `agrisup_theme`. Tant que l'utilisateur n'a rien choisi, le site suit les changements de préférence du système.
- **Échelle typographique** : valeurs mobiles par défaut, valeurs desktop à partir de 1024 px. La charte ne définit pas de valeurs tablette. H5 et H6 n'existent pas dans la charte : H5 reprend la taille H4 et H6 celle du texte courant.
- **Page `/guide-style`** : outil de contrôle visuel, 404 en production et non indexée.

### Phase 3

- **Header desktop sur deux rangées (≥ 1024px)** : logo et actions (langue, thème, Préinscription), puis la navigation. Sur une seule rangée, le bouton Préinscription débordait à 1024px. Une rangée unique aurait demandé un point de rupture à 1280px, absent de la charte.
- **Menu mobile (< 1024px)** : panneau déroulant fermé par Échap (le focus revient au bouton), par un clic à l'extérieur ou par le choix d'un lien. Il contient aussi la langue et le bouton Préinscription, cachés dans le header sous 640px.
- **Logo** : emplacement provisoire volontairement visible (contour pointillé or + « Logo provisoire »), large d'au moins 120px. Il sera remplacé par les SVG officiels.
- **CTA WhatsApp persistant** : bouton flottant en bas à droite sur toutes les pages (cahier §20). Il n'apparaît que si `NEXT_PUBLIC_WHATSAPP_NUMBER` est renseigné ; même règle pour l'email avec `NEXT_PUBLIC_CONTACT_EMAIL`.
- **Coordonnées** centralisées dans `src/content/placeholders.ts`, avec source et statut pour chaque valeur.
- **Accordéon en `<details>/<summary>`** natif : accessible et sans JavaScript.
- **Champs de formulaire** : label relié, aide et erreur annoncées via `aria-describedby`, astérisque doublé d'un texte pour les lecteurs d'écran, contour en `--color-text-muted` (contraste 3:1 minimum).
- **Le contenu principal `<main id="contenu">` est dans le layout** : les pages ne rendent plus leur propre `<main>`.

### Dépendances

- **`npm audit`** signale 5 vulnérabilités « high » dans `micromatch`, via `eslint-config-next`. Ce sont des **outils de développement uniquement**, qui ne sont pas livrés en production. Je ne corrige pas avec `--force`, car cela casserait la configuration ESLint ; à revoir à la prochaine version de `eslint-config-next`.
