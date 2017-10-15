import check from './check'
const userValidate = ({ formData, fieldName }) => {
    var errors = {}
    
    check({
        text: "Group name required",
        currentFieldName: "groupName",
        errors,
        fieldName,
        condition: !formData.groupName
    })
    return errors
}
export default userValidate