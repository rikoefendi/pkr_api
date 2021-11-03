import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Drive from '@ioc:Adonis/Core/Drive'
import UploadAudio from 'App/Models/Break/UploadAudio'
import File from 'App/Models/File'

export default class UploadAudiosController {
    async store({ request, response }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                user_id: schema.number(),
                subject_id: schema.number(),
                file_id: schema.number()
            })
        })
        const uploadAudio = await UploadAudio.create(payload)
        return response.formatter(uploadAudio, 201)
    }
    async show({ params, response, auth }: HttpContextContract) {
        const { subjectId} = params
        await auth.authenticate()
        let uploadAudio: any = await UploadAudio.query().where('subject_id', subjectId).where('user_id', auth.user?.id!).orderBy('id', 'desc').first()
        if(!uploadAudio){
            return response.formatter(null, 200)
        }
        uploadAudio = uploadAudio.toJSON()
        const file = await File.find(uploadAudio.file_id)
        uploadAudio.file = null
        if(file){
            uploadAudio.file = await Drive.getSignedUrl(file.fullPath)
        }
        return response.formatter(uploadAudio, 200)
    }
}
