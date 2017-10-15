import { GUID } from 'helpers'
import moment from 'moment'

class UserDto {
    constructor(args) {
        this.userId = GUID()
        this.firstName = args.firstName
        this.lastName = args.lastName
        this.fullName = `${args.firstName} ${args.lastName}`
        this.imgSrc = args.imgSrc
        this.gender = args.gender
        this.createdDate = moment().format('YYYY-MM-DD')
    }
}

export default UserDto