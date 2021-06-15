import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Token extends BaseModel {

    public static table: string = 'api_tokens'

    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @column()
    public name: string

    @column()
    public type: string

    @column()
    public token: string

    @column()
    expiresAt: DateTime
    
    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>
}
