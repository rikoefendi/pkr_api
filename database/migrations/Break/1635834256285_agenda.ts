import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Agenda extends BaseSchema {
	protected tableName = 'agenda'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table
				.integer('schedule_id')
				.index()
				.references('id')
				.inTable('schedules')
				.onDelete('CASCADE')
			table.timestamp('start_date')
			table.timestamp('end_date')
			table.string('description').nullable()
			table.string('fasilitator').nullable()
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
