import { formToObject } from 'helpers'
const validate = ({ formName, initialErrors, errorGenerator, submit }) => {
    let errorCount = Object.keys(initialErrors).length
    var form = document.getElementById(formName)
    let formObject = formToObject(form)

    form.querySelectorAll('span[name]')
        .forEach(item => {
            item.style.display = 'none'
        })
    Object.keys(initialErrors).map(errorKey => {
        form.querySelectorAll(`span[name='${errorKey}']`)
            .forEach(item => {
                item.style.display = 'block'
                item.style.color = 'red'
                item.innerHTML = initialErrors[errorKey]
            })
    })
    form.querySelectorAll('input')
        .forEach(item => {
            item.addEventListener('change', (e) => {
                validateField({ formName, errorGenerator, fieldName: e.target.attributes['name'].value })
            })
        })
    form.querySelectorAll('select')
        .forEach(item => {
            item.addEventListener('change', (e) => {
                validateField({ formName, errorGenerator, fieldName: e.target.attributes['name'].value })
            })
        })
    form.querySelectorAll('textarea')
        .forEach(item => {
            item.addEventListener('change', (e) => {
                validateField({ formName, errorGenerator, fieldName: e.target.attributes['name'].value })
            })
        })

    if (errorCount === 0) {
        submit()
    }
}

const validateField = ({ fieldName, formName, errorGenerator }) => {
    var form = document.getElementById(formName)
    var formData = formToObject(form)
    let errors = errorGenerator({ fieldName, formData })
    if (errors[fieldName]) {
        form.querySelector(`span[name='${fieldName}']`)
            ? form.querySelector(`span[name='${fieldName}']`).style.display = 'block'
            : ''
    } else {
        form.querySelector(`span[name='${fieldName}']`)
            ? form.querySelector(`span[name='${fieldName}']`).style.display = 'none'
            : ''
    }
    return errors
}


export default validate