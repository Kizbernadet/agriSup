# Points à régler avant le lancement officiel

> État au 9 octobre 2026. Site en ligne : https://agri-sup-bbj9.vercel.app (non indexé par Google).
> Chaque point indique **qui** agit : **AGRI'SUP** (fournir ou valider une information) ou **Dev** (intervention technique).
> Cocher la case quand le point est réglé.

## 1. Bloquant : le site n'est pas opérationnel sans ces points

- [ ] **Recevoir les formulaires par email** (AGRI'SUP puis Dev)
  Aujourd'hui, les préinscriptions et les messages de contact sont enregistrés en base, mais aucun email n'est envoyé.
  - AGRI'SUP : créer un compte gratuit sur resend.com et indiquer l'adresse qui doit recevoir les notifications.
  - Dev : ajouter `RESEND_API_KEY` et `FORMS_NOTIFICATION_EMAIL` dans Vercel (Settings > Environment Variables), puis tester un envoi réel.
- [ ] **Numéro WhatsApp officiel** (AGRI'SUP puis Dev)
  Le bouton WhatsApp utilise encore un numéro de test (+34…).
  - AGRI'SUP : choisir le numéro, +223 74 98 74 47 ou +223 66 72 43 89.
  - Dev : renseigner `NEXT_PUBLIC_WHATSAPP_NUMBER` dans Vercel, puis redéployer.
- [ ] **Mentions légales** (AGRI'SUP puis Dev)
  - AGRI'SUP : donner le nom et la fonction du responsable de la publication, puis relire la page.
  - Dev : renseigner `LEGAL.publicationManager` dans `src/content/placeholders.ts` et retirer l'avertissement « brouillon ».
- [ ] **Ouvrir le site à Google le jour du lancement** (Dev)
  Mettre `SITE_INDEXING=enabled` dans Vercel, vérifier `robots.txt`, ajouter le plan du site (`sitemap.xml`) et les aperçus de partage (Open Graph), puis déclarer le site dans Google Search Console.

## 2. Contenus à valider par AGRI'SUP

- [ ] **Photos associées aux formations et aux domaines**, par exemple le compostage pour le DUT Fumure organique, la couveuse pour l'aviculture et les bassins pour l'aquaculture (liste dans `src/content/visuals.ts`).
- [ ] **Textes des infrastructures** rédigés d'après les photos : bibliothèque (« ouvrages et postes informatiques ») et bus de l'école (« sorties pédagogiques et visites de terrain »).
- [ ] **Partenaires** :
  - [ ] confirmer AFG Bank, absente des derniers documents ;
  - [ ] fournir les logos manquants et l'adresse du site web de chaque partenaire ;
  - [ ] obtenir l'accord écrit des partenaires pour afficher leur logo.
- [ ] **Frais de scolarité**, affichés comme indicatifs : confirmer les montants et l'année académique.
- [ ] **FAQ et assistant** : relire les 9 réponses (`src/content/faq.ts`).
- [ ] **Traductions anglaises** : faire relire par un anglophone.

## 3. Important : rendre le site plus vivant

- [ ] **Actualités** (AGRI'SUP fournit, Dev publie) : la page est vide. Il faut 2 ou 3 vraies actualités. Sujets possibles d'après les photos et documents :
  - la convention avec l'IPR/IFRA ;
  - la décision de création du 1er juillet 2026 ;
  - l'ouverture des inscriptions ;
  - l'accueil des nouveaux élèves orientés en 2026-27 ;
  - une sortie pédagogique.
- [ ] **Vidéo de présentation** (AGRI'SUP) : fournir le lien YouTube, sinon le bloc affiche « Vidéo à venir ».
- [ ] **Mot du fondateur** (AGRI'SUP) : nom, fonction et court texte validé. Une photo existe déjà (`fondateur.jpg`).
- [ ] **Témoignages** (AGRI'SUP) : 2 ou 3 citations d'étudiants ou de diplômés, avec leur accord.
- [ ] **Chiffres clés sur l'accueil** (Dev) : bandeau à partir de données vérifiées (depuis 2006, 16 formations, 5 domaines, 14 partenaires). Le composant existe déjà.
- [ ] **Réseaux sociaux** (AGRI'SUP) : adresse exacte de la page Facebook (« Agri'sup Sotuba » sur les affiches) et des autres comptes.
- [ ] **Page « Vie étudiante »** (décision AGRI'SUP) : proposée, mais pas encore décidée.

## 4. Technique (Dev)

- [ ] **Performance** : mesurer avec PageSpeed Insights sur le site en ligne (objectif : 90 ou plus sur mobile) et corriger.
- [x] **Application installable (PWA)** : manifeste, icônes (sceau sur fond vert), pages consultées disponibles hors ligne, page hors ligne, avis de mise à jour. Reste à tester l'installation sur un vrai téléphone Android et iPhone.
- [ ] **Test au lecteur d'écran** (NVDA) des pages principales et des formulaires. Les tests automatiques d'accessibilité passent déjà.
- [ ] **Dépôt** :
  - exclure les photos HEIC et les originaux non utilisés (`.gitignore`) ;
  - alléger l'historique si besoin.
- [ ] **Base de données** : supprimer les données de test avant l'ouverture et vérifier la sauvegarde Neon.

## 5. Après le lancement

- [ ] **Nom de domaine** personnalisé (par exemple agrisup.ml ou .com), à configurer dans Vercel, puis domaine d'envoi vérifié chez Resend.
- [ ] **Plan Vercel Pro** : le plan gratuit est réservé à un usage non commercial.
- [ ] **Brochure PDF** téléchargeable.
- [ ] **Statistiques de visite** respectueuses de la vie privée (Vercel Analytics, par exemple).

---

**Rappels pour ajouter du contenu sans développeur expérimenté**

| Contenu à ajouter | Marche à suivre |
|---|---|
| Une photo | La déposer dans `assets/photos/<thème>/`, l'ajouter à `scripts/prepare_photos.ts`, puis lancer `npm run photos`. |
| Un logo de partenaire | Même procédure, puis l'indiquer dans `src/content/partners.ts`. Le mode d'emploi est en tête de ce fichier. |
