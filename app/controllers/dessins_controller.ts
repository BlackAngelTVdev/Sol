import { HttpContext } from '@adonisjs/core/http'
import Dessin from '#models/dessin'

export default class DessinsController {
  async index({ request, view }: HttpContext) {
    const type = request.input('type', 'original')
    const serieFilter = request.input('serie')

    // 1. On récupère les dessins (filtrés par série si l'URL en a une)
    const query = Dessin.query().where('type', type)
    if (serieFilter) {
      query.where('serie', serieFilter)
    }
    const dessins = await query.orderBy('created_at', 'desc')

    // 2. LA MAGIE : On récupère la liste des séries uniques pour ce type
    const series = await Dessin.query()
      .where('type', type)
      .whereNotNull('serie')
      .distinct('serie')
      .orderBy('serie', 'asc')

    return view.render('pages/portfolio', { 
      dessins, 
      type, 
      series: series.map(s => s.serie), // On envoie juste un tableau de strings
      activeSerie: serieFilter 
    })
  }
}