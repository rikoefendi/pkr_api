import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Training from './Training'

export default class Schedule extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public trainingId: number

	@column()
	public name: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@belongsTo(() => Training)
	public training: BelongsTo<typeof Training>
}
