const navHtml = props => {
    return (
        `<div class="navbar-items">
            ${props.map((item) => {
                return `<div class="nav-item">
                            <a href="#${item.href}">${item.text}</a>
                        </div>`
            }).join(' ')}
            <div class="nav-item">
                <a href="#/groups" id="initializeAnchor">Initialize</a>
            </div>
        </div>`
    )
}

export default navHtml