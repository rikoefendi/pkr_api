import mongoose, { Schema, SchemaDefinition } from '@ioc:Mongoose'
import { Document, Model } from 'mongoose'
class Base {
	private static _schema: Schema
	public static timestamps: boolean
	static boot(_: Schema) { }
	static get schema(): SchemaDefinition {
		throw new Error('You must override the static get schema() property')
	}
	static _getRawSchema() {
		return this.schema
	}
	static buildSchema(options: any = {}) {
		if (this._schema) {
			return this._schema
		}

		if (this.timestamps !== false) {
			options.timestamps = { createdAt: 'created_at', updatedAt: 'updated_at' }
		}

		this._schema = new Schema(this._getRawSchema(), options)
		this._schema.statics.primaryKey = this.primaryKey

		return this._schema
	}
	static buildModel<T extends Document>(name): Model<T> {
		if (!name) {
			throw new Error('You must specify a model name on Model.buildModel("ModelName") ')
		}
		this.buildSchema()
		this._schema.loadClass(this)

		this.boot(this._schema)
		// this._schema.plugin(Paginate)
		const localModel = mongoose.model<T>(name, this._schema)
		this._schema.indexes().forEach((index) => {
			localModel.createIndexes(index)
		})
		return localModel
	}

	static get primaryKey(): any {
		return 'id'
	}
}
export default Base