import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SubjectComponents extends BaseSchema {
  protected tableName = 'subject_components'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('subject_id').unsigned().index().references('id').inTable('subjects')
      table.integer('component_id').unsigned().index().references('id').inTable('components')
      table.string('label').nullable()
      table.string('description').nullable()
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
