# Guide de déploiement de la documentation

Ce guide explique comment déployer la documentation de `cross-env-cmd` sur différentes plateformes.

## GitHub Pages

### Configuration automatique
1. Allez dans les paramètres du repository GitHub
2. Scrollez jusqu'à la section "Pages"
3. Sélectionnez "Deploy from a branch"
4. Choisissez la branche `main` et le dossier `/docs`
5. Cliquez sur "Save"

### Configuration manuelle
1. Créez une branche `gh-pages`
2. Copiez le contenu du dossier `docs/` dans la racine de cette branche
3. Committez et pushez les changements
4. Activez GitHub Pages dans les paramètres

### URL
La documentation sera disponible à : `https://username.github.io/cross-env-cmd`

## Netlify

### Déploiement automatique
1. Connectez votre compte GitHub à Netlify
2. Sélectionnez le repository `cross-env-cmd`
3. Configurez :
   - Build command : `echo "Static site"`
   - Publish directory : `docs`
4. Cliquez sur "Deploy site"

### Déploiement manuel
1. Téléchargez le contenu du dossier `docs/`
2. Glissez-déposez le dossier sur netlify.com/drop
3. Votre site sera déployé instantanément

### Configuration personnalisée
Le fichier `netlify.toml` est déjà configuré avec :
- Redirections automatiques
- Headers de sécurité
- Cache optimisé

## Vercel

### Déploiement automatique
1. Connectez votre compte GitHub à Vercel
2. Importez le repository `cross-env-cmd`
3. Configurez :
   - Framework Preset : Other
   - Root Directory : `docs`
4. Cliquez sur "Deploy"

### Configuration personnalisée
Le fichier `vercel.json` est déjà configuré avec :
- Routes personnalisées
- Headers de sécurité
- Cache optimisé

## Firebase Hosting

### Configuration
1. Installez Firebase CLI : `npm install -g firebase-tools`
2. Initialisez Firebase : `firebase init hosting`
3. Configurez :
   - Public directory : `docs`
   - Single-page app : No
   - Overwrite index.html : No

### Déploiement
```bash
firebase deploy
```

## Surge.sh

### Installation
```bash
npm install -g surge
```

### Déploiement
```bash
cd docs
surge
```

## Variables d'environnement

### GitHub Actions
Les secrets suivants sont nécessaires :
- `GITHUB_TOKEN` : Automatiquement fourni
- `NETLIFY_AUTH_TOKEN` : Token d'authentification Netlify
- `NETLIFY_SITE_ID` : ID du site Netlify

### Configuration des secrets
1. Allez dans les paramètres du repository
2. Cliquez sur "Secrets and variables" > "Actions"
3. Ajoutez les secrets nécessaires

## Monitoring

### Analytics
Ajoutez Google Analytics ou d'autres outils de suivi :
1. Modifiez `script.js`
2. Ajoutez le code de suivi
3. Redéployez

### Performance
- Utilisez Lighthouse pour auditer les performances
- Optimisez les images
- Minifiez les fichiers CSS et JS

## Maintenance

### Mise à jour du contenu
1. Modifiez les fichiers HTML dans `docs/`
2. Committez et pushez les changements
3. Le déploiement se fait automatiquement

### Mise à jour des styles
1. Modifiez `styles.css`
2. Testez localement
3. Committez et pushez

### Mise à jour des scripts
1. Modifiez `script.js`
2. Testez les fonctionnalités
3. Committez et pushez

## Dépannage

### Problèmes courants

#### GitHub Pages ne se met pas à jour
- Vérifiez que les fichiers sont dans le dossier `docs/`
- Attendez quelques minutes pour la propagation
- Vérifiez les logs GitHub Actions

#### Netlify ne déploie pas
- Vérifiez la configuration du build
- Vérifiez les logs de déploiement
- Vérifiez les variables d'environnement

#### Vercel ne déploie pas
- Vérifiez la configuration `vercel.json`
- Vérifiez les logs de déploiement
- Vérifiez les routes

### Support
- Consultez la documentation de chaque plateforme
- Ouvrez une issue sur GitHub
- Contactez l'équipe ValoriaTechnologia

