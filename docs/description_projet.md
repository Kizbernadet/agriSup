---
title: "AGRI'SUP Mali — Cahier de cadrage du projet"
project: "Site web institutionnel AGRI'SUP Mali"
type: "Cahier de cadrage"
status: "Base de travail"
---

# AGRI'SUP Mali — Cahier de cadrage du projet

> **Statut :** document de cadrage et de travail.  
> Les informations institutionnelles concernant AGRI'SUP doivent être vérifiées et validées officiellement avant publication.

---

## 1. Vision générale

Le projet consiste à concevoir un **site web institutionnel professionnel pour AGRI'SUP — École Supérieure Privée des Sciences et Technologies Agricoles**, au Mali.

Le site doit permettre à un visiteur de :

1. découvrir AGRI'SUP ;
2. comprendre son positionnement et son domaine ;
3. découvrir les formations ;
4. comprendre les conditions et la procédure d'admission ;
5. trouver rapidement les moyens de contacter l'établissement ;
6. effectuer une préinscription ;
7. consulter les actualités et informations importantes.

### Objectif principal

Le site doit transformer le parcours :

```text
Je découvre AGRI'SUP
        ↓
Je comprends ce que fait l'établissement
        ↓
Je découvre une formation
        ↓
Je vérifie les conditions d'admission
        ↓
Je contacte AGRI'SUP ou je me préinscris
```

Le projet doit rester **propre, réaliste et pédagogique**. Il ne faut pas transformer le MVP en logiciel complet de gestion universitaire.

---

# 2. Objectifs du projet

## 2.1 Objectifs institutionnels

Le site doit :

- améliorer la présence numérique d'AGRI'SUP ;
- présenter l'établissement de manière professionnelle ;
- centraliser les informations importantes ;
- renforcer la crédibilité de l'établissement ;
- faciliter l'accès aux informations pour les futurs étudiants ;
- mettre en valeur les formations et l'orientation agricole.

## 2.2 Objectifs utilisateurs

Un visiteur doit pouvoir rapidement :

- savoir ce qu'est AGRI'SUP ;
- savoir où se trouve l'établissement ;
- consulter les formations ;
- connaître les conditions d'admission ;
- savoir comment contacter l'école ;
- envoyer une demande d'information ;
- commencer une préinscription.

## 2.3 Objectifs techniques

Le projet doit permettre de mettre en pratique :

- conception d'une architecture web ;
- frontend responsive ;
- backend/API ;
- base de données ;
- formulaires ;
- validation des données ;
- gestion des erreurs ;
- authentification éventuelle de l'administration ;
- intégrations externes simples ;
- déploiement ;
- tests.

---

# 3. Périmètre du MVP

Le MVP doit être suffisamment complet pour représenter AGRI'SUP et générer des contacts/préinscriptions, sans développer un système universitaire complet.

## 3.1 Pages principales

```text
Accueil
├── AGRI'SUP
│   ├── Présentation
│   ├── Histoire
│   ├── Vision & mission
│   ├── Pédagogie
│   └── Direction
│
├── Formations
│   ├── Toutes les formations
│   ├── DUT
│   ├── Licences professionnelles
│   └── Détail d'une formation
│
├── Admission
│   ├── Conditions
│   ├── Documents
│   ├── Procédure
│   └── Préinscription
│
├── Actualités
│   └── Détail d'une actualité
│
├── FAQ
│
└── Contact
```

---

# 4. Page d'accueil

La page d'accueil est la page la plus importante du site.

## 4.1 Hero

Le hero doit présenter immédiatement :

- AGRI'SUP ;
- son domaine ;
- son implantation ;
- un message institutionnel ;
- un appel à l'action.

CTA recommandés :

- `Découvrir nos formations`
- `Se préinscrire`
- `Nous contacter`
- `WhatsApp`

## 4.2 Présentation rapide

Une section courte expliquant :

- qui est AGRI'SUP ;
- son orientation ;
- sa mission ;
- son positionnement dans l'enseignement agricole.

Un bouton doit permettre d'aller vers la page complète de présentation.

## 4.3 Chiffres clés

Les chiffres ne doivent être affichés que s'ils sont vérifiés.

Exemples de catégories :

- années d'expérience ;
- nombre de formations ;
- domaines ;
- partenaires ;
- étudiants, si chiffre officiel disponible.

> Ne jamais inventer de statistiques pour remplir cette section.

## 4.4 Formations mises en avant

Présenter quelques formations sous forme de cartes.

Chaque carte peut afficher :

- nom ;
- niveau ;
- durée ;
- domaine ;
- courte description ;
- bouton de détail.

## 4.5 Pourquoi AGRI'SUP ?

Cette section peut présenter, si les éléments sont officiellement confirmés :

- orientation agricole ;
- approche pratique ;
- professionnalisation ;
- accompagnement ;
- partenariats ;
- immersion dans le domaine.

## 4.6 Partenaires

Afficher les partenaires officiellement validés.

Prévoir une validation avant d'utiliser leurs logos.

## 4.7 CTA final

Exemple de parcours :

```text
Vous souhaitez rejoindre AGRI'SUP ?
        ↓
Découvrir les formations
        ↓
Vérifier les conditions
        ↓
Se préinscrire
```

---

# 5. Page AGRI'SUP

## 5.1 Présentation

Cette page doit expliquer :

- l'identité de l'établissement ;
- son domaine ;
- son positionnement ;
- sa localisation ;
- son orientation professionnelle.

## 5.2 Histoire

Présenter l'histoire uniquement à partir d'informations vérifiées.

Éléments à rechercher :

- origine ;
- année de création ;
- évolution ;
- changement de localisation ;
- évolution vers l'enseignement supérieur.

## 5.3 Vision

Expliquer la vision institutionnelle officielle.

## 5.4 Mission

Présenter les missions officielles de l'établissement.

## 5.5 Pédagogie

Présenter le rapport entre :

```text
Théorie
  ↓
Pratique
  ↓
Terrain
  ↓
Professionnalisation
```

Les infrastructures et dispositifs pratiques doivent être confirmés avant publication.

## 5.6 Direction

Afficher :

- nom ;
- fonction ;
- courte présentation ;
- photo officielle si autorisée.

Les fonctions exactes doivent être validées.

---

# 6. Page Formations

La page doit permettre de comprendre rapidement l'offre de formation.

## 6.1 Filtres

Filtres simples possibles :

- niveau ;
- domaine ;
- durée.

Exemple :

```text
Niveau
[ Tous ] [ DUT ] [ Licence ]

Domaine
[ Tous ] [ Agriculture ] [ Élevage ] [ Production animale ] ...
```

## 6.2 Carte de formation

Une carte peut contenir :

```text
Nom de la formation
Niveau
Durée
Domaine
Description courte

[Voir la formation]
```

## 6.3 Page détail

Une formation doit pouvoir présenter :

- nom ;
- niveau ;
- durée ;
- domaine ;
- présentation ;
- objectifs ;
- compétences ;
- programme ;
- débouchés ;
- conditions d'admission ;
- documents requis ;
- bouton de préinscription ;
- bouton WhatsApp.

Les informations non vérifiées doivent rester absentes ou être signalées comme à confirmer.

---

# 7. Page Admission

La page Admission doit répondre à trois questions :

1. Qui peut candidater ?
2. Quels documents faut-il fournir ?
3. Comment effectuer la démarche ?

## 7.1 Conditions

Présenter les conditions officielles par formation/niveau.

## 7.2 Documents

Exemples de catégories :

- pièce d'identité ;
- diplôme ;
- relevés ;
- photos ;
- autres documents.

> La liste doit être fournie/validée par AGRI'SUP.

## 7.3 Procédure

Exemple de workflow :

```text
1. Choisir une formation
        ↓
2. Vérifier les conditions
        ↓
3. Remplir la préinscription
        ↓
4. Être contacté / compléter le dossier
        ↓
5. Suivre la procédure officielle d'admission
```

---

# 8. Préinscription

## 8.1 Objectif

Permettre à un candidat de transmettre ses premières informations à AGRI'SUP.

Ce formulaire ne doit pas être présenté comme une admission définitive si le processus officiel est différent.

## 8.2 Champs proposés

```text
Nom
Prénom
Téléphone
Email
Ville
Niveau d'études
Formation souhaitée
Année académique
Message
```

Un champ `date de naissance` peut être ajouté uniquement si AGRI'SUP le demande réellement.

## 8.3 Workflow technique

```text
Formulaire frontend
       ↓
Validation frontend
       ↓
POST /api/preinscriptions
       ↓
Validation backend
       ↓
Base de données
       ↓
Confirmation utilisateur
```

## 8.4 Statuts

```text
NEW
CONTACTED
PROCESSING
ACCEPTED
REJECTED
```

## 8.5 Évolution

Dans une version ultérieure, le candidat pourrait :

- recevoir un email ;
- suivre son dossier ;
- fournir des documents ;
- recevoir des demandes complémentaires.

---

# 9. Page Contact

La page Contact doit regrouper tous les moyens de communication.

## 9.1 Informations

- adresse ;
- téléphone ;
- email officiel ;
- WhatsApp ;
- Facebook ;
- Instagram ;
- YouTube ;
- carte Google Maps.

## 9.2 Formulaire de contact

Champs :

```text
Nom
Email
Téléphone
Sujet
Message
```

Endpoint :

`POST /api/contact`

Statuts :

```text
UNREAD
READ
ANSWERED
```

---

# 10. Intégrations externes

## 10.1 WhatsApp

Utiliser WhatsApp Click-to-Chat.

Emplacements recommandés :

- header ;
- hero ;
- page Formation ;
- page Admission ;
- page Contact ;
- confirmation de préinscription.

Les messages peuvent être contextualisés.

Exemple :

```text
Bonjour AGRI'SUP,
je souhaite obtenir des informations concernant la formation [nom].
```

## 10.2 Téléphone

Utiliser :

```text
tel:+223XXXXXXXX
```

## 10.3 Email

Possibilités :

```text
mailto:adresse@example.com
```

ou système d'envoi côté backend.

## 10.4 Réseaux sociaux

Pour le MVP :

- Facebook : lien ;
- Instagram : lien ;
- YouTube : lien.

L'utilisation d'API sociales n'est pas nécessaire au départ.

## 10.5 Google Maps

Ajouter une carte intégrée sur Contact.

## 10.6 Brochure PDF

Ajouter :

```text
[ Télécharger la brochure ]
```

Le document doit être fourni par AGRI'SUP.

---

# 11. Actualités

## 11.1 Objectif

Créer une présence institutionnelle vivante.

Types possibles :

- rentrée ;
- admissions ;
- événements ;
- conférences ;
- activités pratiques ;
- cérémonies ;
- partenariats ;
- résultats ;
- annonces.

## 11.2 Modèle

```text
id
title
slug
excerpt
content
image
category
published
published_at
created_at
updated_at
```

## 11.3 MVP

Au début, les actualités peuvent être administrées simplement.

Une interface d'administration peut être ajoutée ensuite.

---

# 12. FAQ

La FAQ peut utiliser un composant HTML interactif ou équivalent.

Questions possibles :

- Quelles formations propose AGRI'SUP ?
- Où se trouve AGRI'SUP ?
- Quelles sont les conditions d'admission ?
- Quels documents faut-il fournir ?
- Comment se préinscrire ?
- Comment contacter AGRI'SUP ?
- Existe-t-il une brochure ?
- Quelles sont les formations disponibles cette année ?

Les réponses doivent être validées.

---

# 13. Architecture fonctionnelle

```text
                    ┌─────────────────────┐
                    │      Visiteur       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │ Site institutionnel │
                    └──────────┬──────────┘
                               │
               ┌───────────────┼────────────────┐
               │               │                │
               ▼               ▼                ▼
          API Contact     API Préinscription   API Contenu
               │               │                │
               └───────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │      Backend        │
                    │ Validation / logique│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Database       │
                    └─────────────────────┘
```

---

# 14. API

## 14.1 Contact

```http
POST /api/contact
```

Objectif :

- recevoir une demande ;
- valider les données ;
- enregistrer le message ;
- retourner une confirmation.

## 14.2 Préinscription

```http
POST /api/preinscriptions
```

Objectif :

- recevoir le formulaire ;
- vérifier la formation ;
- valider les données ;
- enregistrer le candidat ;
- retourner une confirmation.

## 14.3 Formations

```http
GET /api/formations
GET /api/formations/:id
```

## 14.4 Actualités

```http
GET /api/actualites
GET /api/actualites/:id
```

---

# 15. Modèle de données

## Formation

```text
Formation
---------
id
name
slug
description
level
duration
domain
objectives
skills
career_opportunities
admission_requirements
program
created_at
updated_at
```

## Preinscription

```text
Preinscription
--------------
id
first_name
last_name
phone
email
city
education_level
formation_id
academic_year
message
status
created_at
updated_at
```

Relation :

```text
Formation 1 ─────── N Preinscription
```

## ContactMessage

```text
ContactMessage
--------------
id
name
email
phone
subject
message
status
created_at
updated_at
```

## Actualite

```text
Actualite
---------
id
title
slug
excerpt
content
image
category
published
published_at
created_at
updated_at
```

---

# 16. Administration — V1.5

Après validation du MVP, ajouter un espace administrateur.

## Fonctionnalités

### Formations

- créer ;
- modifier ;
- supprimer ;
- publier/masquer.

### Actualités

- créer ;
- modifier ;
- publier ;
- dépublier ;
- supprimer.

### Préinscriptions

- consulter ;
- filtrer ;
- modifier le statut ;
- consulter les détails.

### Messages

- consulter ;
- marquer comme lu ;
- répondre ;
- archiver.

## Tableau de bord

Exemples de statistiques :

```text
Préinscriptions aujourd'hui
Préinscriptions ce mois
Messages non lus
Formations actives
Actualités publiées
```

---

# 17. Version avancée

La version avancée pourrait devenir une véritable plateforme universitaire.

## Candidat

- compte ;
- profil ;
- candidature ;
- suivi ;
- documents ;
- notifications.

## Étudiant

- profil ;
- inscriptions ;
- notes ;
- emploi du temps ;
- absences ;
- documents ;
- notifications.

## Administration

- étudiants ;
- candidats ;
- enseignants ;
- formations ;
- classes ;
- notes ;
- absences ;
- paiements ;
- documents ;
- rapports.

> Cette évolution constitue un autre niveau de projet. Elle ne doit pas être mélangée au MVP.

---

# 18. Ce qui est explicitement hors périmètre du MVP

Ne pas développer immédiatement :

- ERP universitaire ;
- gestion complète des étudiants ;
- gestion des enseignants ;
- gestion des notes ;
- gestion des absences ;
- gestion des emplois du temps ;
- paiement en ligne ;
- génération automatique de diplômes ;
- messagerie interne ;
- chatbot IA ;
- application mobile ;
- système de cours en ligne complet.

---

# 19. Sécurité

Le MVP manipule des données personnelles.

Minimum à prévoir :

- validation frontend ;
- validation backend ;
- nettoyage/validation des entrées ;
- gestion des erreurs ;
- protection des endpoints ;
- limitation des abus sur les formulaires ;
- stockage sécurisé des données ;
- protection des secrets ;
- variables d'environnement ;
- HTTPS en production ;
- contrôle d'accès pour l'administration ;
- sauvegardes de la base.

Ne jamais exposer les clés API ou secrets dans le frontend.

---

# 20. UX / UI

## Principes

Le site doit être :

- clair ;
- moderne ;
- institutionnel ;
- responsive ;
- accessible ;
- rapide ;
- cohérent.

## Navigation

Le menu principal doit rester court.

Exemple :

```text
Accueil
AGRI'SUP
Formations
Admission
Actualités
FAQ
Contact
```

CTA persistant :

```text
Préinscription
```

ou

```text
WhatsApp
```

sur mobile.

---

# 21. Responsive

Tester au minimum :

- smartphone ;
- tablette ;
- laptop ;
- grand écran.

Priorité particulière au mobile car une partie importante des utilisateurs accédera probablement au site depuis un téléphone.

---

# 22. SEO de base

Prévoir :

- titres de pages ;
- meta descriptions ;
- URLs propres ;
- structure H1/H2/H3 ;
- textes descriptifs ;
- images optimisées ;
- `alt` sur les images ;
- sitemap ;
- robots.txt ;
- données structurées si pertinentes ;
- partage social.

---

# 23. Accessibilité

Minimum :

- contraste lisible ;
- navigation clavier ;
- labels de formulaires ;
- textes alternatifs ;
- boutons clairement identifiables ;
- messages d'erreur compréhensibles ;
- structure HTML sémantique.

---

# 24. Performance

Prévoir :

- compression des images ;
- formats modernes ;
- lazy loading lorsque pertinent ;
- limitation des bibliothèques inutiles ;
- cache ;
- pagination des actualités ;
- optimisation des requêtes DB ;
- limitation des appels API inutiles.

---

# 25. Tests

## Tests fonctionnels

Tester :

- navigation ;
- liens ;
- responsive ;
- formulaire Contact ;
- formulaire Préinscription ;
- API ;
- validation ;
- gestion des erreurs ;
- WhatsApp ;
- téléphone ;
- email ;
- Google Maps ;
- brochure ;
- actualités ;
- filtres des formations.

## Test de parcours utilisateur

Une personne qui ne connaît pas le projet doit pouvoir :

```text
1. Arriver sur le site
2. Comprendre AGRI'SUP
3. Trouver les formations
4. Choisir une formation
5. Trouver les conditions
6. Trouver la préinscription
7. Envoyer une demande
```

Si elle ne sait pas quoi faire ensuite, l'UX doit être améliorée.

---

# 26. Critères de validation du projet

## Critiques

- objectif clair ;
- informations exactes ;
- navigation intuitive ;
- responsive ;
- formations compréhensibles ;
- admission compréhensible ;
- préinscription fonctionnelle ;
- contact fonctionnel ;
- backend fonctionnel ;
- données cohérentes ;
- sécurité minimale ;
- code maintenable ;
- déploiement fonctionnel ;
- test utilisateur réussi.

## Importants

- performance ;
- SEO ;
- accessibilité ;
- FAQ ;
- actualités ;
- Maps ;
- réseaux sociaux ;
- brochure ;
- animations.

---

# 27. Définition de « Done »

Le projet n'est **pas** terminé lorsque toutes les pages sont codées.

Il est terminé lorsque :

```text
Informations validées
        +
UX validée
        +
Responsive validé
        +
Fonctionnalités validées
        +
API validées
        +
Données validées
        +
Sécurité minimale
        +
Tests réussis
        +
Déploiement
        +
Test utilisateur réel
```

---

# 28. Roadmap proposée

## Phase 0 — Validation

- confirmer les informations AGRI'SUP ;
- récupérer logo ;
- récupérer photos ;
- récupérer brochure ;
- récupérer formations officielles ;
- confirmer contacts ;
- confirmer réseaux sociaux ;
- confirmer partenaires.

## Phase 1 — Conception

- cahier de cadrage ;
- arborescence ;
- user flows ;
- wireframes ;
- identité visuelle ;
- modèle de données ;
- architecture technique.

## Phase 2 — Backend

- projet backend ;
- base de données ;
- modèles ;
- migrations ;
- API formations ;
- API actualités ;
- API contact ;
- API préinscription ;
- validation ;
- gestion des erreurs.

## Phase 3 — Frontend

- layout ;
- header ;
- footer ;
- accueil ;
- présentation ;
- formations ;
- admission ;
- préinscription ;
- actualités ;
- FAQ ;
- contact.

## Phase 4 — Intégrations

- WhatsApp ;
- téléphone ;
- email ;
- Maps ;
- réseaux sociaux ;
- brochure.

## Phase 5 — Tests

- fonctionnels ;
- responsive ;
- API ;
- sécurité ;
- UX ;
- performance.

## Phase 6 — Déploiement

- frontend ;
- backend ;
- base de données ;
- variables d'environnement ;
- domaine ;
- HTTPS ;
- vérification production.

---

# 29. Principe final

Le projet doit privilégier :

**Clarté > quantité de fonctionnalités**

**Fiabilité > contenu inventé**

**Expérience utilisateur > complexité technique**

**MVP fonctionnel > application surdimensionnée**

Le meilleur résultat pour cette première version est un site qui donne confiance, explique clairement les formations et facilite immédiatement le contact ou la préinscription.
