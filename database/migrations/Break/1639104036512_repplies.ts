import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Repplies extends BaseSchema {
  protected tableName = 'repplies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('message_id').index().unsigned().references('id').inTable('messages').onDelete('cascade')
      table.integer('message_id_repply').index().unsigned().references('id').inTable('messages').onDelete('cascade')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
