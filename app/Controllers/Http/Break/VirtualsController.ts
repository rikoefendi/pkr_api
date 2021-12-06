import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Virtual from 'App/Models/Break/Virtual'
export default class VirtualsController {
    async index({ response }: HttpContextContract) {
        const virtual = await Virtual.query().paginate(10)
        return response.formatter(virtual.all()).setMeta(virtual.getMeta())
    }
    async show({ request, response, params }: HttpContextContract) {
        const virtualId = params.virtualId
        const isQuestion = request.qs().questions
        
        let query = Virtual.query().where('id', virtualId)
        if(isQuestion){
            query = query.preload('questions')
        }
        return response.formatter(await query.firstOrFail())
    }
    async storeOrUpdate({ request, response, params }: HttpContextContract) {
        const virtualId = params.virtualId
        const isUpdate = request.method() === 'PUT' && virtualId
        const payload = await request.validate({
            schema: schema.create({
                name: schema.string({}, [rules.minLength(10)]),
                description: schema.string.optional({}, [rules.minLength(20)]),
                prologue: schema.string.optional({}, [rules.minLength(20)])
            })
        })
        if (isUpdate) {
            const virtual = await Virtual.findOrFail(virtualId)
            virtual.name = payload.name as any
            virtual.description = payload.description as any
            virtual.prologue = payload.prologue as any
            await virtual.save()
            return response.formatter(virtual, 200, 'Success', false)
        }
        const virtual = await Virtual.create(payload)
        return response.formatter(virtual, 201, 'Created')
    }

    async destroy({ response, params }) {
        const virtualId = params.virtualId
        await Virtual.findOrFail(virtualId)
        return response.formatter(null, 200, 'Deleted')

    }
}
