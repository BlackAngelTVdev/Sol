import DessinsController from '#controllers/dessins_controller'
import AuthController from '#controllers/auth_controller'
import AdminController from '#controllers/admin_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Ta page "Coming Soon"
router.on('/').render('pages/create')

// Ta nouvelle page d'accueil
router.on('/home').render('pages/home')

// Routes d'authentification
router.get('/login', [AuthController, 'showLogin']).as('login')
router.post('/login', [AuthController, 'login']).as('loginSubmit')
router.post('/logout', [AuthController, 'logout']).as('logout')

// Groupement des routes Portfolio
router.get('/portfolio', [DessinsController, 'index']).as('portfolio')
router.get('/kanban', [DessinsController, 'commandes']).as('kanban')
router.get('/passer-commande', [DessinsController, 'commandeForm']).as('commandeForm')
router.post('/passer-commande', [DessinsController, 'storeCommande']).as('storeCommande')

// Routes Admin (protégées par middleware d'authentification)
router
  .group(() => {
    router.get('/', [AdminController, 'dashboard']).as('dashboard')

    // Routes pour les commandes
    router.get('/commandes', [AdminController, 'commandes']).as('commandes')
    router.get('/commandes/:id', [AdminController, 'showCommande']).as('showCommande')

    // Routes AJAX pour les mises à jour
    router.post('/status/:id', [AdminController, 'updateStatus']).as('updateStatus')
    router.post('/visibility/:id', [AdminController, 'toggleVisibility']).as('toggleVisibility')
    router.post('/upload/:id', [AdminController, 'uploadImage']).as('uploadImage')

    // Routes de gestion (édition/suppression)
    router.get('/edit/:id', [AdminController, 'editForm']).as('editForm')
    router.put('/edit/:id', [AdminController, 'update']).as('updateCommand')
    router.delete('/:id', [AdminController, 'delete']).as('deleteCommand')
  })
  .prefix('/admin')
  .middleware([middleware.auth()])

router.on('404').render('pages/errors/not_found')
