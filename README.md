# cross-env-cmd

Un outil qui combine les fonctionnalités de `cross-env` et `env-cmd` pour charger des variables d'environnement depuis des fichiers et exécuter des commandes.

## Fonctionnalités

- ✅ **TypeScript** - Écrit en TypeScript avec typage strict
- ✅ Chargement de variables d'environnement depuis des fichiers `.env`
- ✅ Configuration d'environnements multiples via un fichier `.rc` (format env-cmd)
- ✅ Variables d'environnement en ligne de commande
- ✅ Fusion intelligente des variables (priorité : ligne de commande > fichiers -f > .rc)
- ✅ Support des formats JSON et JavaScript pour les fichiers RC
- ✅ Tests unitaires et end-to-end complets avec Jest
- ✅ Compatible avec Windows, macOS et Linux

## Installation

```bash
npm install -g cross-env-cmd
```

## Utilisation

### Syntaxe de base

```bash
cross-env-cmd [options] [env-vars] <command>
```

### Options

- `-e, --env <environment>` : Nom de l'environnement depuis le fichier `.cross-env-cmdrc`
- `-f, --file <file>` : Fichier d'environnement à charger (peut être utilisé plusieurs fois)
- `--rc <file>` : Fichier de configuration RC (par défaut: `.cross-env-cmdrc`)
- `-h, --help` : Afficher l'aide
- `-v, --version` : Afficher la version

### Exemples

#### 1. Utilisation avec un environnement défini

```bash
cross-env-cmd -e staging npm start
```

#### 2. Chargement de fichiers .env supplémentaires

```bash
cross-env-cmd -e staging -f .env.local npm run build
```

#### 3. Variables d'environnement en ligne de commande

```bash
cross-env-cmd -e staging TEST=value DEBUG=true npm test
```

#### 4. Exemple complet (comme demandé)

```bash
cross-env-cmd -e staging -f .test.env -f .prod.env TEST=a BETA=e npm run deploy
```

#### 5. Sans fichier RC, juste des fichiers .env

```bash
cross-env-cmd -f .env.development -f .env.local NODE_ENV=development npm start
```

## Configuration

Créez un fichier `.cross-env-cmdrc` dans votre projet. Le format est identique à `env-cmd` :

### Format JSON

```json
{
  "development": {
    "NODE_ENV": "development",
    "LOG_LEVEL": "debug",
    "DATABASE_NAME": "myapp_development",
    "API_URL": "http://localhost:3000"
  },
  "staging": {
    "NODE_ENV": "staging",
    "LOG_LEVEL": "info",
    "DATABASE_NAME": "myapp_staging",
    "API_URL": "https://api-staging.example.com"
  },
  "production": {
    "NODE_ENV": "production",
    "LOG_LEVEL": "error",
    "DATABASE_NAME": "myapp_production",
    "API_URL": "https://api.example.com",
    "SECRET_KEY": "prod_secret_key_here"
  }
}
```

### Format JavaScript

```javascript
module.exports = {
  development: {
    NODE_ENV: 'development',
    LOG_LEVEL: 'debug',
    DATABASE_NAME: 'myapp_development',
    API_URL: 'http://localhost:3000'
  },
  staging: {
    NODE_ENV: 'staging',
    LOG_LEVEL: 'info',
    DATABASE_NAME: 'myapp_staging',
    API_URL: 'https://api-staging.example.com'
  },
  production: {
    NODE_ENV: 'production',
    LOG_LEVEL: 'error',
    DATABASE_NAME: 'myapp_production',
    API_URL: 'https://api.example.com',
    SECRET_KEY: 'prod_secret_key_here'
  }
};
```

## Ordre de priorité des variables

1. **Variables en ligne de commande** (priorité la plus haute)
2. **Fichiers .env spécifiés via `-f`**
3. **Variables définies dans le fichier RC**
4. **Fichiers .env définis dans le fichier RC**
5. **Variables d'environnement système existantes**

## Tests

```bash
# Tests unitaires et end-to-end
npm test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage

# Tests end-to-end uniquement
npm run test:e2e

# Tests manuels
npm run test:manual

# Tous les tests (build + tests + manuels)
npm run test:all
```

## CI/CD

Le projet utilise GitHub Actions pour l'intégration continue :

- **CI** : Tests automatiques sur Node.js 18.x, 20.x, 21.x
- **Code Quality** : Vérifications TypeScript, audit de sécurité
- **Cross-Platform** : Tests sur Ubuntu, Windows, macOS
- **Performance** : Tests de performance et de charge
- **Release** : Publication automatique sur npm

Voir [docs/CI-CD.md](docs/CI-CD.md) pour plus de détails.

## Développement

```bash
# Installer les dépendances
npm install

# Compiler TypeScript
npm run build

# Développement avec ts-node
npm run dev -e staging -f test.env TEST=value npm start

# Tests unitaires
npm test

# Tests end-to-end
npm run test:e2e
```

## Structure du projet

```
src/
├── bin/
│   └── cross-env-cmd.ts      # CLI principal
├── lib/
│   └── index.ts              # Bibliothèque principale
├── types/
│   └── index.ts              # Définitions TypeScript
├── __tests__/
│   ├── lib/                  # Tests unitaires
│   ├── bin/                  # Tests CLI
│   └── e2e/                  # Tests end-to-end
└── index.ts                  # Point d'entrée
```

## Licence

MIT
