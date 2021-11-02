import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schedules extends BaseSchema {
	protected tableName = 'schedules'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table
				.integer('training_id')
				.index()
				.references('id')
				.inTable('trainings')
				.onDelete('CASCADE')
			table.string('name').notNullable()
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
