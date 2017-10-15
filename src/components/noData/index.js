import './noData.scss'

export default props => (
    `<div class="row">
        <div class="col-md-12 text-align-center no-data-text">
        <h2>${props.text}</h2>
        </div>
    </div>`
)