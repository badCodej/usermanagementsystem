import check from './check'
const userValidate = ({ formData, fieldName }) => {
    var errors = {}
    
    check({
        text: "Lastname required",
        currentFieldName: "lastName",
        errors,
        fieldName,
        condition: !formData.lastName
    })
    check({
        text: "Image required",
        currentFieldName: "imgSrcFile",
        errors,
        fieldName,
        condition: (!formData.imgSrc || formData.imgSrc.includes('http://localhost:3010/img/buddy.png')) 
        && !formData.imgSrcFile
    })
    check({
        text: "Group name required",
        currentFieldName: "groupId",
        errors,
        fieldName,
        condition: !formData.groupId
    })
    check({
        text: "Gender required",
        currentFieldName: "gender",
        errors,
        fieldName,
        condition: !formData.gender
    })

    check({
        text: "Firstname required",
        currentFieldName: "firstName",
        errors,
        fieldName,
        condition: !formData.firstName
    })

    if(fieldName === 'imgSrcFile' && ((!formData['imgSrc'] || formData['imgSrc'].includes('http://localhost:3010/img/buddy.png')) 
    && !formData.imgSrcFile)) {
        errors.imgSrcFile = "Image required"
    }

    return errors
}
export default userValidate