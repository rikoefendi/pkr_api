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
        const { subjectId } = params
        await auth.authenticate()
        let uploadAudio: any = await UploadAudio.query().where('subject_id', subjectId).where('user_id', auth.user?.id!).orderBy('id', 'desc').first()
        if (!uploadAudio) {
            return response.formatter(null, 200)
        }
        uploadAudio = uploadAudio.toJSON()
        const file = await File.find(uploadAudio.file_id)
        uploadAudio.file = null
        if (file) {
            uploadAudio.file = await Drive.getSignedUrl(file.fullPath)
        }
        return response.formatter(uploadAudio, 200)
    }

    // async storeForm({ request, response, params }: HttpContextContract) {
    //     // const payload = await request.validate({
    //     //     schema: schema.create({
    //     //         audio_id: schema.number([
    //     //             rules.exists({
    //     //                 table: 'upload_audios',
    //     //                 column: 'id'
    //     //             })
    //     //         ]),
    //     //         form_id: schema.number(),
    //     //         who_can_do: schema.enum(WHO_CON_DOES),
    //     //         label: schema.string(),
    //     //         label_second: schema.string.optional({}, [
    //     //             rules.requiredWhen('who_can_do', '=', WHO_CAN_DO_PATIENT)
    //     //         ])
    //     //     }),
    //     //     data: { audio_id: params.audioId, ...request.body() }
    //     // })
    //     // if (payload.who_can_do === WHO_CAN_DO_PATIENT) {
    //     //     payload.label = JSON.stringify({
    //     //         label: payload.label,
    //     //         label_second: payload.label_second
    //     //     })
    //     //     delete payload.label_second
    //     // } else {
    //     //     delete payload.label_second
    //     // }
    //     // // const form = await UploadAudioForm.create(payload)
    //     // if (payload.who_can_do === WHO_CAN_DO_PATIENT) {
    //     //     return response.formatter(this.makeFormsPatient(form.toJSON()), 201)
    //     // }
    //     // return response.formatter(form, 201)
    // }

    // private makeFormsPatient(form) {
    //     const forms: any = []
    //     const labels = JSON.parse(form.label)
    //     for (let i = 0; i < Object.keys(labels).length; i++) {
    //         const label = Object.keys(labels)[i];
    //         form.label = labels[label]
    //         forms.push(form)
    //     }
    //     return forms
    // }
}
