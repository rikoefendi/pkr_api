import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserServices from 'App/Services/UsersServices'
import EmailValidator from 'App/Validators/EmailValidator'
import ResetPasswordValidator from 'App/Validators/Password/ResetValidator'
import UpdatePasswordValidator from 'App/Validators/Password/UpdateValidator'
export default class PasswordsController {
    constructor(private userService = new UserServices()) { }
    async update({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(UpdatePasswordValidator)
        const user = auth.user as User
        await this.userService.updatePassword(user, payload)
        response.ok({
            message: 'Password Has Updated'
        })
    }
    async forgot({ request, response }: HttpContextContract) {
        const payload = await request.validate(EmailValidator)
        const user = await User.findByOrFail('email', payload.email)
        await this.userService.forgotPassword(user)
        response.ok({
            message: 'Password Reset Has requested'
        })
    }
    async reset({ request, response }: HttpContextContract) {
        const payload = await request.validate(ResetPasswordValidator)
        await this.userService.resetPassword(payload.token, payload.password)
        response.ok({
            message: 'Password Has Successfully reset'
        })
    }
}
