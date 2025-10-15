# Configuration des secrets pour le déploiement

Ce document explique comment configurer les secrets nécessaires pour le déploiement automatique de la documentation.

## Secrets GitHub

### Configuration
1. Allez dans les paramètres du repository GitHub
2. Cliquez sur "Secrets and variables" > "Actions"
3. Cliquez sur "New repository secret"
4. Ajoutez les secrets suivants :

### Secrets requis

#### `GITHUB_TOKEN`
- **Description** : Token d'authentification GitHub (fourni automatiquement)
- **Utilisation** : Déploiement sur GitHub Pages
- **Valeur** : Automatiquement fourni par GitHub Actions

#### `NETLIFY_AUTH_TOKEN`
- **Description** : Token d'authentification Netlify
- **Utilisation** : Déploiement sur Netlify
- **Comment l'obtenir** :
  1. Connectez-vous à Netlify
  2. Allez dans "User settings" > "Applications"
  3. Cliquez sur "New access token"
  4. Donnez un nom au token
  5. Copiez le token généré

#### `NETLIFY_SITE_ID`
- **Description** : ID du site Netlify
- **Utilisation** : Identification du site à déployer
- **Comment l'obtenir** :
  1. Allez sur votre site Netlify
  2. Allez dans "Site settings" > "General"
  3. Copiez le "Site ID"

#### `VERCEL_TOKEN`
- **Description** : Token d'authentification Vercel
- **Utilisation** : Déploiement sur Vercel
- **Comment l'obtenir** :
  1. Connectez-vous à Vercel
  2. Allez dans "Settings" > "Tokens"
  3. Cliquez sur "Create Token"
  4. Donnez un nom au token
  5. Copiez le token généré

#### `VERCEL_ORG_ID`
- **Description** : ID de l'organisation Vercel
- **Utilisation** : Identification de l'organisation
- **Comment l'obtenir** :
  1. Allez sur votre dashboard Vercel
  2. L'ID est dans l'URL ou dans les paramètres

#### `VERCEL_PROJECT_ID`
- **Description** : ID du projet Vercel
- **Utilisation** : Identification du projet
- **Comment l'obtenir** :
  1. Allez sur votre projet Vercel
  2. L'ID est dans l'URL ou dans les paramètres

## Configuration des plateformes

### GitHub Pages
1. Activez GitHub Pages dans les paramètres du repository
2. Sélectionnez "Deploy from a branch"
3. Choisissez la branche `main` et le dossier `/docs`
4. Le déploiement se fait automatiquement via GitHub Actions

### Netlify
1. Connectez votre compte GitHub à Netlify
2. Sélectionnez le repository `cross-env-cmd`
3. Configurez :
   - Build command : `echo "Static site"`
   - Publish directory : `docs`
4. Le déploiement se fait automatiquement via GitHub Actions

### Vercel
1. Connectez votre compte GitHub à Vercel
2. Importez le repository `cross-env-cmd`
3. Configurez :
   - Framework Preset : Other
   - Root Directory : `docs`
4. Le déploiement se fait automatiquement via GitHub Actions

## URLs de déploiement

Une fois configuré, la documentation sera disponible sur :

- **GitHub Pages** : `https://valoriatechnologia.github.io/cross-env-cmd`
- **Netlify** : `https://cross-env-cmd.netlify.app`
- **Vercel** : `https://cross-env-cmd.vercel.app`

## Dépannage

### Problèmes courants

#### "Secret not found"
- Vérifiez que le secret est bien configuré dans GitHub
- Vérifiez l'orthographe du nom du secret
- Vérifiez que le secret est accessible au workflow

#### "Authentication failed"
- Vérifiez que le token est valide
- Vérifiez que le token a les bonnes permissions
- Régénérez le token si nécessaire

#### "Site not found"
- Vérifiez que le site existe sur la plateforme
- Vérifiez que l'ID du site est correct
- Vérifiez que vous avez accès au site

### Logs de déploiement
1. Allez dans l'onglet "Actions" de votre repository GitHub
2. Cliquez sur le workflow "Deploy Documentation"
3. Consultez les logs pour identifier les erreurs

## Sécurité

### Bonnes pratiques
- Ne partagez jamais les tokens
- Régénérez les tokens régulièrement
- Utilisez des tokens avec des permissions minimales
- Surveillez l'utilisation des tokens

### Rotation des tokens
- Régénérez les tokens tous les 6 mois
- Mettez à jour les secrets GitHub
- Testez le déploiement après la rotation

## Support

Pour toute question sur la configuration :
- Consultez la documentation de chaque plateforme
- Ouvrez une issue sur GitHub
- Contactez l'équipe ValoriaTechnologia

