import { GUID } from 'helpers'
import moment from 'moment'

class UserLogDto {
    constructor(args) {
        this.userLogId = GUID()
        this.fullName = args.fullName
        this.groupName = args.groupName
        this.imgSrc = args.imgSrc
        this.isDeleted = args.isDeleted
        this.createdDate = moment().format('YYYY-MM-DD')
    }
}

export default UserLogDto