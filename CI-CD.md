# CI/CD Documentation

Ce document décrit les workflows GitHub Actions configurés pour le projet `cross-env-cmd`.

## Workflows disponibles

### 1. CI (Continuous Integration)
**Fichier**: `.github/workflows/ci.yml`

**Déclencheurs**:
- Push sur les branches `main` et `develop`
- Pull requests vers `main` et `develop`

**Actions**:
- Tests sur Node.js 18.x, 20.x, et 21.x
- Installation des dépendances
- Compilation TypeScript
- Exécution des tests unitaires
- Exécution des tests end-to-end
- Génération du rapport de couverture
- Upload vers Codecov

### 2. Code Quality
**Fichier**: `.github/workflows/quality.yml`

**Déclencheurs**:
- Push sur les branches `main` et `develop`
- Pull requests vers `main` et `develop`

**Actions**:
- Vérification TypeScript
- Compilation du projet
- Tests de fonctionnalité CLI
- Audit de sécurité des dépendances
- Vérification des vulnérabilités

### 3. Cross-Platform Tests
**Fichier**: `.github/workflows/cross-platform.yml`

**Déclencheurs**:
- Push sur les branches `main` et `develop`
- Pull requests vers `main` et `develop`

**Actions**:
- Tests sur Ubuntu, Windows, et macOS
- Tests sur Node.js 18.x et 20.x
- Tests de fonctionnalité CLI sur chaque plateforme
- Tests d'intégration

### 4. Performance Tests
**Fichier**: `.github/workflows/performance.yml`

**Déclencheurs**:
- Push sur `main`
- Pull requests vers `main`
- Planification quotidienne (2h UTC)

**Actions**:
- Tests de performance du CLI
- Tests de temps de démarrage
- Tests de chargement d'environnement
- Tests de mémoire
- Tests de stress (exécutions concurrentes)

### 5. Release
**Fichier**: `.github/workflows/release.yml`

**Déclencheurs**:
- Push de tags `v*`

**Actions**:
- Exécution de tous les tests
- Compilation du projet
- Publication sur npm
- Création d'une release GitHub

## Configuration requise

### Secrets GitHub
Pour que les workflows fonctionnent correctement, vous devez configurer les secrets suivants :

1. **NPM_TOKEN**: Token d'authentification npm pour la publication
   - Générer sur [npmjs.com](https://www.npmjs.com/settings/tokens)
   - Permissions : `Automation` ou `Publish`

### Variables d'environnement
- `NODE_AUTH_TOKEN`: Utilisé automatiquement par GitHub Actions
- `GITHUB_TOKEN`: Fourni automatiquement par GitHub Actions

## Scripts de test locaux

### Tests complets
```bash
npm run test:all
```

### Tests spécifiques
```bash
# Tests unitaires uniquement
npm test

# Tests end-to-end uniquement
npm run test:e2e

# Tests avec couverture
npm run test:coverage

# Tests manuels
npm run test:manual
```

## Badges de statut

Vous pouvez ajouter ces badges à votre README :

```markdown
![CI](https://github.com/votre-username/cross-env-cmd/workflows/CI/badge.svg)
![Code Quality](https://github.com/votre-username/cross-env-cmd/workflows/Code%20Quality/badge.svg)
![Cross-Platform](https://github.com/votre-username/cross-env-cmd/workflows/Cross-Platform%20Tests/badge.svg)
![Performance](https://github.com/votre-username/cross-env-cmd/workflows/Performance%20Tests/badge.svg)
```

## Monitoring

### Codecov
- Rapport de couverture automatique
- Seuil de couverture configurable
- Commentaires automatiques sur les PR

### Security
- Audit automatique des dépendances
- Détection des vulnérabilités
- Mise à jour des dépendances

### Performance
- Tests de performance quotidiens
- Détection des régressions
- Métriques de temps de démarrage

## Dépannage

### Échec des tests
1. Vérifier les logs GitHub Actions
2. Exécuter les tests localement : `npm run test:all`
3. Vérifier la compatibilité Node.js

### Échec de publication
1. Vérifier le token NPM_TOKEN
2. Vérifier les permissions npm
3. Vérifier que la version n'existe pas déjà

### Problèmes de performance
1. Consulter les logs de performance
2. Vérifier les métriques de mémoire
3. Analyser les temps de démarrage
