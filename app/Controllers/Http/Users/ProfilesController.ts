import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FILE_TYPE_MEMBER_USER, USER_STATUS_NEW, USER_STATUS_PENDING } from 'App/Const/Const'
import UserStatusException from 'App/Exceptions/UserStatusException'
import FileServices from 'App/Services/FileServices'
import UserServices from 'App/Services/UsersServices'
import UpdateProfileValidator from 'App/Validators/UpdateProfileValidator'
export default class ProfilesController {
    async show({auth}: HttpContextContract){
        const file = await new FileServices().get(auth.user?.id, FILE_TYPE_MEMBER_USER)
        return {data:{ ...auth.user?.toJSON(), ...file}}
    }
    async update({auth, request}: HttpContextContract){
        const data = await request.validate(UpdateProfileValidator)
        const user = await new UserServices().updateProfile(auth.user!, data)
        if(!user.status || user.status == USER_STATUS_NEW) {
            user.status = USER_STATUS_PENDING
            user.save()
        }
        const file = await new FileServices().get(auth.user?.id, FILE_TYPE_MEMBER_USER)
        return {data:{ ...user.toJSON(), ...file}}
    }

    async status({auth, request, response}: HttpContextContract){
        const status = request.body().status
        if(status !== USER_STATUS_NEW) throw new UserStatusException('can`t update status', 403, 'FORBIDDEN_UPDATE_STATUS')
        if(auth.user){
            auth.user.status = status
            await auth.user?.save()
            response.status(204)
        }else{
            throw new UserStatusException('can`t update status', 403, 'FORBIDDEN_UPDATE_STATUS') 
        }
    }
}
