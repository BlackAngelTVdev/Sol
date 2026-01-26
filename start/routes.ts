import router from '@adonisjs/core/services/router'

// Ta page "Coming Soon" (Timer)
router.on('/').render('pages/create')

// Ta nouvelle page d'accueil (Portfolio/Carousel)
router.on('/home').render('pages/home')