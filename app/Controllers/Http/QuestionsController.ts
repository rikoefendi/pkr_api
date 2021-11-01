import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
// import { HasMany } from '@ioc:Adonis/Lucid/Orm'
// import Answer from 'App/Models/Answer'
// import Evaluation from 'App/Models/Evaluation'
import Question from 'App/Models/Question'

export default class QuestionsController {
    async storeOrUpdate({ request }: HttpContextContract) {
        const questionId = request.param('id')
        const isEdit: Boolean = request.method() == 'PUT' && questionId
        const question = await request.validate({
            schema: schema.create({
                is_choice: schema.boolean.optional(),
                is_challenge: schema.boolean.optional(),
                is_score: schema.number.optional(),
                question: schema.string.optional({}, isEdit ? [rules.maxLength(500)] : [
                    rules.required(),
                    rules.minLength(20),
                    rules.maxLength(500)
                ]),
                evaluation_id: schema.number([
                    rules.exists({
                        table: 'evaluations',
                        column: 'id'
                    })
                ])
            }),
        })
        let data: Question
        if (isEdit) {
            data = await Question.findOrFail(questionId)
            data.merge(question)
            await data.save()
        } else {
            data = await Question.create(question)
        }
        return {
            data,
            status: 200,
            message: 'Success',
            error: false
        }
    }

    public async show({ request }: HttpContextContract) {
        const data = await Question.query().preload('answer').preload('choices').where('id', request.param('id')).firstOrFail()
        return {
            data,
            error: false,
            message: 'success',
            status: 200
        }
    }

    public async destroy({ request, response }: HttpContextContract) {
        const question = await Question.findOrFail(request.param('id'))
        await question.delete()
        response.status(204)
        return
    }

}
