export default props => (
    `${(props && props.innerHtml)
        ? `<div class="modal-header">
                <h2>${props && props.innerHtml}</h2>
                <i id="closeModalIcon" class="ion-close-round"></i>
            </div>`
        : ''}`
)