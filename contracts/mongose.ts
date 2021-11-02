// contracts/Mongoose.ts

// Declare @ioc:Mongoose module
declare module '@ioc:Mongoose' {
	import { MongooseOptions } from 'mongoose'
	import * as mongoose from 'mongoose'
	// Export everything from Mongoose
	// Since that's what our provider is doing
	export { Schema, SchemaDefinition, model } from 'mongoose'
	export interface MongooseConfig {
		options: MongooseOptions
		user: string
		pass: string
		host: string
		port: number
		dbName: string
		url: string
	}
	const Mongoose: typeof mongoose
	export default Mongoose
}
