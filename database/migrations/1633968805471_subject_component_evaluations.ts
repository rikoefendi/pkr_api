import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SubjectComponentEvaluations extends BaseSchema {
	protected tableName = 'subject_component_evaluations'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('subject_component_id') //.index().unsigned().references('id').inTable('subject_components')
			table.integer('evaluation_id') //.index().unsigned().references('id').inTable('evaluations')
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
