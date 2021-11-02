import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Trainings extends BaseSchema {
	protected tableName = 'trainings'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('name').notNullable()
			table.string('description').nullable()
			table.string('capacity', 10)
			table.string('status').defaultTo('draft')
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
