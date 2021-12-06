import { Schema } from '@ioc:Mongoose'
import { Document } from 'mongoose'
import Base from './Base'

class Address extends Base {
	static boot(_: Schema) {
		// schema.index({
		//     name: 'text'
		// })
		_.set('versionKey', false)
		_.set('timestamps', false)
	}
	static get schema() {
		return {
			_id: Number,
			name: {
				type: String,
				index: true,
				required: true,
			},
			type: String,
			parent_id: {
				type: Number,
				index: true,
				ref: 'Address',
			},
		}
	}
}
export default Address.buildModel<typeof Address.schema & Document >('Address')
