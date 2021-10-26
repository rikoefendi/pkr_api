import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Counselor from './Counselor'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public counselorId: number

  @column()
  public subjectId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Counselor)
  public counselor: BelongsTo<typeof Counselor>
}
