import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'
import UserServices from 'App/Services/UsersServices'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
    private userServices = new UserServices()
    async register({request, response, auth}: HttpContextContract){
        
        const data = await request.validate(RegisterValidator)     
        const user = await this.userServices.create(data)
        const token = await auth.login(user, {expiresIn: '7d'})
        response.ok({
            message: 'User Successfuly registered',
            data: {user, token}
        })
    }

    async login({request, response, auth}: HttpContextContract){
        const payload = request.body()
        const token = await auth.attempt(payload.email, payload.password, {expiresIn: '7d'})
        Event.emit('user:login', {request, user: auth.user!})
        return token
    }

    async logout({auth}: HttpContextContract){
        await auth.logout()
        return {revoke: true}
    }
}
