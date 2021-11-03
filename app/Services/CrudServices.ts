import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
export default class CrudServices<T extends typeof BaseModel> {
	constructor(public model: T) {}
	async create(data) {
		return this.model.create(data)
	}
	async update(query, data) {
		const model = await query.firstOrFail()
		model.merge(data)
		await model.save()
		return model
	}
	async findById(id) {
		return this.model.find(id)
	}
	async destroyById(id) {
		const model = await this.model.findOrFail(id)
		await model.delete()
		return true
	}

	fetchByOrId(searchPayload?: Array<Array<any>>, id?: any) {
		let query = this.fetch(searchPayload)
		if (!isNaN(Number(id))) {
			query = query.orWhere('id', id)
		}
		return query
	}

	fetch(searchPayload?: Array<Array<any>>) {
		let model = this.model.query()
		if (searchPayload) {
			model = this.whereBuilder(model, searchPayload)
		}
		return model
	}

	private whereBuilder(model, payloads) {
		for (let i = 0; i < payloads.length; i++) {
			const [column, operator, value] = payloads[i]
			model = model.where(column, operator, value)
		}
		return model
	}
}
