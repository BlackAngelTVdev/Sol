import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dessins'

  async up() {
    // Migration vide - Les champs de paiement seront ajoutés plus tard
  }

  async down() {
    // Pas d'opération à annuler
  }
}
