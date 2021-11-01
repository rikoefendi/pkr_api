import { Schema } from "@ioc:Mongoose"
import Base from "./Base"

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
                ref: 'Form'
            },
            response: [{
                    questionId: String,
                    answer: String,
                    score: Number,
                    optionId: String
            }],
        }
    }
}
export default Response.buildModel('Response')