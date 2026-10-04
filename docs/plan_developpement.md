# Plan de développement — Site AGRI'SUP (MVP)

> Version du 2026-10-04. Les décisions qui justifient ce plan sont dans `docs/decisions.md`.
> Règle de travail : une phase à la fois. À la fin de chaque phase, je fais un résumé et j'indique comment tester, puis j'attends la validation avant de passer à la suivante.

## 1. Stack

| Couche | Choix |
|---|---|
| Front + API | Next.js (App Router, TypeScript strict), composants serveur, pages statiques régénérées |
| Styles | CSS Modules + `tokens.css` (variables de la charte) |
| Langues | `next-intl` : français (par défaut) et anglais ; bambara plus tard |
| Base de données | PostgreSQL sur Neon, via Prisma |
| Validation | zod, avec les mêmes schémas côté client et côté serveur |
| Emails | Resend (notifications des formulaires) |
| Analytics | Vercel Web Analytics |
| Tests | Vitest (unitaires et API) + Playwright avec axe (parcours et accessibilité) |
| Hébergement | Vercel (fonctions à Paris, `cdg1`) |

## 2. Sources de contenu

| Contenu | Source | Statut |
|---|---|---|
| Identité, localisation | `presentation_projet.md` : Sotuba ACI, Commune I, Bamako | À confirmer |
| Formations | Kakémono (`assets/photos/kakemono_offre_formations.jpg`) | Noms seulement, à confirmer ; durées, programmes et conditions `[À FOURNIR]` |
| Partenaires | `presentation_projet.md` §10 : IPR/IFRA Katibougou, IER, Ordre des vétérinaires | Noms seulement, sans logo |
| Chiffres clés | Fictifs, commentés comme tels | À remplacer avant la mise en ligne |
| Actualités | Annonces de test inspirées des affiches (inscriptions, sortie pédagogique…) | Fictives |
| Coordonnées de test | WhatsApp +34 613 52 17 22, email bernadet.kn@gmail.com | Variables d'environnement |
| Coordonnées officielles | +223 74 98 74 47, +223 66 72 43 89 | À basculer à la mise en ligne |

## 3. Phases

| # | Phase | Livrables | Vérification |
|---|---|---|---|
| 1 | Initialisation | Projet Next.js, ESLint/Prettier, arborescence, `.env.example`, README, réorganisation de `assets/` (`photos/`, `annonces/`, noms en snake_case), configuration `next-intl` (`/fr`, `/en`) | `npm run dev`, `npm run lint`, `npm run build` passent ; `/fr` et `/en` répondent |
| 2 | Fondations visuelles | `tokens.css` (section 3 de la charte + variables ajoutées et commentées), polices via `next/font`, styles de base, script de thème dans le `<head>`, page `/guide-style` réservée au développement | Basculer le thème puis recharger : aucun flash ; préférence système ; `localStorage` vidé ; contrastes |
| 3 | Composants communs | Header (logo provisoire, menu, menu mobile, toggle, sélecteur de langue, CTA Préinscription), footer, Button, Card, Section, Container, champs, Alert, Accordion, lien d'évitement, bouton WhatsApp | Navigation au clavier, focus visible, cibles ≥ 44 px, affichage à 360, 768 et 1280 px dans les deux thèmes et les deux langues |
| 4 | Données et API de lecture | Schéma Prisma (Formation, Actualite et leurs traductions par langue, Preinscription, ContactMessage, RateLimit), migrations, données de test, `GET /api/formations` et `GET /api/actualites` — **schéma soumis à validation avant d'écrire la migration** | `npx prisma studio`, appels `curl` |
| 5 | Pages, première partie | Accueil, Formations (filtres et détail), Admission | Parcours du cahier (§25) jusqu'au bouton Préinscription |
| 6 | Formulaires | Contact et Préinscription : zod, honeypot, rate limiting, notification Resend, confirmation avec lien WhatsApp | Envoi valide ou invalide, honeypot, réponse 429 en cas d'abus, ligne en base, email reçu |
| 7 | Pages, seconde partie | AGRI'SUP, Actualités (pagination), FAQ, Contact (carte chargée au clic, tel, mailto, réseaux, brochure), Mentions légales et confidentialité | Tous les liens fonctionnent ; liste des `[À FOURNIR]` à jour |
| 8 | Images, performance, SEO | Script `sharp` (`assets/` → WebP/AVIF avec `srcset`), métadonnées, `hreflang`, sitemap, robots, Open Graph, JSON-LD `EducationalOrganization`, Vercel Analytics | Lighthouse mobile avec connexion bridée : ≥ 90 en performance et en accessibilité |
| 9 | Accessibilité et tests | axe via Playwright, tests Vitest des schémas et des API, passage avec le lecteur d'écran NVDA | Rapport axe sans erreur, tests au vert |
| 10 | Mise en ligne | Base Neon, variables d'environnement Vercel, domaine et HTTPS, Resend, sauvegardes | Checklist « avant mise en ligne » de `checklist.md` cochée |

## 4. Arborescence

```text
agrisup/
├── CLAUDE.md · README.md · .env.example · .gitignore
├── package.json · tsconfig.json · next.config.ts · eslint.config.mjs
├── vitest.config.ts · playwright.config.ts
├── assets/                       # sources brutes, jamais servies telles quelles
│   ├── logo/
│   ├── photos/
│   └── annonces/
├── docs/                         # dont decisions.md, plan_developpement.md, checklist.md
├── messages/
│   ├── fr.json
│   └── en.json                   # traductions à relire
├── prisma/
│   ├── schema.prisma · seed.ts · migrations/
├── public/
│   ├── logo/ · images/ · brochure/
├── scripts/
│   └── optimize_images.ts
├── src/
│   ├── proxy.ts                  # détection de la langue (nom imposé par Next.js 16)
│   ├── i18n/
│   │   ├── routing.ts            # langues + URL traduites (kebab-case)
│   │   └── request.ts
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx · page.tsx · not-found.tsx
│   │   │   ├── agrisup/page.tsx
│   │   │   ├── formations/page.tsx · formations/[slug]/page.tsx
│   │   │   ├── admission/page.tsx
│   │   │   ├── preinscription/page.tsx
│   │   │   ├── actualites/page.tsx · actualites/[slug]/page.tsx
│   │   │   ├── faq/page.tsx · contact/page.tsx
│   │   │   └── mentions_legales/page.tsx
│   │   ├── api/
│   │   │   ├── contact/route.ts · preinscriptions/route.ts
│   │   │   ├── formations/route.ts · formations/[slug]/route.ts
│   │   │   └── actualites/route.ts · actualites/[slug]/route.ts
│   │   ├── sitemap.ts · robots.ts
│   ├── components/
│   │   ├── layout/     site_header · site_footer · main_nav · mobile_nav · theme_toggle · theme_script · language_switcher · site_logo · skip_link
│   │   ├── ui/         button · card · section · container · badge · accordion · form_field · alert
│   │   ├── formations/ formation_card · formation_filters
│   │   ├── actualites/ actualite_card
│   │   ├── forms/      contact_form · preinscription_form · honeypot_field
│   │   └── contact/    whatsapp_button · map_embed
│   ├── content/
│   │   ├── placeholders.ts       # données à confirmer et données fictives, commentées
│   │   ├── site_config.ts
│   │   └── faq.ts
│   ├── lib/
│   │   ├── db.ts · email.ts · rate_limit.ts · whatsapp_link.ts
│   │   └── validation/ contact_schema.ts · preinscription_schema.ts
│   └── styles/
│       ├── tokens.css · base.css · typography.css
└── tests/
    ├── unit/
    └── e2e/
```
