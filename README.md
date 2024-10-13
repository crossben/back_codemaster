# Back Codemaster

Ceci est le backend du projet Codemaster. Il fournit l'API et les services pour gérer les cours, les quiz et les ressources.

## Pour Commencer

### Prérequis

- Node.js (v14 ou ultérieure)
- MongoDB

### Installation

1. Clonez le dépôt :
   ```
   git clone https://github.com/crossben/back_codemaster.git
   cd back_codemaster
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` dans le répertoire racine et ajoutez les éléments suivants :
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/codemaster
   ```

4. Démarrez le serveur :
   ```
   npm run dev
   ```

Le serveur devrait maintenant fonctionner sur `http://localhost:2002`.

## Structure du Projet

Le projet est organisé comme suit :

- `src/` : Contient le code source principal
  - `configs/` : Configuration de l'application
  - `controllers/` : Gère la logique de traitement des requêtes
  - `interfaces/` : Définit les types et interfaces Typescript
  - `middlewares/` : Fonctions middleware pour le traitement des requêtes
  - `routes/` : Définit les routes de l'API
  - `schemas/` : Définit les schémas et modèles de données MongoDB
  - `services/` : Contient la logique métier
  - `utils/` : Fonctions utilitaires et helpers
- `tests/` : Tests unitaires et d'intégration

## Fonctionnalités Principales

- Gestion des cours : Création, lecture, mise à jour et suppression de cours
- Gestion des quiz : Ajout de quiz aux cours avec questions et réponses
- Gestion des ressources : Ajout de ressources supplémentaires aux cours
- Authentification des utilisateurs : Inscription, connexion et gestion des profils

## API Endpoints

Voici un aperçu des principaux endpoints de l'API :

- `/api/courses` : Opérations CRUD pour les cours
- `/api/quizzes` : Gestion des quiz
- `/api/resources` : Gestion des ressources
- `/api/users` : Gestion des utilisateurs et authentification

Pour plus de détails sur les endpoints spécifiques et leurs paramètres, consultez la documentation de l'API.

## Contribution

Les contributions sont les bienvenues ! Veuillez consulter le fichier CONTRIBUTING.md pour les directives de contribution.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
