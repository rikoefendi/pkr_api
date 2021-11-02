import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import File from './File'

export default class Counselor extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public fileId: number

	@column()
	public name: string

	@column()
	public description: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@hasOne(() => File)
	public image: HasOne<typeof File>
}
