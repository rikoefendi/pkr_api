import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TrainingsSubjects extends BaseSchema {
	protected tableName = 'trainings_subjects'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table
				.integer('training_id')
				.index()
				.references('id')
				.inTable('trainings')
				.onDelete('CASCADE')
			table
				.integer('subject_id')
				.index()
				.references('id')
				.inTable('subjects')
				.onDelete('CASCADE')
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
