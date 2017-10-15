import modalHeader from './modalHeader'
import modalBody from './modalBody'
import modalFooter from './modalFooter'

export default props => {
    return (
        `<div id="pageModal" class="modal">
            <div class="modal-content">
                ${(props && props.header) ? modalHeader(props.header) : ''}
                ${(props && props.body) ? modalBody(props.body) : ''}
                ${(props && props.footer) ? modalFooter(props.footer): ''}
            </div>
        </div>`
    )
}