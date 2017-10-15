import { nameForm as addGroup, groupItem } from 'components'
import moment from 'moment'

import { formToObject, addEventListenerByClass } from 'helpers'
import { renderMainBar, setMainBarHeader } from 'DOMManipulations'
import { getAllGroups, deleteGroupById, addGroup as addGroupAsync, getAllUsers } from 'asyncDataStorage'
import { validate, setGroupFormErrors } from 'validation'

class Groups {
    constructor() {
        this.render()
    }

    render() {
        getAllUsers()
        .then((users) => {
        })
        getAllGroups()
        .then(groups => {
            this.groups = groups
            this.renderHtml()
        })
    }

    renderHtml() { 
        this.setMainHtml()
        renderMainBar(this.groupsHtml)
        setMainBarHeader('Groups')
        document
            .getElementById('addGroupForm')
            .addEventListener('submit', (e) => {
                e.preventDefault()
                var formData = formToObject(e.target)
                validate({
                    formName: 'addGroupForm',
                    initialErrors: setGroupFormErrors({formData}),
                    errorGenerator: setGroupFormErrors,
                    submit: () =>  this.addGroup(formData)
                })
            })
        addEventListenerByClass('deleteIcon', 'click', (e) => {
            this.deleteGroup(e.target.attributes['data-id'].value)
        })
    }

    setMainHtml () {
        this.groupsHtml = `<div id='groups' class='main-bar-content'>
                            ${addGroup({ formId: 'addGroupForm', classNameMain: '', className: 'col-md-12' })}
                            <div class='row p-10'>
                                ${this.groups.map(item => {
                                    return groupItem(item)
                                }).join('')}
                            </div>
                        </div>`
    }
    addGroup(args) {
        addGroupAsync(args)
        .then(() => {
            this.render()
        })
    }

    deleteGroup(id) {
        deleteGroupById(id).then(() => {
            this.render()
        })
    }
}

export default Groups