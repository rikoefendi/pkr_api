import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Questions extends BaseSchema {
	protected tableName = 'questions'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table
				.integer('evaluation_id')
				.index()
				.unsigned()
				.references('id')
				.inTable('evaluations')
			table.string('question', 500).notNullable()
			table.boolean('is_challenge').defaultTo(false)
			table.integer('is_score').defaultTo(0)
			table.boolean('is_choice').defaultTo(false)
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
