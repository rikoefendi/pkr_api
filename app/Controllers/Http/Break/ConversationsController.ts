import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Conversation from 'App/Mongo/Conversation'
export default class ConversationsController {
    async index({ response }: HttpContextContract) {
        const conversations = await Conversation.find()
        return response.formatter(conversations)
    }

    async show({ response, params }) {
        const conversation = await Conversation.findOne({ _id: params.messageId }).populate('conversations')
        return response.formatter(conversation)
    }
    async storeOrUpdate({ request, response, params }: HttpContextContract) {
        const messageId = params.messageId
        const isUpdate = request.method() === 'PUT' && messageId

        const payload = await request.validate({
            schema: schema.create({
                type: schema.enum.optional(['patient', 'parent', 'counselor']),
                message: schema.string.optional({}, !isUpdate ? [rules.required()] : []),
                repply: schema.array.optional().members(schema.string())
            })
        })
        if (isUpdate) {
            const conversation = await Conversation.findOne({ _id: messageId })
            if (!conversation) return response.formatter(null, 404, 'Not Found')
            const repplies = [...(conversation['repply.repplies'] || []), ...(payload.repply || [])]
            conversation['repply.type'] = payload.type
            conversation['repply.repplies'] = repplies.filter((item, index) => repplies.indexOf(item) !== index)
            conversation['message'] = payload.message as any
            await conversation.save()
            return response.formatter(conversation, 200, 'Updated')
        }
        const conversation = await Conversation.create({
            message: payload.message,
            repply: {
                type: payload.type,
                repplies: payload.repply
            }
        })
        return response.formatter(conversation, 201, 'Created')
    }

    async destroy({ response, params }: HttpContextContract) {
        const conversation = await Conversation.findOne({ _id: params.messageId })
        if (!conversation) response.formatter(null, 404, 'Not Found')
        await conversation?.delete()
        return response.formatter(null, 200, 'Deleted')
    }
}