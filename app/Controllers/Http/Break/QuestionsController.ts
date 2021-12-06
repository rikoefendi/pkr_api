import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Question from 'App/Models/Break/Question'
export default class QuestionsController {
    async index({response}: HttpContextContract){
        const question = await Question.query().paginate(10)
        return response.formatter(question.all()).setMeta(question.getMeta())
    }
    async show({response, params}: HttpContextContract){
        const questionId = params.questionId
        const question = await Question.query().preload('questions').where('id', questionId).firstOrFail()
        return response.formatter(question)
    }
    async storeOrUpdate({ request, response, params }: HttpContextContract) {
        const {questionId} = params
        const isUpdate = request.method() === 'PUT' && questionId
        const payload = await request.validate({
            schema: schema.create({
                question: schema.string({}, [rules.minLength(10)]),
                questionId: schema.number.optional(),
                virtualId: schema.number.optional(),
                comment: schema.string.optional(),
                actions: schema.string.optional()
            })
        })
        if (isUpdate) {
            const question = await Question.findOrFail(questionId)
            question.question = payload.question as any
            question.questionId = payload.questionId as any
            question.virtualId = payload.virtualId as any
            question.actions = payload.actions as any
            await question.save()
            return response.formatter(question, 200, 'Success', false)
        }
        const question = await Question.create(payload)
        return response.formatter(question, 201, 'Created')
    }

    async destroy({response, params}){
        const questionId = params.questionId
        await Question.findOrFail(questionId)
        return response.formatter(null, 200, 'Deleted')
    }
}
