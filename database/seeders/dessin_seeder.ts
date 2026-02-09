import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Dessin from '#models/dessin'

export default class extends BaseSeeder {
  async run() {
    // 1. Les "Tarifs" (qui s'afficheront peut-être ailleurs ou en haut)
    await Dessin.createMany([
      {
        nom: 'Portrait Simple',
        description: 'Lineart noir et blanc.',
        type: 'commandes',
        statut: 'termine', // On les met en terminé pour pas polluer le début du Kanban
        serie: 'Tarifs',
        imageUrl: 'https://picsum.photos/1920/1080?random=1001',
      },
      {
        nom: 'Illustration Complète',
        description: 'Couleurs détaillées.',
        type: 'commandes',
        statut: 'termine',
        serie: 'Tarifs',
        imageUrl: 'https://picsum.photos/1920/1080?random=1002',
      }
    ])

    // 2. Génération de fausses commandes pour le KANBAN
    const statuts = ['pas_commence', 'en_cours', 'termine']
    const fakeCommandes = []
    
    for (let i = 1; i <= 15; i++) {
      fakeCommandes.push({
        nom: `Commande client ${i}`,
        description: `Brief du client numéro ${i}`,
        type: 'commandes',
        statut: statuts[Math.floor(Math.random() * statuts.length)],
        serie: 'Slots',
        imageUrl: `https://picsum.photos/1920/1080?random=c${i}`,
      })
    }
    await Dessin.createMany(fakeCommandes)

    // 3. Le reste de ton portfolio (1000 dessins)
    const totalDessins = 1000
    const types = ['original', 'fanart', 'croquis']
    const dessinsData = []

    for (let i = 1; i <= totalDessins; i++) {
      const typeAleatoire = types[Math.floor(Math.random() * types.length)]
      
      dessinsData.push({
        nom: `Dessin Numéro ${i}`,
        description: `Description automatique ${i}.`,
        type: typeAleatoire,
        statut: 'termine', // Le portfolio classique est déjà fini
        serie: `Série ${Math.floor(Math.random() * 5) + 1}`,
        imageUrl: `https://picsum.photos/1920/1080?random=${i}`,
      })

      if (dessinsData.length === 500) {
        await Dessin.createMany(dessinsData)
        dessinsData.length = 0 
      }
    }

    if (dessinsData.length > 0) {
      await Dessin.createMany(dessinsData)
    }
  }
}