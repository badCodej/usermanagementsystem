export default props => (
    `${(props && props.innerHtml) 
        ? `<div class="modal-footer">
                <div class="row">${props.innerHtml}</div>
            </div>` : ''}`
)