import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import File from './File'
import Schedule from './Schedule'

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public type: string

  @column()
  public url: string

  @column()
  public fileId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => File)
  public file: HasOne<typeof File>

  @manyToMany(() => Schedule)
  public subjects: ManyToMany<typeof Schedule>
  
}
