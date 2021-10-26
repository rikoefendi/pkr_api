import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Counselor from 'App/Models/Counselor'

export default class CounselorsController {
    async index(){
        const counselor = await Counselor.query().preload('image').firstOrFail()
        return {
            data: counselor,
            error: false,
            message: 'success',
            stattus: 200
        }
    }
    async storeOrUpdate({ request, response }: HttpContextContract) {
        const data = await request.validate({
            schema: schema.create({
                file_id: schema.number([
                    rules.exists({table: 'files', column: 'id'})
                ]),
                name: schema.string({}, [
                    rules.maxLength(225)
                ]),
                description: schema.string({}, [
                    rules.maxLength(1000),
                    rules.minLength(20)
                ])
            })
        })
        let counselor: Counselor
        let isUpdate = request.method() == 'PUT' && request.param('id')
        if (isUpdate) {
            counselor = await Counselor.findOrFail(request.param('id'))
            counselor.merge(data)
            await counselor.save()
        } else {
            counselor = await Counselor.create(data)
        }
        response.status(isUpdate ? 200 : 201)
        return {
            data: counselor,
            error: false,
            message: isUpdate ? 'updated' : 'created',
            status: isUpdate ? 200 : 201
        }
    }
    async show({request, response}: HttpContextContract){
        const counselor = await Counselor.findOrFail(request.param('id'))
        response.status(200)
        return {
            data: counselor,
            error: false,
            message: 'success',
            status: 200
        }
    }
    async destroy({request, response}: HttpContextContract){
        const counselor = await Counselor.findOrFail(request.param('id'))
        await counselor.delete()
        response.status(204)
        return
    }
}
