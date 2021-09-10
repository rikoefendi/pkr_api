import Base from "./Base"

class Address extends Base{
    static get schema(){
        return {
            email: {
                type: String,
                unique: true,
                index: true
            },
            registerAt: {
                type: Date,
                index: true
            }
        }
    }
}
export default Address.buildModel('Address')