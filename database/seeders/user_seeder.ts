import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Crée un utilisateur admin de test
    // Email: admin@example.com
    // Mot de passe: password123
    await User.create({
      email: 'admin@example.com',
      password: 'password123',
    })
  }
}
