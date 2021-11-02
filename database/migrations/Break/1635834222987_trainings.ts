import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Trainings extends BaseSchema {
	protected tableName = 'trainings'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('name')
			table.string('slug')
			table.string('description').nullable()
			table.integer('quota').notNullable()
			table.integer('status').defaultTo(0)
			/**
			 * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
			 */
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
