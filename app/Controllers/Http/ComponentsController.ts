import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
// import groupBy from 'lodash.groupby'
import Component from 'App/Models/Component'
// import Subject from 'App/Models/Subject';
export default class ComponentsController {
	async storeOrUpdate({ request, response }: HttpContextContract) {
		const data = await request.validate({
			schema: schema.create({
				name: schema.string({}, [rules.maxLength(100)]),
				label: schema.string.optional({}, [rules.maxLength(100)]),
			}),
		})
		if (!data.label) data.label = data.name
		let counselor: Component
		let isUpdate = request.method() === 'PUT' && request.param('id')
		if (isUpdate) {
			counselor = await Component.findOrFail(request.param('id'))
			counselor.merge(data)
			await counselor.save()
		} else {
			counselor = await Component.create(data)
		}
		response.status(isUpdate ? 200 : 201)
		return {
			data: counselor,
			error: false,
			message: isUpdate ? 'updated' : 'created',
			status: isUpdate ? 200 : 201,
		}
	}
	// async subjectedComponents({ request }: HttpContextContract) {
	// const subjectedComponent = await request.validate({
	//     schema: schema.create({
	//         components: schema.array().members(schema.object().members({
	//             component_id: schema.number([rules.exists({ column: 'id', table: 'components' })]),
	//             label: schema.string({}, [rules.maxLength(100)]),
	//             description: schema.string({}, [rules.maxLength(500)])
	//         })),
	//         subject_id: schema.number([rules.exists({ column: 'id', table: 'subjects' })]),
	//     })
	// })
	// const subject = await Subject.findOrFail(subjectedComponent.subject_id)
	// const groupComp = groupBy(subjectedComponent.components, comp => comp.component_id)
	// // await subject.related('components').detach()
	// await Promise.all(Object.keys(groupComp).map(async key => {
	//     const comp = groupComp[key]
	//     await Promise.all(comp.map(async component => {
	//         // await subject.related('components').attach({ [component.component_id]: component })
	//     }))
	// }))

	// return {
	//     error: false,
	//     message: 'success',
	//     status: 200
	// }
	// }
}
