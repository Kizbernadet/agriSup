# Mission initiale — Site web institutionnel AGRI'SUP Mali

## Contexte

Tu vas développer avec moi le site web institutionnel d'AGRI'SUP Mali, un établissement d'enseignement supérieur agricole. Ce site doit refléter un niveau **professionnel** : il représente l'université auprès des futurs étudiants, des parents, des partenaires et des institutions.

Les règles permanentes du projet sont dans `CLAUDE.md`. Tu dois les respecter pendant toute la durée du projet.

## Étape 1 : Lecture obligatoire

Avant toute chose, lis intégralement et dans cet ordre :

1. `CLAUDE.md`
2. `docs/description_projet.md`
3. `docs/presentation_projet.md`
4. `docs/charte_graphique.md`
5. `docs/checklist.md`

Explore ensuite le contenu de `assets/` (logo, photos, annonces) pour savoir de quelles ressources nous disposons réellement.

## Étape 2 : Synthèse de compréhension

Rédige une synthèse courte qui montre que tu as compris :

- l'objectif du site et ses publics cibles ;
- les pages et fonctionnalités attendues ;
- les contraintes graphiques principales (double thème, accessibilité WCAG AA, variables CSS) ;
- les ressources disponibles et celles qui **manquent** (logo final, photos, textes, etc.).

## Étape 3 : Questions

Liste toutes les questions dont tu as besoin des réponses pour bien travailler : informations absentes, contradictions entre documents, choix à faire. Classe-les par priorité (**bloquante** / **importante** / **secondaire**).

N'invente aucune information sur l'université : noms, chiffres, formations, contacts, dates. Si un contenu manque, prévois un texte provisoire clairement marqué `[À FOURNIR]` et signale-le-moi.

## Étape 4 : Proposition technique

Propose **2 options de stack technique** maximum, avec pour chacune les avantages, les inconvénients et ta recommandation. Tiens compte de ces contraintes :

- **Public majoritairement sur mobile**, avec des connexions parfois lentes ou instables : le site doit rester léger et rapide (objectif Lighthouse ≥ 90 en performance et en accessibilité).
- Les contenus (actualités, annonces, formations) devront pouvoir être mis à jour facilement, idéalement par une personne non développeuse.
- Hébergement simple et peu coûteux.
- Maintenabilité sur le long terme.

## Étape 5 : Plan de développement

Propose un plan découpé en **phases courtes et testables**, par exemple :

1. Initialisation du projet et arborescence (snake_case)
2. Fondations : variables CSS de la charte, typographies, double thème
3. Composants communs : header avec toggle, footer, boutons, cartes
4. Pages, une par une, dans l'ordre de priorité
5. Optimisation des images, performance, SEO
6. Tests d'accessibilité et responsive
7. Préparation à la mise en ligne

Pour chaque phase, indique ce qui sera livré et comment je pourrai le vérifier.

Propose aussi l'**arborescence complète** des fichiers du projet, en snake_case.

## Règles pour cette première session

- **N'écris aucun code et ne crée aucun fichier pour l'instant.**
- Attends ma validation explicite du plan et de la stack avant de commencer.
- Une fois le plan validé, ajoute-le dans `docs/plan_developpement.md` et tiens à jour `docs/checklist.md` à la fin de chaque phase.
- Pendant tout le projet, travaille **phase par phase** : à la fin de chaque phase, fais-moi un résumé de ce qui a été fait et de ce qui reste, puis attends mon accord pour continuer.
- Réponds en français.