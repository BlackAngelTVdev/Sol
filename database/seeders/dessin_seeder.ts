import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Dessin from '#models/dessin'

export default class extends BaseSeeder {
  async run() {
    // 1. On insère les commandes en "brut"
    await Dessin.createMany([
      {
        nom: 'Portrait Simple',
        description: 'Lineart noir et blanc, fond uni.',
        type: 'commandes',
        serie: 'Tarifs',
        imageUrl: 'https://picsum.photos/1920/1080?random=1001',
      },
      {
        nom: 'Illustration Complète',
        description: 'Couleurs détaillées avec décor complexe.',
        type: 'commandes',
        serie: 'Tarifs',
        imageUrl: 'https://picsum.photos/1920/1080?random=1002',
      }
    ])

    // 2. Le reste en automatique (1000 dessins)
    const totalDessins = 1000
    const types = ['original', 'fanart', 'croquis']
    const dessinsData = []

    for (let i = 1; i <= totalDessins; i++) {
      const typeAleatoire = types[Math.floor(Math.random() * types.length)]
      
      dessinsData.push({
        nom: `Dessin Numéro ${i}`,
        description: `Description automatique ${i}.`,
        type: typeAleatoire,
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