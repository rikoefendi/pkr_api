import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import Message from 'App/Mongo/Message'
export default class MessagesController {
    async index({ response }: HttpContextContract) {
        const messages = await Message.find()
        return response.formatter(messages)
    }

    async show({ response, params }) {
        const learning = await Message.findOne({ _id: params.messageId }).populate('conversations')
        return response.formatter(learning)
    }
    async storeOrUpdate({ request, response, params }: HttpContextContract) {
        const messageId = params.messageId
        const isUpdate = request.method() === 'PUT' && messageId

        const payload = await request.validate({
            schema: schema.create({
                message: schema.string.optional({}, !isUpdate ? [rules.required()] : []),
                comment: schema.string.optional(),
            })
        })
        if (isUpdate) {
            const learning = await Message.findOne({ _id: messageId })
            if (!learning) return response.formatter(null, 404, 'Not Found')
            for (const key in payload) {
                learning[key] = payload[key]
            }
            await learning.save()
            return response.formatter(learning, 200, 'Updated')
        }
        const learning = await Message.create(payload)
        return response.formatter(learning, 201, 'Created')
    }

    async destroy({ response, params }: HttpContextContract) {
        const learning = await Message.findOne({ _id: params.messageId })
        if (!learning) response.formatter(null, 404, 'Not Found')
        await learning?.delete()
        return response.formatter(null, 200, 'Deleted')
    }
}