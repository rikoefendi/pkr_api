import { Schema } from "@ioc:Mongoose"
import Base from "./Base"

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
            questions: [{
                question: String,
                isChallenge: Boolean,
                isScore: Number,
                options: [{
                    option: String,
                }]
            }],
            type: String
        }
    }
}
export default Form.buildModel('Form')