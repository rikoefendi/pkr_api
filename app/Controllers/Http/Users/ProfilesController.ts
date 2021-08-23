import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { USER_STATUS_NEW, USER_STATUS_PENDING } from 'App/Const/Const'
import UserServices from 'App/Services/UsersServices'
import UpdateProfileValidator from 'App/Validators/UpdateProfileValidator'
export default class ProfilesController {
    show({auth}: HttpContextContract){
        return auth.user
    }
    async update({auth, request}: HttpContextContract){
        const data = await request.validate(UpdateProfileValidator)
        const user = await new UserServices().updateProfile(auth.user!, data)
        if(user.status || user.status == USER_STATUS_NEW) {
            user.status = USER_STATUS_PENDING
            user.save()
        }
        return user
    }
}
