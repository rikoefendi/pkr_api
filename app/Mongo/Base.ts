import { Schema, model, SchemaDefinition } from "@ioc:Mongoose";
class Base {
    private static _schema: Schema;
    public static timestamps: boolean;
    static boot(_: Schema) { }
    static get schema():  SchemaDefinition {
        throw new Error("You must override the static get schema() property");
    }
    static _getRawSchema() {
        return this.schema;
    }
    static buildSchema(options: any = {}) {
        if (this._schema) {
            return this._schema;
        }

        if (this.timestamps !== false) {
            options.timestamps = { createdAt: "created_at", updatedAt: "updated_at" };
        }

        this._schema = new Schema(this._getRawSchema(), options);
        this._schema.statics.primaryKey = this.primaryKey;
        
        return this._schema;
    }
    static buildModel(name) {
        if (!name) {
            throw new Error(
                'You must specify a model name on Model.buildModel("ModelName") '
            );
        }
        this.buildSchema();
        this._schema.loadClass(this);
        
        this.boot(this._schema);
        const Model = model(name, this._schema);
        this._schema.indexes().forEach(index => {
            Model.createIndexes(index)
        })
        return Model
    }

    static get primaryKey(): any {
        return "id";
    }
}
export default Base;
