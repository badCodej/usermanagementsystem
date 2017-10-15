import { renderMainBar } from 'DOMManipulations'

class NotFound {
    constructor() {
        this.render()
    }

    render() {
        renderMainBar(`
            <div class='main-bar-content'>
                <h1>Not found</h1>
            </div>
        `)
    }
}

export default NotFound