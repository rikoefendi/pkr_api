import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Schedule from './Schedule'
import Component from './Component'

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public trainingId: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Schedule)
  public schedules: HasMany<typeof Schedule>

  @manyToMany(() => Component, {
    pivotTable: 'subject_components',
    pivotColumns: ['label', 'description']
  })
  public components: ManyToMany<typeof Component>
}
