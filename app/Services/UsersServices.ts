import Event from '@ioc:Adonis/Core/Event'
import Database from "@ioc:Adonis/Lucid/Database"
import Hash from '@ioc:Adonis/Core/Hash'

import User from "App/Models/User"
import TokenServices from './TokenServices'
export default class UserServices {
    private mustVerifyEmail = 'Verify Email Token'
    private mustForgotPassword = 'Reset Password Token'
    private tokensEmail(){
        return new TokenServices('email_token')
    }
    private tokensPassword() {
        return new TokenServices('password_token')
    }
    async create(data: any, state: 'register' | 'create') {
        const trx = await Database.transaction()
        try {
            if (state) { }
            const user = await User.create(data)
            const token = await this.tokensEmail().create(user, this.mustVerifyEmail)
            Event.emit('user:register', token)
            await trx.commit()
            return { user }
        } catch (error) {
            trx.rollback()
            throw error
        }
    }

    async updateEmail(user: User, newEmail) {
        user.email = newEmail
        user.unverified()
        await user.save()
        const token = await this.tokensEmail().create(user, this.mustVerifyEmail)
        await Event.emit('user:email:change', token)
        return {user, token}
    }

    async resendVerifyEmail(user: User, state: string){
        const token = await this.tokensEmail().create(user, this.mustVerifyEmail)
        switch (state) {
            case 'change':
                Event.emit('user:email:change', token)
                break;
            default:
                Event.emit('user:register', token)
                break;
        }
        return token.user
    }

    async verifyEmail(token) {
        const user = await this.tokensEmail().validate(token, this.mustVerifyEmail)
        user.verify()
        await user.save()
        await this.tokensEmail().revoke(user)
        Event.emit('user:email:verified', user)
        return user
    }


    async updatePassword(user: User, payload) {
        await Hash.verify(user.password, payload.old_password)
        user.password = payload.password
        await user.save()
        Event.emit('user:password:updated', user)
        return user
    }

    async forgotPassword(user: User) {
        const token = await this.tokensPassword().create(user, this.mustForgotPassword)
        Event.emit('user:password:forgot', token)
        return token
    }
    async resetPassword(token, newPassword){
        const user = await this.tokensPassword().validate(token, this.mustForgotPassword)
        user.password = newPassword
        await user.save()
        await this.tokensPassword().revoke(user)
        Event.emit('user:password:resetted', user)
        return user
    }

}
