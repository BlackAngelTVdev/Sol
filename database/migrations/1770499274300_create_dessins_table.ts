import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dessins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('nom').notNullable()
      table.text('description').nullable()
      
      table.string('type').notNullable().defaultTo('original')
      // Nouvelle colonne pour tes séries (série 1, série 2, etc.)
      table.string('serie').nullable()
      
      table.string('image_url').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}