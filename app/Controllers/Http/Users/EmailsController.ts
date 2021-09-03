import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import UserServices from 'App/Services/UsersServices'
import EmailValidator from 'App/Validators/EmailValidator'
export default class EmailsController {
    private userService = new UserServices()


    async update({ request, auth }: HttpContextContract) {

        const {email:  newEmail} = await request.validate(EmailValidator)   
        const user = await auth.user as User
        await this.userService.updateEmail(user, newEmail)
        return {
            message: 'Email Successfuly change, please check email to verify new email'
        }
    }
    async verify({ request }: HttpContextContract) {
        let {token} = await request.validate({
            schema: schema.create({
                token: schema.string()
            })
        })
        await this.userService.verifyEmail(token)
        return {
            message: 'email successfully verified'
        }
    }

    async resend({request, response}: HttpContextContract){
        const state = request.qs().state || 'register'
        const user = await User.findByOrFail('email', request.body().email)
        if(user.emailVerifiedAt) return {
            message: 'email has activated'
        }
        await this.userService.resendVerifyEmail(user, state)
        response.ok({
            message: 'email verify successfully resend'
        })
    }
}
