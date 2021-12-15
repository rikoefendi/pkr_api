import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Conversation from 'App/Models/Break/Conversation'
import Message from 'App/Models/Break/Message'
export default class ConversationsController {

    async create({ request, response }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                userId: schema.number([rules.exists({
                    table: 'users',
                    column: 'id'
                })]),
                learningId: schema.number([rules.exists({
                    table: 'learnings',
                    column: 'id'
                })]),
                label: schema.string.optional({}, [rules.maxLength(220)])
            })
        })
        const conversation = await Conversation.create(payload)
        conversation.count = (await Database.from(Conversation.table).where('user_id', payload.userId).where('learning_id', payload.learningId).count('* as count'))[0].count

        return response.formatter(conversation, 201)
    }
    async destroy({ response, params }: HttpContextContract) {
        const { conversationId, userId } = params
        if (userId) {
            await Conversation.query().where('user_id', userId).delete()
        } else {
            await (await Conversation.findOrFail(conversationId)).delete()
        }
        return response.formatter(null, 200, 'Deleted')
    }
    async fetchByUserId({ request, response, params }: HttpContextContract) {
        const userId = params.userId
        const leraningId = request.qs().leraningId
        let query = Conversation.query().where('user_id', userId)
        if (leraningId) {
            query = query.where('learning_id', leraningId).preload('learning')
        } else {
            query = query.preload('messages')
        }
        const conversation = await query

        return response.formatter(conversation)
    }

    async fetchMessages({ response, params }: HttpContextContract) {
        const conversationId = params.conversationId
        const conversation = await Conversation.query().where('id', conversationId)
            .preload('messages', query => query.pivotColumns(['created_at']).orderBy('pivot_created_at', 'asc').preload('messages')).firstOrFail()
        conversation.count = (await Database.from(Conversation.table).where('user_id', conversation.userId).where('learning_id', conversation.learningId).count('* as count'))[0].count
        return response.formatter(conversation)
    }

    async storeMessage({ response, params }: HttpContextContract) {
        const conversation = await Conversation.findOrFail(params.conversationId)
        let message = await Message.query().preload('messages').where('id', params.messageId).firstOrFail()
        await conversation.related('messages').attach([message.id])
        return response.formatter(message)
    }
}