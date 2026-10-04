# Checklist de développement — AGRI'SUP

> Mise à jour à la fin de chaque phase. Plan détaillé : `docs/plan_developpement.md`.

## Préparation
- [x] Dossiers `docs/`, `docs/prompts/`, `assets/`
- [x] Documents sources : `description_projet.md`, `presentation_projet.md`, `charte_graphique.md`
- [x] Prompts sauvegardés (Claude Code, Gemini, Ideogram)
- [x] `CLAUDE.md` à la racine, références corrigées
- [x] Stack validée (option A), décisions consignées dans `docs/decisions.md`
- [x] Plan de développement rédigé
- [ ] Logo final en SVG (original, inversé, monochrome, favicon)
- [ ] Photos réelles de l'école (avec droits et autorisations)

## Phases
- [x] 1. Initialisation (projet, arborescence, langues, réorganisation de `assets/`)
- [x] 2. Fondations visuelles (variables, polices, double thème)
- [x] 3. Composants communs
- [x] 4. Données et API de lecture (migrations à appliquer sur Neon)
- [x] 5. Pages : Accueil, Formations, Admission
- [x] 6. Formulaires Contact et Préinscription (notification email active dès l'ajout de la clé Resend)
- [x] 7. Pages : AGRI'SUP, Actualités, FAQ, Contact, Mentions légales
- [ ] 8. Images, performance, SEO, analytics
- [ ] 9. Accessibilité et tests (automatisés en place : 40 unitaires, 48 bout en bout, axe 0 violation ; reste le test manuel NVDA)
- [ ] 10. Mise en ligne

## Avant mise en ligne (bloquant)
- [ ] Chiffres clés fictifs remplacés ou section masquée
- [ ] Actualités de test supprimées
- [ ] Vidéo de présentation fournie (ou section retirée) et image d'aperçu remplacée par un visuel réel
- [ ] Vraies photos de l'école pour le carrousel et la galerie (les scènes actuelles sont générées par IA)
- [ ] Logo : version inversée (thème sombre) et SVG officiels ; texte « Privée » à vérifier
- [ ] Coordonnées de test remplacées par les officielles (téléphone, WhatsApp, email)
- [ ] Liste, durées et conditions des formations validées par AGRI'SUP
- [ ] Partenariats confirmés (et autorisation écrite pour leurs logos, le cas échéant)
- [ ] Traductions anglaises relues
- [ ] Logo officiel SVG intégré
- [ ] Mentions légales validées (responsable de publication, immatriculation, durée de conservation, hébergeur)
- [ ] Historique, vision, mission, direction et infrastructures fournis ou retirés
- [ ] URL des réseaux sociaux et brochure PDF fournies
- [ ] Réponses de la FAQ et de l'assistant validées (`src/content/faq.ts`)
- [ ] Contenus généraux validés : descriptions des domaines, exemples de métiers, étapes pédagogiques, section « secteur » (`src/content/domains.ts`)
- [ ] Clé Resend + `RATE_LIMIT_SECRET` configurées sur Vercel
- [ ] Domaine vérifié chez Resend, domaine personnalisé sur Vercel
- [ ] Passage au plan Vercel Pro (usage commercial)
