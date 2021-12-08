import { Schema } from '@ioc:Mongoose'
import { Document } from 'mongoose'
import Base from './Base'

class Message extends Base {
	static boot(_: Schema) {
		// schema.index({
		//     name: 'text'
		// })
		_.set('versionKey', false)
		_.set('timestamps', true)
	}
	static get schema() {
		return {
			message: {
				type: String,
				index: true
			},
			comment: {
				type: String,
				default: null
			}
		}
	}
}
export default Message.buildModel<typeof Message.schema & Document>('Message')
