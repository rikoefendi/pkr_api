import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Answer extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public questionId: number

	@column()
	public score: number = 0

	@column()
	public answer: string

	@column()
	public isChoice: boolean = false

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@belongsTo(() => Question)
	public question: BelongsTo<typeof Question>
}
