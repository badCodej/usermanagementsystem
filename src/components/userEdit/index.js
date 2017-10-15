import image from './image'
import form from './form'
import './styles/userForm'

export default props => (
    `<div class="row">
        <form id="${props.formId}">
            ${image(props.user)}
            ${form(props)}
        </form>
    </div>`
)