import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserTraining extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public userId: number

	@column()
	public trainingId: number

	@column()
	public status: number

	@column()
	public message: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
