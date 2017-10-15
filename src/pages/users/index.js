import { getAllGroups, getAllUsers, deleteUser, getUserById, updateUserImage, updateUser, addUser } from 'asyncDataStorage'
import { renderMainBar, setMainBarHeader } from 'DOMManipulations'
import { addEventListenerByClass, fileToBase64, formToObject } from 'helpers'
import { userTable, userEdit } from 'components'
import Observer from 'observer'
import async from 'async'
import { validate, setUserFormErrors } from 'validation'

class Users {
    constructor() {
        this.render()
        this.observer = new Observer()
    }

    render() {
        getAllUsers()
            .then(users => {
                this.users = users
                this.renderHtml()
            })
    }

    renderHtml() {
        let users = `<div id='groups' class='main-bar-content'>
                        <div class="row">
                            <div class="col-md-4 col-md-offset-8 pl-0">
                                <button class="action-button add-button" id="addUser"><i class="ion-plus"></i> New</button>
                            </div>
                        </div>
                        ${userTable(this.users)}
                    </div>`

        renderMainBar(users)

        addEventListenerByClass('deleteUserIcon', 'click', (e) => {
            if (e.target.attributes['data-id'].value) {
                this.deleteUser(e.target.attributes['data-id'].value)
            }
        })

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
                    document.getElementById('imgSrcFile')
                        .addEventListener('change', (e) => {
                            fileToBase64(e.target.files[0])
                                .then((b64s) => {
                                    self.imgSrc = `data:image/jpeg;charset=utf-8;base64, ${b64s}`
                                    document.getElementById('imgSrcField').value = self.imgSrc
                                    document.getElementById('userImageDiv').style.backgroundImage = `url('${this.imgSrc}')`
                                })
                        })
                    document.getElementById('userEditForm')
                        .addEventListener('submit', (e) => {
                            e.preventDefault()
                            var form = formToObject(e.target)
                            self.updateUser(form)
                        })
                })
            }
        })

        document.getElementById('addUser')
            .addEventListener('click', () => {
                getAllGroups()
                    .then(groups => {
                        this.observer.broadcast('showModal',
                            {
                                body: { innerHtml: userEdit({ groups, formId: 'userCreateForm' }) },
                                header: { innerHtml: 'Add user' }
                            })
                        document.getElementById('imgSrcFile')
                            .addEventListener('change', (e) => {
                                fileToBase64(e.target.files[0])
                                    .then((b64s) => {
                                        let imgSrc = `data:image/jpeg;charset=utf-8;base64, ${b64s}`
                                        document.getElementById('imgSrcField').value = imgSrc
                                        document.getElementById('userImageDiv').style.backgroundImage = `url('${imgSrc}')`
                                    })
                            })
                        document.getElementById('userCreateForm')
                            .addEventListener('submit', (e) => {
                                e.preventDefault()
                                var formData = formToObject(e.target)
                                validate({
                                    formName: 'userCreateForm',
                                    initialErrors: setUserFormErrors({ formData }),
                                    errorGenerator: setUserFormErrors,
                                    submit: () => this.createUser(formData)
                                })
                            })
                    })
            })
    }

    deleteUser(id) {
        deleteUser(id)
            .then(() => {
                this.render()
            })
    }

    changeUserImage(e) {
        if (e.target.attributes['data-id'] && e.target.attributes['data-id'].value) {
            updateUserImage({
                userId: e.target.attributes['data-id'].value,
                imgSrc: this.imgSrc
            })
        }
        this.render()
    }

    updateUser(user) {
        updateUser(user)
            .then(updated => {
                this.render()
                this.observer.broadcast('closeModal')
            })
    }

    createUser(user) {
        addUser(user)
            .then(added => {
                this.render()
                this.observer.broadcast('closeModal')
            })
    }

}

export default Users