import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { GENDERS } from 'App/Const/Const'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().index()
      table.string('name', 225).notNullable()
      table.string('email', 255).notNullable().unique().index()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.string('email_verified_at').nullable()
      table.string('phone', 16).nullable()
      table.string('status').nullable()
      table.date('birthday').nullable()
      table.enum('gender', GENDERS).nullable()
      table.string('jobs').nullable()
      table.string('job_duration').nullable()
      table.string('home_town').nullable()
      table.string('str_number')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
