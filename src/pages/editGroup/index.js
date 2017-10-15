import editGroupForm from './views/editGroupForm.html.js'
import addUserForm from './views/addUser.html.js'
import { renderMainBar, setMainBarHeader } from 'DOMManipulations'
import { updateUser as updateUserAsync, getGroupById, getUserById, changeGroupName, getAllGroups, addUser as addUserAsync, getUsersByGroupId, deleteUser as deleteUserAsync } from 'asyncDataStorage'
import { formToObject, fileToBase64, addEventListenerByClass } from 'helpers'
import { userTable, nameForm as updateGroup, userEdit } from 'components'
import Observer from 'observer'
import async from 'async'
import { validate, setUserFormErrors, setGroupFormErrors } from 'validation'

class EditGroup {
    constructor(props) {
        this.props = props
        this.observer = new Observer()
        this.render()
    }

    render() {
        getGroupById(this.props.id)
            .then(group => {
                if (!group) {
                    window.location.href = '#/notfound'
                    return
                }
                getAllGroups()
                    .then(groups => {
                        getUsersByGroupId({ groupId: this.props.id })
                            .then(users => {
                                this.group = group
                                this.groups = groups
                                this.users = users.map(user => {
                                    return Object.assign(user, { groupName: group.name })
                                })
                                this.renderHtml()
                            })
                    })
            })
    }

    renderHtml() {
        this.setMainHtml()
        renderMainBar(this.editGroup)
        this.setUpdateGroupForm()
        this.setDeleteUserIcon()
        this.setAddUserButton()
        this.setTableItemClick()
    }

    setMainHtml() {
        this.editGroup = `<div style="margin-bottom:5px;" class="bar-header">
                                <h3>${this.group.name}</h3>
                            </div>
                            <div id="users" class="main-bar-content">
                                <div class="col-md-10 pl-10 col-xs-9">
                                    ${updateGroup({ formId: 'updateGroupForm', className: 'col-md-12 pl-0', classNameMain: 'col-md-12 pl-5', groupName: this.group.name })}
                                </div>
                                <div class="col-md-2 col-xs-3 pr-0">
                                    <button class="action-button add-button" id="addUser"><i class="ion-plus"></i> New</button>
                                </div>
                                    ${userTable(this.users)}
                            </div>`
    }

    updateGroup(args) {
        changeGroupName(args)
            .then(updated => {
                this.render()
            })
    }

    addUser(args) {
        args.imgSrc = this.imgSrc
        addUserAsync(args)
            .then(() => {
                this.render()
                this.observer.broadcast('closeModal')
            })
    }

    updateUser(args) {
        updateUserAsync(args)
            .then(updated => {
                this.render()
                this.observer.broadcast('closeModal')
            })
    }

    deleteUser(id) {
        deleteUserAsync(id)
            .then(() => {
                this.render()
            })
    }

    setUpdateUserForm() {
        document.getElementById('userEditForm')
            .addEventListener('submit', (e) => {
                e.preventDefault()
                var formData = formToObject(e.target)
                validate({
                    formName: 'userEditForm',
                    initialErrors: setUserFormErrors({ formData }),
                    errorGenerator: setUserFormErrors,
                    submit: () => this.updateUser(formData)
                })
            })
    }
    setAddUserButton() {
        document.getElementById('addUser')
            .addEventListener('click', (e) => {
                getAllGroups()
                    .then(groups => {
                        this.setModal(groups)
                        this.setAddUserForm()
                        this.setUserImage()
                    })
            })
    }

    setAddUserForm() {
        document.getElementById('addUserForm')
            .addEventListener('submit', (e) => {
                e.preventDefault()
                var formData = formToObject(e.target)
                validate({
                    formName: 'addUserForm',
                    initialErrors: setUserFormErrors({ formData }),
                    errorGenerator: setUserFormErrors,
                    submit: () => this.addUser(formData)
                })
            })
    }

    setUserImage() {
        document.getElementById('imgSrcFile')
            .addEventListener('change', e => {
                fileToBase64(e.target.files[0])
                    .then((b64s) => {
                        this.imgSrc = 'data:image/jpeg;charset=utf-8;base64,' + b64s
                        document.getElementById('imgSrcField').value = this.imgSrc
                        document.getElementById('userImageDiv').style.backgroundImage = `url('${this.imgSrc}')`
                    })
            })
    }

    setModal(groups) {
        this.observer.broadcast('showModal',
            {
                body: {
                    innerHtml: userEdit({
                        groupNamesIsDisabled: true,
                        group: this.group,
                        groups,
                        formId: 'addUserForm',
                    })
                },
                header: { innerHtml: 'Add user' }
            })
    }

    setDeleteUserIcon() {
        addEventListenerByClass('deleteUserIcon', 'click', (e) => {
            this.deleteUser(e.target.attributes['data-id'].value)
        })
    }

    setUpdateGroupForm() {
        document.getElementById('updateGroupForm')
            .addEventListener('submit', (e) => {
                e.preventDefault()
                let formData = formToObject(e.target)
                validate({
                    formName: 'updateGroupForm',
                    initialErrors: setGroupFormErrors({ formData }),
                    errorGenerator: setGroupFormErrors,
                    submit: () => this.updateGroup(Object.assign({}, formData, { groupId: this.group.groupId }))
                })

            })
    }

    setTableItemClick() {
        addEventListenerByClass('userTableItem', 'click', (e) => {
            if (!e.target.attributes['data-id']) {
                var self = this
                async.waterfall([
                    function getUser(next) {
                        getUserById({ userId: e.target.parentNode.attributes['item-id'].value })
                            .then(user => {
                                next(null, user)
                            })
                            .catch(err => {
                                next(err)
                            })
                    },
                    function getGroups(user, next) {
                        getAllGroups()
                            .then(groups => {
                                next(null, { user, groups })
                            })
                            .catch(err => {
                                next(err)
                            })
                    },
                    function showModal(result, next) {
                        result.formId = 'userEditForm'
                        self.observer.broadcast('showModal',
                            {
                                body: { innerHtml: userEdit(result) },
                                header: { innerHtml: 'Edit user' }
                            })
                        next()
                    }
                ], (error, result) => {
                    if (error) {
                        return self.observer.broadcast('showModal', { header: { innerHtml: 'Error occured' }, body: { innerHtml: `<h2>Internal error occured</h2>` } })
                    }
                    this.setUserImage()
                    this.setUpdateUserForm()
                })
            }
        })
    }
}

export default EditGroup