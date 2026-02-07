import router from '@adonisjs/core/services/router'

// Ta page "Coming Soon"
router.on('/').render('pages/create')

// Ta nouvelle page d'accueil
router.on('/home').render('pages/home')

// Groupement des routes Portfolio
router.group(() => {
  router.on('/original').render('pages/portfolio/original')
  router.on('/fanart').render('pages/portfolio/fanart')
  router.on('/commandes').render('pages/portfolio/commandes')
  router.on('/croquis').render('pages/portfolio/croquis')
}).prefix('/portfolio')

router.on('404').render('pages/errors/not_found')