import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import Dessin from '#models/dessin'
import app from '@adonisjs/core/services/app'
import { extname } from 'node:path'

export default class AdminController {
  // Page de liste des commandes
  async commandes({ view, auth }: HttpContext) {
    await auth.authenticate()

    const commandes = await Dessin.query().where('type', 'commandes').orderBy('created_at', 'desc')

    return view.render('pages/admin/commandes', { commandes })
  }

  // Page de détails d'une commande
  async showCommande({ view, params, auth }: HttpContext) {
    await auth.authenticate()

    const dessin = await Dessin.findOrFail(params.id)

    // Vérifie que c'est bien une commande
    if (dessin.type !== 'commandes') {
      return view.render('pages/errors/not_found')
    }

    return view.render('pages/admin/show', { dessin })
  }

  async dashboard({ view, auth }: HttpContext) {
    await auth.authenticate()

    const commandes = await Dessin.query().where('type', 'commandes').orderBy('created_at', 'desc')

    const grouped = {
      en_attente: commandes.filter((c) => c.status === 'en_attente'),
      en_cours: commandes.filter((c) => c.status === 'en_cours'),
      termine: commandes.filter((c) => c.status === 'termine'),
    }

    return view.render('pages/admin/dashboard', { grouped, commandes })
  }

  async updateStatus({ request, response, auth }: HttpContext) {
    await auth.authenticate()

    const { id, status } = request.only(['id', 'status'])

    const dessin = await Dessin.findOrFail(id)
    dessin.status = status
    await dessin.save()

    return response.json({ success: true, message: 'Statut mis à jour' })
  }

  async toggleVisibility({ request, response, auth }: HttpContext) {
    await auth.authenticate()

    const { id } = request.only(['id'])

    const dessin = await Dessin.findOrFail(id)
    dessin.isVisible = !dessin.isVisible
    await dessin.save()

    return response.json({ success: true, isVisible: dessin.isVisible })
  }

  async uploadImage({ request, response, auth }: HttpContext) {
    await auth.authenticate()

    const { id } = request.only(['id'])
    const image = request.file('image')

    if (!image) {
      return response.status(400).json({ error: 'Aucune image fournie' })
    }

    // Validation
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!image.type || !validMimes.includes(image.type)) {
      return response.status(400).json({ error: "Format d'image invalide" })
    }

    if (image.size > 5 * 1024 * 1024) {
      // 5MB max
      return response.status(400).json({ error: 'Fichier trop volumineux (max 5MB)' })
    }

    try {
      const dessin = await Dessin.findOrFail(id)

      // Génère un nom unique
      const filename = `${cuid()}-${Date.now()}${image.fileName ? extname(image.fileName) : '.jpg'}`
      const uploadDir = app.publicPath('uploads')

      // Crée le répertoire s'il n'existe pas
      await image.move(uploadDir, { name: filename })

      dessin.imagePath = `/uploads/${filename}`
      await dessin.save()

      return response.json({ success: true, imagePath: dessin.imagePath })
    } catch (error) {
      return response.status(500).json({ error: "Erreur lors de l'upload" })
    }
  }

  async editForm({ view, params, auth }: HttpContext) {
    await auth.authenticate()

    const dessin = await Dessin.findOrFail(params.id)

    return view.render('pages/admin/edit', { dessin })
  }

  async update({ request, response, params, auth }: HttpContext) {
    await auth.authenticate()

    const { nom, description } = request.only(['nom', 'description'])

    const dessin = await Dessin.findOrFail(params.id)
    dessin.nom = nom
    dessin.description = description
    await dessin.save()

    return response.redirect('/admin')
  }

  async delete({ response, params, auth }: HttpContext) {
    await auth.authenticate()

    const dessin = await Dessin.findOrFail(params.id)
    await dessin.delete()

    return response.redirect('/admin')
  }
}
