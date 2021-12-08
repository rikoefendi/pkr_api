import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Conversation from 'App/Models/Break/Conversation'
export default class ConversationsController {

    async create({ request, response }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                userId: schema.number([rules.exists({
                    table: 'users',
                    column: 'id'
                })]),
                virtualId: schema.number([rules.exists({
                    table: 'virtuals',
                    column: 'id'
                })]),
                label: schema.string.optional({}, [rules.maxLength(220)])
            })
        })
        const conversation = await Conversation.create(payload)
        return response.formatter(conversation, 201)
    }

    async fetchByUserId({ request, response, params }: HttpContextContract) {
        const userId = params.userId
        const virtualId = request.qs().virtualId
        let query = Conversation.query().where('user_id', userId)
        if(virtualId){
            query = query.where('virtual_id', virtualId)
        }
        const conversation = await query.preload('virtual')
        return response.formatter(conversation)
    }

    async fetchMessages({ response, params }: HttpContextContract) {
        const conversationId = params.conversationId
        const conversation = await Conversation.query().where('id', conversationId).preload('questions').preload('virtual').firstOrFail()
        return response.formatter(conversation)
    }

    async storeMessage({ request, response, params }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                conversationId: schema.number([rules.exists({
                    table: 'conversations',
                    column: 'id'
                })]),
                questionId: schema.number([rules.exists({
                    table: 'questions',
                    column: 'id'
                })])
            }),
            data: params
        })
        const conversation = await Conversation.query().where('id', payload.conversationId).firstOrFail()
        await conversation.related('questions').attach([payload.questionId])
        
        return response.formatter(await conversation.load('questions'))
    }
}
