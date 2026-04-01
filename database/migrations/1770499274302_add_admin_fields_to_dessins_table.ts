import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dessins'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_visible').defaultTo(false)
      table.enum('status', ['en_attente', 'en_cours', 'termine']).defaultTo('en_attente')
      table.string('image_path').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_visible')
      table.dropColumn('status')
      table.dropColumn('image_path')
    })
  }
}
