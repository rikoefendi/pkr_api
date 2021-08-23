import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
    column,
    beforeSave,
    beforeCreate,
    BaseModel,
    hasMany,
    HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'
import Token from './Token'
import { GENDERS, USER_STATUS_NEW } from 'App/Const/Const'

export default class User extends BaseModel {

    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public email: string

    @column({ serializeAs: null })
    public password: string

    @column()
    public rememberMeToken?: string

    @column.dateTime()
    public emailVerifiedAt?: DateTime | null

    @column()
    public status?: string

    @column()
    public birthday?: Date

    @column()
    public gender?: typeof GENDERS[number]

    @column()
    public profesi?: string

    @column()
    public lastEducation?: string

    @column()
    public phone?: string
    
    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            if (!user.password) {
                user.password = string.generateRandom(8)
            }
            user.password = await Hash.make(user.password)
        }
    }
    @beforeCreate()
    public static assignStatus(user: User){
        user.status = USER_STATUS_NEW
    }

    verify() {
        this.emailVerifiedAt = DateTime.now()
    }
    unverified() {
        this.emailVerifiedAt = null
    }

    @hasMany(() => Token)
    public tokens: HasMany<typeof Token>
}
