export default ({ text, currentFieldName, errors, fieldName, condition }) => {
    if (condition && (fieldName ? fieldName === currentFieldName : true)) {
        errors[currentFieldName] = text
    }
}