import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Learning from 'App/Mongo/Learning'
export default class LearningsController {
    async index({ response }: HttpContextContract) {
        const learnings = await Learning.find()
        return response.formatter(learnings)
    }

    async show({ response, params }) {
        const learning = await Learning.findOne({ _id: params.learningId }).populate('conversations')
        return response.formatter(learning)
    }
    async storeOrUpdate({ request, response, params }: HttpContextContract) {
        const learningId = params.learningId
        const isUpdate = request.method() === 'PUT' && learningId

        const payload = await request.validate({
            schema: schema.create({
                name: schema.string.optional({}, !isUpdate ? [rules.required()] : []),
                description: schema.string.optional(),
                prologue: schema.string.optional(),
                gender: schema.enum(['male', 'female'])
            })
        })
        if (isUpdate) {
            const learning = await Learning.findOne({ _id: learningId })
            if (!learning) return response.formatter(null, 404, 'Not Found')
            for (const key in payload) {
                learning[key] = payload[key]
            }
            await learning.save()
            return response.formatter(learning, 200, 'Updated')
        }
        const learning = await Learning.create(payload)
        return response.formatter(learning, 201, 'Created')
    }

    async destroy({ response, params }: HttpContextContract) {
        const learning = await Learning.findOne({ _id: params.learningId })
        if (!learning) response.formatter(null, 404, 'Not Found')
        await learning?.delete()
        return response.formatter(null, 200, 'Deleted')
    }

    async pushConversation({ response, params }: HttpContextContract) {
        const learning = await Learning.updateOne({ _id: params.learningId }, { $push: { 'conversations': params.conversationId } }).populate('conversations')
        return response.formatter(learning, 200, 'Added')
    }

    async pullConversation({ response, params }: HttpContextContract) {
        const learning = await Learning.updateOne({ _id: params.learningId }, { $pull: { 'conversations': params.conversationId } }).populate('conversations')
        return response.formatter(learning, 200, 'Removed')
    }
}
