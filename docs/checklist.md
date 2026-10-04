# Checklist — Avant le lancement du premier prompt Claude Code

## 1. Organisation du dossier
- [ ] Créer le dossier principal du projet
- [ ] Créer le sous-dossier `docs/` et `docs/prompts/`
- [ ] Créer le sous-dossier `assets/` (logo, photos, annonces)

## 2. Documents non graphiques (format .md dans `docs/`)
- [ ] `description-projet.md` : description complète du projet
- [ ] `presentation-projet.md` : contenu de la présentation, converti en Markdown
- [ ] Autres fichiers identifiés lors de l'ajustement du prompt initial (contenus, pages, fonctionnalités…)
- [ ] Relire chaque fichier : informations à jour, sans contradiction entre eux

## 3. Prompts sauvegardés (dans `docs/prompts/`)
- [ ] Prompt Claude Code initial (version ajustée)
- [ ] Prompt Gemini (analyse du logo + charte graphique)
- [ ] Prompt Ideogram (génération des propositions de logo, export PNG)

## 4. Matériel graphique brut (dans `assets/`)
- [ ] Logo actuel de l'université (meilleure qualité disponible, PNG ou SVG si possible)
- [ ] Photos d'étudiants (vérifier les droits d'utilisation et les autorisations)
- [ ] Anciennes annonces / affiches

## 5. Volet graphique (Gemini + Ideogram)
- [ ] Gemini : analyse du logo actuel et choix d'une direction
- [ ] Ideogram : génération des propositions de logo selon cette direction (PNG)
- [ ] Sélection de la ou des meilleures propositions → `assets/logo/propositions-ideogram/`
- [ ] Gemini : charte graphique complète (couleurs hex, typographies Google Fonts, règles du logo, style visuel)
- [ ] Enregistrer le résultat dans `docs/charte-graphique.md`

## 6. Préparation finale de Claude Code
- [ ] `CLAUDE.md` placé à la racine du projet
- [ ] `CLAUDE.md` renvoie vers les fichiers de `docs/` (description, présentation, charte graphique)
- [ ] Choix techniques confirmés (option A retenue)
- [ ] Relecture globale : tout est cohérent et rien ne manque

## 7. Lancement
- [ ] Ouvrir Claude Code dans le dossier principal
- [ ] Lancer le prompt initial
- [ ] Demander d'abord à Claude Code un plan d'action à valider avant toute écriture de code