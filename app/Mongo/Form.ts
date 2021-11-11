import { Schema } from '@ioc:Mongoose'
import { Document } from 'mongoose'
import Base from './Base'

class Form extends Base {
	static boot(_: Schema) {
		// schema.index({
		//     name: 'text'
		// })
		_.set('versionKey', false)
		_.set('timestamps', false)
	}
	static get schema() {
		return {
			name: {
				type: String,
				index: true,
				required: true,
			},
			description: {
				type: String,
			},
			whoCanAccess: String,
			questions: [
				{
					question: String,
					isChallenge: Boolean,
					isScale: Number,
					options: [
						{
							option: String,
							score: Number
						},
					],
				},
			],
			type: String,
		}
	}
}
export default Form.buildModel<typeof Form.schema & Document>('Form')
