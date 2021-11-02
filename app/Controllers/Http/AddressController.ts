import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Address from 'App/Mongo/Address'
export default class AddressController {
	async suggest({ request }: HttpContextContract) {
		const {
			query,
			page = 1,
			perPage = 15,
		} = await request.validate({
			schema: schema.create({
				query: schema.string.optional(),
				page: schema.number.optional(),
				perPage: schema.number.optional(),
			}),
		})
		const queryOptions: any = {
			type: 'city',
		}
		if (query) queryOptions.name = { $regex: new RegExp(`${query}`, 'i') }
		const { docs, pages, total } = await Address.paginate(queryOptions, {
			page,
			limit: perPage,
			lean: true,
			populate: 'parent_id',
		})

		const data = [] as any
		for (let i = 0; i < docs.length; i++) {
			const doc = docs[i] as any
			const province = doc.parent_id
			data.push({
				label: `${doc.name}, ${province.name}`,
				id: doc._id,
				city: doc.name,
				province_id: province._id,
				province: province.name,
			})
		}
		return {
			data,
			meta: {
				pages,
				total,
				perPage,
				page,
			},
		}
	}
}
