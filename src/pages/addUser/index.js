import groupSelectField from './views/groupSelectField.html.js'
import addUserForm from './views/addUserForm.html.js'
import { getAllGroups, addUser as addUserAsync } from 'asyncDataStorage'
import { renderMainBar, setMainBarHeader } from 'DOMManipulations'
import { formToObject, fileToBase64 } from 'helpers'

class AddUser {
    constructor(props) {
        this.props = props
        this.render()
        this.imgSrc = {}
    }

    render() {
        getAllGroups()
            .then(groups => {
                this.renderHtml(groups)
            })
    }

    renderHtml(groups) {
        var addUserString = addUserForm(groups)
        renderMainBar(addUserString)
        setMainBarHeader('Add user')


        document
        .getElementById('createUserForm')
        .addEventListener('submit', (e) => {
            e.preventDefault()
            var form = formToObject(e.target)
            this.addUser(form)
        })
    }

    addUser (args) {
        args.imgSrc = this.imgSrc
        addUserAsync(args)
        .then(() => {
            this.render()
        })
    }
}

export default AddUser