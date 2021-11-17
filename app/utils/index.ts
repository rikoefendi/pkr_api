export class ResponseFormatter {
	public meta = {}
	constructor(public data, public status = 200, public message?: any, public error = false){
		const messages = {
			'200': 'success',
			'204': 'no content',
			'201': 'created',
			'404': 'not found',
			'422': 'entity not valid',
			'500': 'internal server error',
		}
		if (!message) {
			message = messages[status]
		}
	}
	setMeta(meta = {}){
		this.meta = meta
	}
}
