import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import File from './File'

export default class UserSubject extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public userId: number

	@column()
	public subjectId: number

	@column()
	public fileId?: number

	@column()
	public score?: string

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@hasOne(() => File, {
		foreignKey: 'parentId',
	})
	public file: HasOne<typeof File>
}
