# 🌿 MenuSemaine

Planificateur de repas familial avec liste de courses automatique.

## Fonctionnalités

- ✨ Suggestions de repas par Claude AI
- 📅 Planning semaine drag & drop
- 🛒 3 listes de courses (Drive / Maraîcher / Boucher) avec quantités
- 📋 Export WhatsApp en 1 clic
- 👶 Adaptations bébé pour chaque plat
- 💾 Persistance automatique (on retrouve tout en rouvrant le site)
- 🌿 Badge "utilise vos ingrédients à écouler"

## Déploiement

### 1. Cloner et configurer

```bash
git clone <votre-repo>
cd menu-semaine
npm install
```

### 2. Clé API Anthropic

Créez un fichier `.env` à la racine :

```
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxx
```

> ⚠️ Ne commitez jamais ce fichier. Il est dans `.gitignore`.

Dans `src/App.jsx`, remplacez dans la fonction `callClaude` :

```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
},
```

### 3. Lancer en local

```bash
npm run dev
```

### 4. Déployer sur Vercel

1. Poussez sur GitHub : `git push`
2. Allez sur [vercel.com](https://vercel.com) → "Add New Project"
3. Importez votre repo GitHub
4. Dans "Environment Variables", ajoutez :
   - `VITE_ANTHROPIC_API_KEY` = votre clé Anthropic
5. Cliquez "Deploy" ✅

Vercel détecte automatiquement Vite — aucune config supplémentaire.

## Développement local

```bash
npm run dev      # Serveur de dev
npm run build    # Build production
npm run preview  # Prévisualiser le build
```
