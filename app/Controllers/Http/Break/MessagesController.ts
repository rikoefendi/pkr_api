import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Message, { MessageStaging, MessageTypes } from 'App/Models/Break/Message'
export default class MessagesController {
    async index({response}: HttpContextContract){
        const message = await Message.query().paginate(10)
        return response.formatter(message.all()).setMeta(message.getMeta())
    }
    async show({response, params}: HttpContextContract){
        const messageId = params.messageId
        const message = await Message.query().preload('messages').where('id', messageId).firstOrFail()
        return response.formatter(message)
    }
    async storeOrUpdate({ request, response, params }: HttpContextContract) {
        const {messageId} = params
        const isUpdate = request.method() === 'PUT' && messageId
        const payload = await request.validate({
            schema: schema.create({
                message: schema.string({}, []),
                comment: schema.string.optional(),
                type: schema.enum(MessageTypes),
                stage: schema.enum.optional(MessageStaging)
            })
        })
        if (isUpdate) {
            const message = await Message.findOrFail(messageId)
            message.message = payload.message as any
            message.comment = payload.comment
            message.type = payload.type as any
            await message.save()
            return response.formatter(message, 200, 'Success', false)
        }
        const message = await Message.create(payload)
        return response.formatter(message, 201, 'Created')
    }

    async destroy({response, params}: HttpContextContract){
        const messageId = params.messageId
        await Message.findOrFail(messageId)
        return response.formatter(null, 200, 'Deleted')
    }

    async storeRepply({response, params}:HttpContextContract){
        const {messageId, repplyId} = params
        const messages = await Message.query().where('id', 'in', [messageId, repplyId]).preload('messages')
        const message = messages.filter(mess => mess.id == messageId)[0]
        const repply = messages.filter(mess => mess.id == repplyId)[0]
        if(!repply || !message) return response.formatter(null, 404, 'Message Not Found')
        const repplies = await message.related('messages')
        if(!await message.messages.filter(mess => mess.type == repply.type).length && message.messages.length){
            return response.formatter(null, 400, 'Not Same Type', true)
        }
        await repplies.sync([repplyId], false)
        message.messages = await message.related('messages').query() as ManyToMany<typeof Message>
        return response.formatter(message)
    }

    async destroyRepply({response, params}: HttpContextContract){
        const {repplyId, messageId} = params
        const repply = await Message.findOrFail(messageId)
        await repply.related('messages').detach([repplyId])
        return response.formatter(null, 200, 'Deleted')
    }
}
