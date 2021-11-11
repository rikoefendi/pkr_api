import { Schema } from '@ioc:Mongoose'
import { Document } from 'mongoose'
import Base from './Base'
const Patient = new Schema({
	name: String,
	type: String,
	gender: String,
	age: Number,
})
class Response extends Base {
	static boot(_: Schema) {
		// schema.index({
		//     name: 'text'
		// })
		_.set('versionKey', false)
	}
	static get schema() {
		return {
			formId: {
				type: Schema.Types.ObjectId,
				ref: 'Form',
			},
			subjectId: {
				type: Number
			},
			userId: Number,
			response: [
				{
					questionId: {
						type: Schema.Types.ObjectId,
					},
					answer: String,
					scale: Number,
					optionId: String,
					score: Number
				},
			],
			patient: {
				type: Patient
			}

		}
	}
}
export default Response.buildModel<typeof Response.schema & Document>('Response')
