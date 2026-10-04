# Charte Graphique Visuelle — AGRI'SUP Mali

> **Projet :** Site web institutionnel AGRI'SUP
> **Version :** 2.1 (Dual Theme Clair & Sombre, corrigée pour l'accessibilité)
> **Source :** Proposition Gemini v2.0, revue et complétée
> **Exigence :** Contrastes conformes WCAG 2.1 niveau AA

---

## 1. Typographies

| Rôle | Police | Graisses | Usage |
|---|---|---|---|
| Logo | `Fraunces` (serif) | — | Uniquement dans le fichier logo (SVG). **Non chargée sur le site.** |
| Titres | `Montserrat` (sans-serif géométrique) | 600, 700 | H1 à H6, accroches, chiffres clés |
| Contenu | `Inter` (sans-serif neutre) | 400, 500, 600 | Paragraphes, menus, boutons, formulaires, métadonnées |

- Chargement via Google Fonts avec `font-display: swap`, ou en auto-hébergement pour de meilleures performances.
- Polices de secours : `Montserrat, "Segoe UI", Arial, sans-serif` et `Inter, system-ui, -apple-system, sans-serif`.

### Échelle typographique (mobile → desktop)
| Élément | Mobile | Desktop | Graisse | Interligne |
|---|---|---|---|---|
| H1 | 32px | 48px | 700 | 1.2 |
| H2 | 26px | 36px | 700 | 1.25 |
| H3 | 22px | 28px | 600 | 1.3 |
| H4 | 18px | 22px | 600 | 1.35 |
| Texte courant | 16px | 17px | 400 | 1.6 |
| Petit texte | 14px | 14px | 400 | 1.5 |

- Longueur de ligne maximale du texte courant : environ 70 caractères (`max-width: 70ch`).

---

## 2. Palette de couleurs

### Thème clair (Institutionnel & Lisibilité), thème par défaut
| Rôle | Couleur | Remarque |
|---|---|---|
| Fond global | `#F9FAFB` | |
| Surfaces (cartes) | `#FFFFFF` | |
| Texte principal | `#1F2937` | |
| Texte secondaire | `#4B5563` | Métadonnées, légendes |
| Bordures | `#E5E7EB` | |
| Marque (titres, header) | `#1B2A47` Bleu Académie | |
| Action (boutons) | `#2A724F` Vert Terrain | Texte du bouton en blanc `#FFFFFF` |
| Action survol | `#215C3F` | |
| Accent décoratif | `#C59B2E` Or Moisson | **Décoration uniquement** : filets, puces, soulignements |
| Accent texte/icônes | `#8A6A14` Or foncé | Pour le texte ou les icônes en or |

### Thème sombre (Innovation & Premium)
| Rôle | Couleur | Remarque |
|---|---|---|
| Fond global | `#0C1410` Vert Nuit | |
| Surfaces (cartes) | `#16261E` | |
| Surfaces surélevées | `#1F3328` | Menus déroulants, modales |
| Texte principal | `#E5E7EB` | |
| Texte secondaire | `#9CA3AF` | |
| Bordures | `#2A3D33` | |
| Marque (titres, header) | `#F3F4F6` | |
| Action (boutons) | `#2ECC71` | **Texte du bouton en `#0C1410`, jamais en blanc** |
| Action survol | `#58D68D` | |
| Accent | `#D4AF37` Or brillant | Utilisable pour le texte et les icônes |

### Couleurs d'état (communes, ajustées par thème)
| État | Clair | Sombre |
|---|---|---|
| Succès | `#15803D` | `#4ADE80` |
| Erreur | `#B91C1C` | `#F87171` |
| Avertissement | `#A16207` | `#FACC15` |
| Information | `#1D4ED8` | `#60A5FA` |

---

## 3. Variables CSS (référence pour le développement)

```css
:root,
[data-theme="light"] {
  --color-bg: #F9FAFB;
  --color-surface: #FFFFFF;
  --color-text: #1F2937;
  --color-text-muted: #4B5563;
  --color-border: #E5E7EB;
  --color-brand: #1B2A47;
  --color-action: #2A724F;
  --color-action-hover: #215C3F;
  --color-on-action: #FFFFFF;
  --color-accent: #C59B2E;
  --color-accent-text: #8A6A14;
  --color-focus: #1B2A47;
  --shadow-card: 0 4px 12px rgba(17, 24, 39, 0.08);
  --photo-overlay: transparent;
}

[data-theme="dark"] {
  --color-bg: #0C1410;
  --color-surface: #16261E;
  --color-text: #E5E7EB;
  --color-text-muted: #9CA3AF;
  --color-border: #2A3D33;
  --color-brand: #F3F4F6;
  --color-action: #2ECC71;
  --color-action-hover: #58D68D;
  --color-on-action: #0C1410;
  --color-accent: #D4AF37;
  --color-accent-text: #D4AF37;
  --color-focus: #D4AF37;
  --shadow-card: none;
  --photo-overlay: rgba(0, 0, 0, 0.2);
}

:root {
  --font-heading: "Montserrat", "Segoe UI", Arial, sans-serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;
  --radius: 8px;
  --space-1: 4px;  --space-2: 8px;  --space-3: 16px;
  --space-4: 24px; --space-5: 32px; --space-6: 48px; --space-7: 64px;
  --transition: 200ms ease;
}
```

---

## 4. Gestion du double thème

- **Toggle** soleil/lune dans le header, accessible au clavier, avec `aria-label` explicite (« Activer le mode sombre » / « Activer le mode clair »).
- **Premier chargement :** respecter la préférence système (`prefers-color-scheme`).
- **Mémorisation :** enregistrer le choix de l'utilisateur dans `localStorage`.
- **Pas de flash au chargement :** appliquer le thème via un court script placé dans le `<head>`, avant l'affichage de la page.
- **Transition douce** des couleurs (200ms), désactivée si `prefers-reduced-motion` est activé.

---

## 5. Composants UI

- **Arrondis :** `border-radius: 8px` pour les cartes, images, boutons et champs.
- **Ombres :**
  - Clair : ombre légère et diffuse (`--shadow-card`) sous les cartes.
  - Sombre : pas d'ombre. La hiérarchie passe par les nuances de fond (bg → surface → surface surélevée).
- **Boutons :**
  - Primaire : fond `--color-action`, texte `--color-on-action`.
  - Secondaire : contour `--color-action`, fond transparent.
  - Survol : `--color-action-hover`.
  - Focus clavier : contour visible de 2px en `--color-focus` avec un décalage de 2px (**ne jamais supprimer l'outline**).
  - Désactivé : opacité de 50 %, curseur `not-allowed`.
- **Zones cliquables :** 44 × 44px minimum (usage mobile).
- **Liens dans le texte :** soulignés, couleur `--color-action` (clair) ou `--color-accent` (sombre).

---

## 6. Responsive

| Point de rupture | Largeur |
|---|---|
| Mobile | < 640px |
| Tablette | 640px à 1023px |
| Desktop | 1024px et plus |
| Largeur max du contenu | 1200px, centré |

- Conception **mobile first** : une part importante du public consulte le site sur smartphone, parfois avec une connexion limitée.

---

## 7. Logo — règles d'usage

- **Formats requis :** SVG (prioritaire pour le web) + PNG transparent de secours.
- **Versions :**
  - Originale (thème clair) : texte Bleu Académie `#1B2A47`, emblème or et vert.
  - Inversée (thème sombre) : texte blanc cassé `#F3F4F6`, emblème or `#D4AF37` et vert `#2ECC71`.
  - Monochrome (impressions, tampons) : une seule couleur.
- **Bascule automatique** de la version du logo selon le thème actif.
- **Zone de protection :** espace vide autour du logo au moins égal à la hauteur de la lettre « A » d'AGRI'SUP.
- **Taille minimale :** 120px de large sur le web (ou version emblème seule en dessous).
- **Favicon :** emblème seul, sans texte.
- **Interdits :** déformer, recolorer hors charte, ajouter des ombres ou effets, poser le logo sur une photo chargée sans fond de contraste.
- **Texte alternatif :** `alt="AGRI'SUP Mali — accueil"`.

---

## 8. Direction photographique

- **Sujets :** étudiants en travaux pratiques (laboratoires, champs, élevage), professeurs, campus.
- **Thème clair :** photos lumineuses, scènes de jour en plein air.
- **Thème sombre :** léger assombrissement via `--photo-overlay` (`rgba(0,0,0,0.2)`) pour garder l'immersion.
- **Texte sur photo :** toujours ajouter un dégradé sombre sous le texte pour garantir la lisibilité.
- **Performance :** formats WebP/AVIF, images responsives (`srcset`), chargement différé (`loading="lazy"`) hors première vue.
- **Accessibilité :** texte alternatif descriptif pour chaque image porteuse de sens.
- **Droits :** n'utiliser que des photos dont l'université détient les droits, avec l'autorisation des personnes photographiées.