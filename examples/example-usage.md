# Exemples d'utilisation de cross-env-cmd

## Installation

```bash
npm install -g cross-env-cmd
```

## Configuration

Créez un fichier `.cross-env-cmdrc` dans votre projet :

```json
{
  "staging": {
    "files": [".env.staging", ".env.common"],
    "vars": {
      "NODE_ENV": "staging",
      "LOG_LEVEL": "info"
    }
  },
  "production": {
    "files": [".env.production", ".env.common"],
    "vars": {
      "NODE_ENV": "production",
      "LOG_LEVEL": "error"
    }
  }
}
```

## Exemples d'utilisation

### 1. Utilisation basique avec un environnement

```bash
cross-env-cmd -e staging npm start
```

### 2. Chargement de fichiers .env supplémentaires

```bash
cross-env-cmd -e staging -f .env.local npm run build
```

### 3. Variables d'environnement en ligne de commande

```bash
cross-env-cmd -e staging TEST=value DEBUG=true npm test
```

### 4. Exemple complet (comme demandé)

```bash
cross-env-cmd -e staging -f .test.env -f .prod.env TEST=a BETA=e npm run deploy
```

### 5. Sans fichier RC, juste des fichiers .env

```bash
cross-env-cmd -f .env.development -f .env.local NODE_ENV=development npm start
```

### 6. Fichier RC personnalisé

```bash
cross-env-cmd --rc .my-config.json -e production npm start
```

## Ordre de priorité des variables

1. Variables en ligne de commande (priorité la plus haute)
2. Fichiers .env spécifiés via `-f`
3. Variables définies dans le fichier RC
4. Fichiers .env définis dans le fichier RC
5. Variables d'environnement système existantes

## Formats de fichier RC supportés

### JSON
```json
{
  "staging": {
    "files": [".env.staging"],
    "vars": { "NODE_ENV": "staging" }
  }
}
```

### JavaScript
```javascript
module.exports = {
  staging: {
    files: ['.env.staging'],
    vars: { NODE_ENV: 'staging' }
  }
};
```
