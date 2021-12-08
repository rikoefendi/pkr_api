import { Schema } from '@ioc:Mongoose'
import { Document } from 'mongoose'
import Base from './Base'
import Message from './Message'

class Conversation extends Base {
	static boot(_: Schema) {
		// schema.index({
		//     name: 'text'
		// })
		_.set('versionKey', false)
		_.set('timestamps', false)
	}
	static get schema() {
		return {
			repply: {
				type: new Schema({
					type: String,
					repplies: [{
						type: Schema.Types.ObjectId,
						ref: 'Conversation'
					}]
				})
			},
			message: {
				type: Schema.Types.ObjectId,
				ref: Message,
				index: true,
				default: null
			},
		}
	}
}
export default Conversation.buildModel<typeof Conversation.schema & Document>('Conversation')
