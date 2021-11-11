import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SubjectForms extends BaseSchema {
  protected tableName = 'subject_forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('subject_id').index().references('id').inTable('subjects')
      table.string('form_id').index()
      table.string('label').nullable()
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
