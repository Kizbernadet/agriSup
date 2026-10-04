# AGRI'SUP — Site web institutionnel

Site de l'École Supérieure Privée des Sciences et Technologies Agricoles (Sotuba ACI, Bamako, Mali).
Il présente l'école et ses formations, et permet de contacter l'établissement et de se préinscrire.

## Prérequis

- Node.js 20.9 ou plus récent
- npm

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000 → redirige vers /fr
```

## Scripts

| Commande                          | Rôle                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                     | Serveur de développement                                     |
| `npm run build`                   | Build de production                                          |
| `npm run start`                   | Lance le build de production                                 |
| `npm run lint`                    | ESLint                                                       |
| `npm run typecheck`               | Vérification TypeScript (génère d'abord les types de routes) |
| `npm run format` / `format:check` | Mise en forme Prettier                                       |

## Organisation

| Dossier             | Contenu                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| `src/app/[locale]/` | Pages, une par rubrique (dossiers en snake_case)                       |
| `src/i18n/`         | Langues (fr, en) et URL publiques traduites                            |
| `messages/`         | Textes de l'interface par langue                                       |
| `src/components/`   | Composants réutilisables                                               |
| `assets/`           | Sources brutes (logo, photos, annonces), jamais servies telles quelles |
| `docs/`             | Cadrage, charte graphique, plan, décisions, checklist                  |

## Documentation

- Plan de développement : [docs/plan_developpement.md](docs/plan_developpement.md)
- Décisions techniques : [docs/decisions.md](docs/decisions.md)
- Avancement : [docs/checklist.md](docs/checklist.md)
- Charte graphique : [docs/charte_graphique.md](docs/charte_graphique.md)
