import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserAnswers extends BaseSchema {
	protected tableName = 'user_answers'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('user_id') //.unsigned().index().references('id').inTable('users')
			table.integer('answer_id') //.unsigned().index().references('id').inTable('answers')
			table.integer('subject_component_evaluation_id') //.unsigned().index().references('id').inTable('subject_component_evaluations')
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
