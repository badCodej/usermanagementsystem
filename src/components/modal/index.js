import modal from './modal'
import Observer from 'observer'
import './modal.scss'

class Modal {
    constructor() {
        this.observer = new Observer()
        this.observer.subscribe('showModal', (props) => {
            this.props = props
            this.render()
        })
    }

    render() {
        let modalHtml = modal(this.props)
        document.getElementById('root')
                .insertAdjacentHTML('beforeend', modalHtml)

        this.observer.subscribe('closeModal', () => {
            document.getElementById('pageModal') 
            && document.getElementById('pageModal').remove()
        })

        document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
            if(e.target === document.getElementById('pageModal')) {
                this.observer.broadcast('closeModal')
            }
        }, true)
        
        document.getElementById('closeModalIcon') 
        && document.getElementById('closeModalIcon')
                   .addEventListener('click', () => {
                    this.observer.broadcast('closeModal')
                   })
    }
}

export default Modal