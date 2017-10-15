export default props => (
    `${(props && props.innerHtml) ? `<div class="modal-body">${props.innerHtml}</div>` : ''}`
)