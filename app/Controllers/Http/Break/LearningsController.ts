import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Learning from 'App/Models/Break/Learning'
import Message from 'App/Models/Break/Message'
const BASE_URL = Env.get('BASE_URL')
const Avatars = {
    'counselor-male': `${BASE_URL}/counselor-male.png`,
    'counselor-female': `${BASE_URL}/counselor-female.png`,
    'parent': `${BASE_URL}/parent.png`,
    'patient-male': `${BASE_URL}/patient-male.png`,
    'patient-female': `${BASE_URL}/patient-female.png`,
}
export default class LearningsController {
    async index({ response }: HttpContextContract) {
        const learning = await Learning.query().paginate(10)
        return response.formatter(learning.all()).setMeta(learning.getMeta())
    }
    async show({ request, response, params, auth }: HttpContextContract) {
        const learningId = params.learningId
        const isMessage = request.qs().message
        
        let query = Learning.query().where('id', learningId)
        if(isMessage){
            query = query.preload('messages')
        }
        let learning = await (await query.firstOrFail()).toJSON()
        learning.messages = learning.messages.map( message => {
            message = this.generateAddtionalDataMessage(message, auth.user)
            // console.log(message);
            
            return message
        })
        return response.formatter(learning)
    }
    async storeOrUpdate({ request, response, params }: HttpContextContract) {
        const learningId = params.learningId
        const isUpdate = request.method() === 'PUT' && learningId
        const payload = await request.validate({
            schema: schema.create({
                name: schema.string({}, [rules.minLength(10)]),
                description: schema.string.optional({}, [rules.minLength(20)]),
                prologue: schema.string.optional({}, [rules.minLength(20)])
            })
        })
        if (isUpdate) {
            const learning = await Learning.findOrFail(learningId)
            learning.name = payload.name as any
            learning.description = payload.description as any
            learning.prologue = payload.prologue as any
            await learning.save()
            return response.formatter(learning, 200, 'Success', false)
        }
        const learning = await Learning.create(payload)
        return response.formatter(learning, 201, 'Created')
    }

    async destroy({ response, params }) {
        const learningId = params.learningId
        await Learning.findOrFail(learningId)
        return response.formatter(null, 200, 'Deleted')
    }
    async storeMessage({response, params}:HttpContextContract){
        const {learningId, messageId} = params
        const learning = await Learning.query().where('id', learningId).preload('messages').firstOrFail()
        const message = await Message.findOrFail(messageId)
        if(!learning.messages.filter(mess => mess.type == message.type).length && learning.messages.length){
            return response.formatter(null, 400, 'Not Same Type', true)
        }
        if(!learning.messages.filter(mess => mess.id === message.id).length){
            await learning.related('messages').sync([messageId], false)
            learning.messages.push(message)
        }
        // console.log(await learning.related('messages').query());
        
        return response.formatter(await learning)
    }

    async destroyMessage({response, params}: HttpContextContract){
        const {learningId, messageId} = params
        const repply = await Learning.findOrFail(learningId)
        await repply.related('messages').detach([messageId])
        return response.formatter(null, 200, 'Deleted')
    }
    private generateAddtionalDataMessage(message, user) {
        const isCounselor = message.type === 'counselor'
        message.name = isCounselor ? user?.name : message.type === 'parent' ? 'Orang Tua' : 'Pasien'
        const gender = isCounselor ? user?.gender : 'LAKI-LAKI'
        const genderAvatar = gender === 'LAKI-LAKI' ? 'male' : 'female'
        message.avatar = Avatars[message.type == 'parent' ? 'parent' : message.type + '-' + genderAvatar]
        return message
    }
}
