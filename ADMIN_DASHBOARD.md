# 🎨 Dashboard Admin - Documentation

## 🔐 Accès & Authentification

### Connexion

- **URL** : `/login`
- **Identifiants par défaut** (après seeding) :
  - Email: `admin@example.com`
  - Mot de passe: `password123`

### Routes Protégées

Toutes les routes sous `/admin` nécessitent une authentification via le middleware `auth`.

---

## 📋 Fonctionnalités du Dashboard

### 1. **Tableau de bord Kanban** (`GET /admin`)

Vue d'ensemble de toutes les commandes organisées en 3 colonnes :

- **En attente** : Commandes à valider
- **En cours** : Commandes en travail
- **Terminé** : Commandes finalisées

#### Actions disponibles par commande :

- **Changer le statut** : Sélecteur dropdown pour passer d'une colonne à l'autre
- **Basculer la visibilité** (👁️ / 🚫) : Rendre visible/caché au public
- **Modifier** (✏️) : Accéder au formulaire d'édition
- **Supprimer** (🗑️) : Supprimer la commande
- **Upload d'image** (📤) : Ajouter/changer l'image de référence

### 2. **Édition de commande** (`GET /admin/edit/:id`)

Formulaire pour modifier :

- Nom de la commande
- Description détaillée
- Affichage de l'image actuelle (si présente)

### 3. **Upload d'images**

- Format acceptés : JPEG, PNG, WebP, GIF
- Taille max : 5MB
- Stockage : `/public/uploads/`
- Nommage : `{cuid}-{timestamp}.{ext}`

---

## 🔧 Structure Technique

### Base de données

Table `dessins` avec colonnes supplémentaires :

```
- is_visible (boolean) : Affichage public
- status (enum) : 'en_attente' | 'en_cours' | 'termine'
- image_path (string) : Chemin vers l'image de référence
```

### Contrôleurs

- **AdminController** : Logique complète du dashboard
  - `dashboard()` : Affichage du kanban
  - `updateStatus()` : Mise à jour via AJAX
  - `toggleVisibility()` : Toggle via AJAX
  - `uploadImage()` : Upload et stockage
  - `editForm()` : Affichage du formulaire
  - `update()` : Sauvegarde modifications
  - `delete()` : Suppression

### Routes

```
POST   /admin/status/:id          - Changer le statut
POST   /admin/visibility/:id      - Basculer visibilité
POST   /admin/upload/:id          - Upload image
GET    /admin/edit/:id            - Formulaire édition
PUT    /admin/edit/:id            - Sauvegarder éditions
DELETE /admin/:id                 - Supprimer commande
```

### Authentification

- Middleware : `auth` (redirige vers `/login`)
- Guard : `web` (session-based)
- Modèle User : AuthFinder mixin avec hash Scrypt

---

## 🎨 Design & Responsivité

### Thème cohérent

- Boutons violets : `#7c5fa0`
- Inputs : `#d9d7e8`
- Sidebars grise
- Animations fluides

### Responsive

- Desktop : Grille 3 colonnes
- Mobile : 1 colonne (adaptable)
- Formulaires fullwidth sur petit écran

---

## 🚀 Commandes de démarrage

### 1. Migration de la base de données

```bash
node ace migration:run
```

### 2. Seeder (créer l'admin)

```bash
node ace db:seed
```

### 3. Lancer le serveur

```bash
npm run dev
```

### 4. Accéder au dashboard

- Aller à `/login`
- Entrer les identifiants
- Accéder à `/admin`

---

## 📱 AJAX & Interactions

### Mise à jour de statut

```javascript
fetch(`/admin/status/${id}`, {
  method: 'POST',
  headers: { 'X-CSRF-Token': token },
  body: JSON.stringify({ id, status }),
})
```

### Toggle visibilité

```javascript
fetch(`/admin/visibility/${id}`, {
  method: 'POST',
  headers: { 'X-CSRF-Token': token },
  body: JSON.stringify({ id }),
})
```

### Upload d'image

```javascript
const formData = new FormData()
formData.append('image', file)
fetch(`/admin/upload/${id}`, {
  method: 'POST',
  headers: { 'X-CSRF-Token': token },
  body: formData,
})
```

---

## 🔒 Sécurité

- ✅ Middleware d'authentification sur routes admin
- ✅ CSRF protection (csrfField & X-CSRF-Token headers)
- ✅ Validation d'images (type MIME + size)
- ✅ Noms de fichiers uniques (cuid + timestamp)
- ✅ Hashage des mots de passe (Scrypt)
- ✅ Session-based authentication

---

## 📝 Prochaines étapes (optionnel)

- [ ] Intégration d'un éditeur de description (WYSIWYG)
- [ ] Aperçu en temps réel des modifications
- [ ] Historique des modifications
- [ ] Bulk actions (modifier plusieurs commandes)
- [ ] Export des données (CSV/PDF)
- [ ] Notifications email lors de changements de statut
