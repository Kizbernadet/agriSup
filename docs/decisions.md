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

### Phase 4

- **Prisma 7.10.0** (dernière version stable ; le tag npm « latest » pointait vers une 8.0 RC). Configuration dans `prisma.config.ts`, qui charge `.env.local` via `@next/env` (pas de dépendance `dotenv`). Client généré dans `src/generated/prisma` (non versionné, régénéré par `postinstall`).
- **Pilote `@prisma/adapter-pg`** (PostgreSQL standard) plutôt que le pilote spécifique Neon : il fonctionne avec Neon (URL « pooled ») comme avec une base locale (`npx prisma dev`), ce qui facilite les tests.
- **Schéma** : traductions dans des tables séparées (`*_translations`, une ligne par langue) ; ajouter le bambara = une valeur d'enum + des lignes, sans changer les tables. Tables et colonnes en snake_case côté PostgreSQL.
- **Champ `verified`** sur formations et actualités : `false` = non validé par AGRI'SUP. Toutes les données de test sont à `false` ; à revoir avant la mise en ligne.
- **Préinscription** : email facultatif, téléphone obligatoire (beaucoup de candidats sont joignables uniquement par téléphone ou WhatsApp). Contact : email *ou* téléphone (vérifié par zod en phase 6). Date de consentement stockée.
- **Identifiant d'URL commun aux deux langues** (`licence-pro-agronomie`), validé par la cliente.
- **Domaines** : 5 valeurs validées par la cliente pour les filtres (production végétale, élevage et santé animale, aquaculture, agribusiness, agroforesterie). La répartition de chaque formation est une proposition à confirmer avec AGRI'SUP.
- **Couche d'accès aux données** (`src/lib/data/`) partagée entre les API et les pages, avec repli sur le français si une traduction manque.
- **API en lecture** : paramètres validés par zod (400 si invalides), 404 sur identifiant inconnu, 500 générique sans détail technique (journalisé côté serveur), cache CDN de 5 minutes.

### Phase 5

- **Contenus institutionnels localisés dans `src/content/placeholders.ts`** (présentation, axes, parcours pédagogique, partenaires), avec leur source dans `presentation_projet.md`. Les libellés d'interface restent dans `messages/`.
- **Chiffres clés calculés depuis la base** (nombre de formations, de niveaux et de domaines) plutôt que des chiffres fictifs : rien d'inventé, et mise à jour automatique (cahier §4.3).
- **Pas de photo dans le hero** tant qu'aucune photo réelle de l'école n'est disponible (les affiches fournies sont générées par IA).
- **Filtres des formations côté navigateur** : les 12 formations sont dans la page statique, le filtrage est instantané sans requête serveur (connexions lentes). Sans JavaScript, toutes les formations restent visibles. Boutons `aria-pressed`, nombre de résultats annoncé (`aria-live`).
- **Bandeau « en cours de validation »** sur chaque formation non vérifiée (cahier §6.3), et marqueur `[À FOURNIR]` pour chaque rubrique vide.
- **Pages statiques régénérées toutes les heures** (`revalidate = 3600`) : accueil, liste et détails des formations. Les 24 pages détail (12 × 2 langues) sont générées au build ; une nouvelle formation est rendue à la demande.
- **Lien de préinscription contextualisé** depuis une formation (`?formation=<slug>`), pour la présélection en phase 6 ; message WhatsApp pré-rempli avec le nom de la formation (cahier §10.1).
- **Textes longs en paragraphes simples** (séparés par une ligne vide) et non en Markdown : aucun contenu formaté n'existe encore, inutile d'ajouter une bibliothèque.
- **`sslmode=verify-full`** dans la chaîne Neon : même comportement que `require` avec le pilote actuel, mais explicite (supprime l'avertissement du pilote).

### Ajout : vidéo de présentation (demande de la cliente)

- **Vidéo chargée au clic plutôt qu'un carrousel** : un carrousel pénalise la performance mobile et demande des photos réelles (absentes). La façade ne charge aucune ressource YouTube (environ 1 Mo) avant le clic ; domaine `youtube-nocookie.com`. À mentionner dans la politique de confidentialité (cookies YouTube après lecture).
- **Vidéo non fournie** : `PRESENTATION_VIDEO.youtubeId = null` dans `placeholders.ts` ; la section affiche « Vidéo de présentation à venir ». Il suffira de renseigner l'identifiant YouTube.
- **Image d'aperçu : affiche « Sortie pédagogique »**, choisie par la cliente malgré les réserves (image générée par IA, personnes fictives). Recadrée en 16:9 par CSS sur la scène centrale. À remplacer par une vraie photo ou la miniature de la vidéo officielle.
- **`next/image` au lieu d'un script `sharp` maison** (prévu en phase 8) : AVIF/WebP, `srcset` (8 tailles) et chargement différé automatiques. Mesure : 356 Ko (JPG) → 70 Ko (AVIF, 640 px).

### Phase 6

- **Schémas zod partagés** entre navigateur et serveur (`src/lib/validation/`). Les messages d'erreur sont des clés de traduction : une seule source, deux langues. Le serveur revalide toujours.
- **Chaîne de traitement commune** (`src/lib/form_endpoint.ts`) : JSON obligatoire (bloque les envois croisés depuis un autre site), corps ≤ 16 Ko, limitation de débit, champ piège, validation, enregistrement.
- **Limitation de débit** : 5 envois par IP et par formulaire toutes les 10 minutes, en une requête SQL atomique, réponse 429 avec `Retry-After`. IP stockée sous forme d'empreinte **HMAC** avec la clé `RATE_LIMIT_SECRET` : un simple SHA-256 se retrouverait en testant toutes les IPv4.
- **Champ piège (`website`)** : un robot qui le remplit reçoit une fausse réussite, rien n'est enregistré.
- **Notification email en texte brut** (aucune injection HTML possible). Sans `RESEND_API_KEY`, l'envoi est ignoré et journalisé, mais la demande est enregistrée ; un échec d'envoi ne fait jamais échouer le formulaire.
- **Accessibilité des formulaires** : récapitulatif d'erreurs focalisé avec liens vers chaque champ (dans l'ordre visuel), `aria-invalid`, aides et erreurs reliées par `aria-describedby`, message de réussite focalisé.
- **Préinscription** : formation présélectionnée depuis sa page (`?formation=`), vérifiée en base côté serveur ; années académiques proposées = année en cours et suivante (bascule en juillet, hypothèse à confirmer) ; niveaux d'études génériques à valider ; confirmation avec lien WhatsApp pré-rempli (cahier §10.1).
- **Formulaires sans JavaScript** : non pris en charge (envoi en JSON). Compromis accepté pour le MVP ; WhatsApp et téléphone restent disponibles.

### Phase 7

- **Page AGRI'SUP** : une seule page avec ancres (présentation, histoire, vision et mission, pédagogie, direction). L'historique de `presentation_projet.md` §3 (Ségou, 2006, évolution, Sotuba ACI) est affiché **avec un avertissement « en cours de validation »** : à valider ou retirer avant la mise en ligne (cahier §5.2). Vision, mission, infrastructures et direction : `[À FOURNIR]`. Les noms du fondateur ne sont pas publiés (presentation_projet.md §4).
- **Actualités** : liste paginée (`?page=`, rendue à la demande) et pages détail statiques. Images = affiches de `assets/annonces/` copiées dans `public/images/actualites/` (choix de la cliente), recadrées dans les cartes, affichées entières dans le détail ; voile sombre en thème sombre (charte §8).
- **FAQ** : 10 questions (cahier §12 + LMD + « la préinscription vaut-elle admission ? »), en `<details>` natifs, contenu dans `src/content/faq.ts`. Les réponses ne s'appuient que sur des informations sourcées ou sur le fonctionnement du site.
- **Contact** : coordonnées, itinéraire Google Maps, carte chargée **au clic** (rien n'est envoyé à Google avant), langue de la carte = langue du site. Réseaux sociaux et brochure : `[À FOURNIR]` (aucune URL ni PDF fournis).
- **Mentions légales et confidentialité** : texte provisoire (avertissement visible), référence à la loi malienne n° 2013-015 et à l'APDP, liste des cookies et traceurs (langue, thème, YouTube et Maps au clic). Hébergeur : informations publiques de Vercel, à revérifier.
- **Formulaire de contact** : la règle « email ou téléphone » utilise l'option `when` de zod 4 pour s'afficher en même temps que les autres erreurs.

### Tests automatisés

- **Vitest** (`npm test`) : 40 tests unitaires sur la validation des formulaires, les années académiques, les liens WhatsApp, les traductions de secours et les paramètres d'API. A révélé un vrai défaut : le format `(+223) 66-72-43-89` était refusé (corrigé).
- **Playwright** (`npm run test:e2e`, après `npm run build`) : 46 tests dans le Chrome installé (pas de téléchargement de navigateur) — navigation, langues, thème, menu mobile, filtres, formulaires réels, API, limitation de débit.
- **axe-core** : audit WCAG 2.1 A/AA de 12 pages × 2 thèmes, **0 violation**. Ne remplace pas un test manuel au clavier et au lecteur d'écran.
- Les tests qui écrivent en base utilisent le préfixe « TEST-AUTO » et des IP fictives ; `scripts/cleanup_test_data.ts` (`npm run test:cleanup`) les supprime automatiquement en fin de suite.
- **`@types/node` passé en v22** (exigé par Vitest 5 ; version LTS utilisée par Vercel).
- `getClientIp` extrait dans `src/lib/client_ip.ts` pour être testable sans base de données.

### Dépendances

- **`npm audit`** signale 5 vulnérabilités « high » dans `micromatch`, via `eslint-config-next`. Ce sont des **outils de développement uniquement**, qui ne sont pas livrés en production. Je ne corrige pas avec `--force`, car cela casserait la configuration ESLint ; à revoir à la prochaine version de `eslint-config-next`.
