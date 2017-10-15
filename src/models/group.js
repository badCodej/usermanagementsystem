import { GUID } from 'helpers'
import moment from 'moment'

class GroupDto {
    constructor(args) {
        this.groupId = GUID()
        this.name = args.name
        this.createdDate = moment().format('YYYY-MM-DD')
        this.users = []
    }
}

export default GroupDto