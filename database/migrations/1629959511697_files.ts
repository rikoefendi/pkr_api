import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { FILE_TYPES } from 'App/Const/Const'

export default class Files extends BaseSchema {
  protected tableName = 'files'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('parent_id').index().notNullable()
      table.string('name', 225).notNullable()
      table.string('unique', 225).notNullable().unique().index()
      table.boolean('private').defaultTo(false)
      table.enum('type', FILE_TYPES).notNullable().index()
      table.string('mime', 20).notNullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
