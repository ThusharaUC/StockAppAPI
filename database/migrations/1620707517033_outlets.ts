import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Outlets extends BaseSchema {
  protected tableName = 'outlets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('outlet_code', 255).notNullable()
      table.string('location', 180).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
