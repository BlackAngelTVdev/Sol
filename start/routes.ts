import router from '@adonisjs/core/services/router'

// Ta page "Coming Soon"
router.on('/').render('pages/create')

// Ta nouvelle page d'accueil
router.on('/home').render('pages/home')

// Groupement des routes Portfolio

// Une seule route pour tout le portfolio
router
  .get('/portfolio', ({ request, view }) => {
    const type = request.input('type', 'original')

    return view.render('pages/portfolio', { type })
  })
  .as('portfolio')

router.on('404').render('pages/errors/not_found')
