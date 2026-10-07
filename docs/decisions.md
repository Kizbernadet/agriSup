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

### Enrichissement UX/UI (demande de la cliente)

- **Variables ajoutées** (`[AJOUT — enrichissement UI]` dans `tokens.css`) : `--color-action-soft` et `--color-accent-soft` (vert et or de la charte à 8–14 % d'opacité, pour les pastilles d'icônes et les halos), `--shadow-card-hover` (aucune ombre en sombre, conformément à la charte), `--transition-slow` (600 ms), `--reveal-distance`, `--reveal-stagger` (80 ms).
- **Apparition au défilement par un script en ligne** (`reveal_script.tsx`, ≈ 1 Ko) et non par React : le contenu n'attend pas le chargement du JavaScript de l'application. Sans JavaScript ou avec « mouvement réduit », rien n'est masqué. Le bandeau d'accueil n'est jamais animé (premier affichage). Indicateur `data-js` sur `<html>` (et non une classe, que React pourrait réécrire).
- **Compteurs animés** des chiffres clés : la valeur finale reste dans le HTML (référencement, lecteurs d'écran).
- **Icônes SVG maison** (aucune bibliothèque) : une par domaine, étapes, sections. Toujours décoratives (`aria-hidden`), le sens est porté par le texte.
- **Contenu ajouté** (`src/content/domains.ts`, à valider) : description générale de chaque domaine, exemples de métiers du secteur (affichés « à titre indicatif », distincts des débouchés de la formation qui restent `[À FOURNIR]`), description des étapes pédagogiques, section « secteur agricole » sans aucun chiffre.
- **Accueil** : nouvelles sections « Nos domaines de formation » (lien direct vers le catalogue filtré `?domaine=`) et « Se former aux métiers d'un secteur essentiel » ; surtitres de sections ; bandeau final.
- **Correctif de non-régression** : la lecture des paramètres d'URL (`?domaine=`, `?formation=`) se fait après le chargement et non via `useSearchParams`, qui empêchait le pré-rendu serveur du catalogue et du formulaire (contenu invisible sans JavaScript). Un test e2e le vérifie désormais.
- **Audit axe en « mouvement réduit »** : l'audit porte sur l'état final des pages, sans éléments en cours d'apparition.

### Version « plus vivante » (demande de la cliente)

- **Logo `logo_1.jpg` intégré** (en-tête et pied de page) : marges blanches retirées par `scripts/prepare_images.ts` (`npm run images`), sans retouche du dessin. Icône d'onglet = emblème seul (charte §7). En thème sombre, faute de version inversée, le logo est posé sur une plaque claire. Rappel : le texte du logo omet « Privée ». À remplacer par les SVG officiels.
- **Icônes** : Heroicons (MIT) pour l'interface ; Font Awesome Free (CC BY 4.0, attribution dans les mentions légales) pour le logo officiel WhatsApp et les icônes métier (vache, poisson, pousse, tracteur…). Les tracés Font Awesome sont dessinés directement en SVG : ni feuille de style ni composant React supplémentaire (`react-fontawesome` retiré). Le glyphe WhatsApp reprend la couleur d'action de la charte (pas le vert de la marque WhatsApp, absent de la charte).
- **Carrousel du bandeau d'accueil (Embla, ≈ 7 Ko)** : 3 diapositives (formations, préinscription, domaines) avec appels à l'action, pastilles flottantes, zoom lent, barre de progression. Accessibilité : diapositives inactives `inert`, pause au survol/focus, bouton pause, pas d'autoplay en « mouvement réduit ». Performance : 1re diapositive rendue côté serveur, image prioritaire, pas d'animation au premier affichage ; un seul H1 (1re diapositive).
- **Images** : scènes photographiques extraites des affiches (générées par IA), **sans leurs textes** — l'affiche « Formez-vous aujourd'hui » porte un numéro erroné (+223 91 91 34 78) et n'est jamais affichée en entier. Kakémono (seule photo réelle) recadré sur la bannière. À remplacer par de vraies photos.
- **Assistant FAQ** (`src/components/faq_bot/`) : réponses prédéterminées issues de `src/content/faq.ts`, recherche par mots-clés (accents ignorés, fr/en), repli vers WhatsApp et le formulaire. **Pas d'IA, pas de service externe, aucune donnée enregistrée** : distinct du « chatbot IA » exclu du MVP. Panneau chargé uniquement à la première ouverture. Nouvelle question FAQ « frais de scolarité » (sans montant).
- **Boutons** : reflet lumineux au survol (placé sous le texte), élévation et ombre teintée (aucune ombre en sombre), remplissage progressif du bouton secondaire, flèche qui glisse, enfoncement au clic. Arrondi de 8 px conservé (charte §5).
- **Nouvelles sections** : bandeau bleu marine des chiffres clés, galerie « AGRI'SUP en images » (mosaïque + visionneuse `<dialog>` native), bandeau final sur photo voilée, axes de formation avec icônes, kakémono sur la page AGRI'SUP.
- **Variables ajoutées** : `--color-band-*` (bandeau, contrastes 5,5 à 13:1), `--photo-scrim` (voile 82 %), `--button-sheen`, `--shadow-button-hover`.
- **Tests** : 51 unitaires (dont la recherche de l'assistant), 52 de bout en bout (carrousel, assistant, galerie) ; axe 0 violation.

### Refonte du bandeau d'accueil et de la navigation (lot 1)

- **Accueil uniquement** : le bandeau plein écran utilise une photo en fond, avec le logo dans une barre supérieure transparente et la navigation sur une surface adaptée au thème. Les pages internes gardent un en-tête thématique classique.
- **Carrousel manuel** : retrait des flèches, du bouton pause et des pastilles flottantes. Les indicateurs de diapositives restent accessibles ; sans commande de pause, le carrousel ne défile pas automatiquement.
- **Contenu des diapositives** : une diapositive par contexte (présentation, pratique, admissions et écosystème), avec un appel à l'action cohérent ; la préinscription est proposée dans la diapositive Admissions. Les détails des collaborations restent à confirmer malgré l'autorisation d'afficher les noms et logos communiquée par la cliente.
- **Menu mobile** : le panneau reprend les surfaces, bordures et couleurs du thème actif, et reste contenu dans la largeur de l'écran.
- **Vérification du lot** : lint, TypeScript, build de production ; 51 tests unitaires, 4 tests E2E des interactions d'accueil et 4 audits axe de l'accueil (fr/en, thèmes clair/sombre).

### 2026-10-04 — Enrichissement éditorial et fiabilisation (lot 2)

- **Pas de chiffres de catalogue sur l'accueil** tant que les fiches ne sont pas validées ; les domaines sont présentés sans nombres de formations.
- **Fiches formation provisoires** : les contenus non vérifiés restent explicitement signalés ; durée et crédits ne s'affichent et ne sont servis par l'API que lorsqu'ils sont vérifiés. Les exemples de métiers et de secteurs au Mali et à l'international sont généraux, non des débouchés garantis. Les actes vétérinaires restent soumis à la réglementation.
- **Actualités** : une actualité doit être publiée, datée et vérifiée pour être accessible sur le site et l'API. Les actualités fictives du seed restent en brouillon.
- **Contenu institutionnel** : les éléments non confirmés (offre, admission, domaines, coordonnées, partenaires et collaborations) sont présentés comme provisoires ou renvoyés à l'établissement. L'ancienne section de chiffres clés est retirée plutôt que de communiquer des valeurs issues du catalogue provisoire.
- **Validation** : lint, TypeScript, build de production, Prettier, 51 tests unitaires, 35 tests E2E ciblés (accessibilité, API, accueil) et 5 tests E2E du catalogue réussis.

### Dépendances

- **`npm audit`** signale 5 vulnérabilités « high » dans `micromatch`, via `eslint-config-next`. Ce sont des **outils de développement uniquement**, qui ne sont pas livrés en production. Je ne corrige pas avec `--force`, car cela casserait la configuration ESLint ; à revoir à la prochaine version de `eslint-config-next`.

### 2026-10-04 — Finition de la navigation et partenaires

- **Navigation** : icônes décoratives, apparition gauche→droite des liens sur desktop et panneau mobile animé à l'ouverture/fermeture. Le menu conserve la fermeture par Échap, clic extérieur et navigation, ainsi que le focus visible et le support de `prefers-reduced-motion`.
- **Partenaires** : carrousel Embla en boucle avec lecture automatique, commandes précédente/suivante et pause/lecture ; le mouvement automatique est désactivé quand le visiteur demande une réduction des animations. Les descriptions continuent de préciser que les relations doivent être confirmées ; seul le logo réellement fourni est affiché, sans substituer de visuel inventé à l'IER.
- **Admission** : descriptions des étapes limitées au parcours déjà présenté et aux réserves officielles ; mise en grille adaptative pour éviter cinq colonnes trop étroites.
- **Style** : les liens du fil d'Ariane n'ont plus de soulignement (ce n'est pas un lien de prose) ; l'encadré « Le domaine en bref », le support du logo et la topbar sombre utilisent des dégradés dérivés des variables existantes, sans ajout de couleur à la charte.

### 2026-10-04 — Ajustements de finition visuelle

- **Navigation sombre** : texte et icône partagent la même couleur ; l'état actif, le survol et le focus passent à l'or de la charte.
- **CTA des diapositives** : contour et texte clairs au repos, fond or au survol avec texte sombre pour conserver le contraste. Les autres boutons ne changent pas.
- **Cartes Admission et Pédagogie** : conservation des cartes numérotées, retrait des icônes et traits de liaison décoratifs.
- **Partenaires** : texte à gauche et logo à droite ; retrait du libellé « Lire » tout en gardant un contrôle pause/reprise accessible et le respect de `prefers-reduced-motion`.

### 2026-10-04 — Compaction du carrousel et contenus sans champs vides

- **Carrousel partenaires** : cartes compactées sur mobile et desktop ; descriptions raccourcies et visuel réduit pour limiter la hauteur sans sacrifier la lisibilité.
- **Contenus manquants** : les sections ou coordonnées non disponibles sont désormais omises plutôt qu'affichées sous forme de marqueurs. Les mentions légales conservent leur avertissement de validation ; aucune donnée officielle absente n'est inventée.
- **Admission** : les listes de conditions et pièces non confirmées sont remplacées par des indications pratiques et un lien de contact.

### 2026-10-05 — Préparation du premier déploiement

- **Focus visible sur fonds sombres** : en thème clair, le contour de focus (bleu nuit) se confondait avec le fond des bandeaux et des photos. Il passe localement à l'or du bandeau (`--color-band-accent`, déjà dans la charte) sur le hero, le bouton du bandeau final, la carte « Conditions », l'en-tête de l'assistant FAQ et les sections `band`.
- **Étapes « Rejoindre » de l'accueil** : générées depuis un tableau ; toute la carte est cliquable (lien étendu) pour garantir une cible ≥ 44px, avec élévation au survol et au focus.
- **Indexation bloquée par défaut** : tant que des coordonnées et contenus de test sont en ligne, `robots.txt` interdit l'exploration et chaque page porte `noindex`. Variable `SITE_INDEXING=enabled` à poser au lancement officiel (phase 8 / SEO).

### 2026-10-05 — Assistant FAQ agrandi et plus fiable

- **Taille** : plein écran sur mobile ; à partir de 640px, fenêtre de 480px de large sur presque toute la hauteur disponible (plafonnée à 768px). Le panneau est rendu à la racine du document (portail React) pour passer au-dessus de l'en-tête du site.
- **Questions proposées** : 9 questions de base pour la démonstration (`FAQ_BOT_ITEMS`). La page FAQ conserve toutes les questions. Aucune nouvelle question ni réponse n'a été ajoutée.
- **Parcours** : questions affichées en liste lisible dans la conversation ; après une réponse, 3 suggestions et « Voir toutes les questions » ; bouton « Recommencer » ; réponse polie à « bonjour » / « merci ».
- **Compréhension** : mots-clés des domaines de formation (élevage, aquaculture…) et du mot « où » ajoutés, couverts par des tests unitaires.

### 2026-10-07 — Images nettes, ruban des partenaires et coordonnées officielles

- **Netteté des photos** : les photos fournies font 800 à 2048px de large. Le hero ne les étire plus en fond plein écran (agrandissement ×2 à ×3, d'où le flou) : texte à gauche, photo encadrée à droite à ses proportions d'origine, plafonnée en hauteur. Sur mobile, photo au-dessus du texte. Qualité de compression 90 (au lieu de 75) pour le hero, la galerie et la visionneuse (`images.qualities`).
- **Hero** : batiment_1, batiment_3 (remplace etudiants_3, trop petite à 800px), etudiants_2, etudiants_1. etudiants_3 sert d'aperçu à la vidéo, affichée à sa taille.
- **Galerie** : mosaïque de 9 vraies photos de tailles variées (2 × 2, 2 × 1, 1 × 2), placement `dense`. Les images générées par IA ne sont plus utilisées sur l'accueil (galerie, bandeau final, aperçu vidéo).
- **Partenaires** : ruban à défilement continu en CSS, cartes de moitié plus étroites, logo et texte en `space-evenly`. **Sans bouton de contrôle, à la demande explicite de la cliente**, malgré le critère WCAG 2.2.2 (pause, arrêt, masquage) ; compensations : pause au survol et au focus, ruban immobile avec `prefers-reduced-motion`. À réévaluer avant le lancement officiel.
- **Coordonnées** : email officiel `agrisup.bamako@yahoo.fr` (kakémono) en dur dans `content/placeholders.ts` ; la variable `NEXT_PUBLIC_CONTACT_EMAIL` est supprimée. WhatsApp reste le numéro de test (variable d'environnement). Repère « près du terrain de football du Stade Malien » ajouté. L'adresse ouvre Google Maps sur les coordonnées GPS fournies (12.663, -7.931).
- **Sources non retenues** : le domaine `agrisup-mali.com` (kakémono) ne répond pas ; les pages Facebook ne sont pas consultables sans compte ; AGRI'SUP n'apparaît pas dans la liste DGESRS des établissements privés. Aucun lien ni agrément n'est donc affiché.
- **En-tête (ordinateur)** : logo, menu et actions sur une seule ligne ; menu sans bordure, de la hauteur du logo (60px), liens répartis en `space-evenly`. L'en-tête est plus large que le contenu (1200px + 2 × 64px) à la demande de la cliente — écart assumé à la largeur maximale de la charte §6, limité à l'en-tête. Sur l'accueil, les couleurs passent localement aux teintes « bandeau » (variables redéfinies sur l'en-tête). Les icônes du menu s'affichent seulement si le cadre est assez large (requête de conteneur, pas de nouveau point de rupture de page).
- **Hero** : version en dégradé essayée puis abandonnée à la demande de la cliente ; retour au cadre or décalé. Photos agrandies au maximum net : colonne photo élargie (1,1 fr), hauteur jusqu'à 76 % de l'écran ; sur mobile, proportions d'origine (aucun recadrage des photos horizontales).
- **Galerie « puzzle »** : zones nommées par photo (`grid-template-areas`), formes adaptées au format de chaque image, disposition asymétrique sur 2, 6 et 12 colonnes ; légère inclinaison et coins irréguliers. Les légendes permanentes et les loupes sont remplacées par un voile dégradé, une pastille « agrandir » et la légende, révélés au survol ou au focus (la légende reste le nom accessible du bouton).

### 2026-10-07 — Lot 2 : contenus

- **Fiches formations** : 12 fiches complètes (présentation, objectifs, compétences, programme indicatif par année, débouchés) dans `prisma/formation_content.ts`, appliquées en base par `npm run db:seed`. Intitulés et niveaux : kakémono officiel. Durées LMD confirmées par la cliente : licence professionnelle 6 semestres / 180 crédits, DUT 4 semestres / 120 crédits. Textes rédigés pour le site, validés pour la démonstration par la cliente ; `verified = true` (badges « à confirmer » retirés). Conditions d'admission et pièces par formation non rédigées (information institutionnelle).
- **Mentions « à confirmer » retirées** là où l'information est sûre (offre de formation, durées, coordonnées, infrastructures visibles sur les photos). Conservées : repères historiques (non vérifiés), brouillon des mentions légales, rappel que la préinscription ne vaut pas admission.
- **Typographie française** : espaces insécables avant « : ; ? ! » et dans les guillemets, appliquées aux messages FR, aux contenus FR (`src/content`) et au seed (`frenchTypography`, `src/lib/typography.ts`).
- **Page AGRI'SUP** : nouvelle section « Infrastructures » illustrée (laboratoire, salle informatique, salles de cours, champ d'expérimentation et matériel).
- **Page Formations illustrée** : en-tête en deux colonnes (`PageHeader` accepte un visuel `aside`) avec trois supports officiels en éventail — affiche « Inscriptions ouvertes » (`annonce_1`, version 1080px de `poster_1`), kakémono et affiche LMD (`poster_2`, 590px, affichée en dessous de cette taille). Composant dédié `PosterFan`, sans clic ni légende (choix de la cliente), affiches agrandies au maximum de la colonne ; effet au survol conservé. Correctif : la visionneuse est recentrée (`margin: auto`, annulé par la remise à zéro de base.css).
- **Motifs décoratifs** : `npm run motifs` (scripts/generate_motifs.ts) génère dans `assets/motifs/` une tuile vectorielle 480 × 480 px raccordable, en thème clair et sombre (avec fond et transparente), et un visuel PNG 1920 × 1080 pour chaque thème. Icônes Font Awesome Free (CC BY 4.0, déjà attribuées), couleurs et fonds de la charte, opacités faibles pour rester un fond discret.
- **Motifs sur le site** (demande de la cliente) : variable `--pattern-image` (motif clair ou sombre selon le thème, tuiles transparentes dans `public/images/motifs/`) appliquée à l'en-tête des pages intérieures, au pied de page et à l'appel à l'action de la FAQ (`Section pattern`). Tuile affichée à 384px.
- **Logo officiel** : le sceau rond fourni (assets/logo/agrisup_2.jpg) remplace logo_1. Détouré en cercle sur fond transparent par `npm run images` (public/logo/sceau_agrisup.png, 788px), sans retouche du dessin. En-tête : 60px (choix de la cliente, écart assumé au minimum de 120px de la charte §7 ; seul « AGRI'SUP » y est lisible). Pied de page : 160px, texte lisible. L'icône d'onglet reste l'emblème de logo_1 (le sceau est illisible à 64px). À noter : le sceau mentionne le site agrisup-mali.com, qui ne répond plus.
- **Motif au sceau** : `npm run motifs` génère aussi `motif_logo_<thème>` (tuile 960px façon tampon monochrome, avec ou sans fond, et visuel 1920 × 1080), à partir du sceau détouré.
- **Logo officiel** : le sceau rond (`assets/logo/agrisup_2.jpg`, détouré en cercle par `npm run images` → `public/logo/sceau_agrisup.png`) remplace le logo précédent. En-tête : 56 à 60px, en dessous des 120px de la charte §7, **choix de la cliente** (seul « AGRI'SUP » y reste lisible) ; pied de page : 160px, texte lisible. Plus de plaque ni de bordure : le sceau a son propre fond blanc. L'icône d'onglet reste l'emblème de l'ancien logo. Le sceau affiche des coordonnées et le site `agrisup-mali.com` (hors service) : à faire corriger sur le fichier source par l'établissement.
- **Motif au sceau** : `npm run motifs` génère aussi `motif_logo_<thème>` (tuile PNG 960px à afficher à 480px, version transparente, visuel 1920 × 1080), sceau monochrome façon tampon, vert et or de la charte.
- **Motif du site** : le motif au sceau remplace le motif à icônes pour `--pattern-image` (tuiles transparentes WebP de 960px, environ 94 Ko, affichées à 384px). Le motif à icônes reste disponible dans `assets/motifs/` et `public/images/motifs/`.

### 2026-10-07 — Déploiement : un seul projet Vercel

- **Projet retenu** : `agri-sup-bbj9` (https://agri-sup-bbj9.vercel.app), relié au dépôt GitHub `Kizbernadet/agriSup` ; chaque envoi sur `main` déploie en production.
- **Doublon supprimé** : un ancien projet `agri-sup`, relié au même dépôt et sans variables d'environnement, échouait à chaque envoi. Supprimé par la cliente le 2026-10-07.
- **Variables d'environnement** (Vercel > Settings > Environment Variables) : `DATABASE_URL`, `RATE_LIMIT_SECRET`, `NEXT_PUBLIC_WHATSAPP_NUMBER` (numéro de test), `FORMS_NOTIFICATION_EMAIL`, `NEXT_PUBLIC_SITE_URL` ; `RESEND_API_KEY` à ajouter pour l'envoi des emails ; `SITE_INDEXING` absente tant que l'indexation doit rester bloquée.

