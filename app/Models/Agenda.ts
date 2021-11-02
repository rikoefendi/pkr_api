import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Agenda extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public scheduleId: number

	@column()
	public startDate: DateTime

	@column()
	public endDate: DateTime

	@column()
	public description: string

	@column()
	public fasilitator: string

	@column()
	public selfTrain: boolean = false

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
