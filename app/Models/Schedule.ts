import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Training from './Training'
import Agenda from './Agenda'
import Subject from './Subject'

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

  @hasMany(() => Agenda)
  public agendas: HasMany<typeof Agenda>

  @manyToMany(() => Subject)
  public subjects: ManyToMany<typeof Subject>
}
