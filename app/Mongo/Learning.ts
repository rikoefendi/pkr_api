import { Schema } from '@ioc:Mongoose'
import { Document } from 'mongoose'
import Base from './Base'

class Learning extends Base {
	static boot(_: Schema) {
		// schema.index({
		//     name: 'text'
		// })
		_.set('versionKey', false)
		_.set('timestamps', false)
	}
	static get schema() {
		return {
			name: { type: String, default: null },
			description: { type: String, default: null },
			prologue: { type: String, default: null },
			gender: { type: String, default: null },
			conversations: [{
				type: Schema.Types.ObjectId,
				ref: 'Conversation',
				default: null
			}]
		}
	}
}
export default Learning.buildModel<typeof Learning.schema & Document>('Learning')
