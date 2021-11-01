import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';
import Training from 'App/Models/Training'
import map from 'lodash/map'
export default class TrainingController {
    async index({ request }: HttpContextContract) {
        // const { page = 1 } = request.qs()
        // const trainingPaginate = await (await Training.query().preload('subjects').paginate(page, 10)).toJSON()
        // let trainings = await map(trainingPaginate.data, training => training.toJSON())
        // const subjectIds: any = []
        // map(trainings, training => {
        //     subjectIds.push(...map(training.subjects, 'id'))
        // })
        // const dates = await Database.query().from('schedules').select('subject_id').min('start_date', 'start_date').max('end_date', 'end_date').whereIn('subject_id', subjectIds).groupBy('subject_id')
        // trainings = map(trainings, training => {
        //     const date = dates.filter(date => {
        //         return map(training.subjects, 'id').includes(date.subject_id)
        //     })[0]
        //     return Object.assign({}, training, date)
        // })
        // return {
        //     data: trainings,
        //     error: false,
        //     message: 'success',
        //     stattus: 200,
        //     meta: trainingPaginate.meta

        // }
    }
    async storeOrUpdate({ request, response }: HttpContextContract) {
        const data = await request.validate({
            schema: schema.create({
                name: schema.string({}, [
                    rules.maxLength(225)
                ]),
                capacity: schema.number(),
                status: schema.number.optional()
            })
        })
        let training: Training
        let isUpdate = request.method() == 'PUT' && request.param('id')
        if (isUpdate) {
            training = await Training.findOrFail(request.param('id'))
            training.merge(data)
            await training.save()
        } else {
            training = await Training.create(data)
        }
        response.status(isUpdate ? 200 : 201)
        return {
            data: training,
            error: false,
            message: isUpdate ? 'updated' : 'created',
            status: isUpdate ? 200 : 201
        }
    }
    async show({ request, response }: HttpContextContract) {
        const training = await Training.findOrFail(request.param('id'))
        response.status(200)
        return {
            data: training,
            error: false,
            message: 'success',
            status: 200
        }
    }
    async destroy({ request, response }: HttpContextContract) {
        const training = await Training.findOrFail(request.param('id'))
        await training.delete()
        response.status(204)
        return
    }
}
