import '../styles/header'
import Observer from 'observer'
import initialize from '../../../config/initialize'
import NavElements from '../views/nav.html.js'
import UserLogButton from '../views/openUserLogButton.html.js'

class Navigation {

    constructor() {
        //inner values
        this.item = 0
        this.navItems = [{ text: 'Groups', href: '/groups' }, { text: 'Users', href: '/users' }]
        window.onload = () => {
            this.render()
        }

        this.observer = new Observer()
    }

    render() {
        const navElements = NavElements(this.navItems)
        const userLogButton = UserLogButton()
        document.getElementsByTagName('nav')[0].innerHTML = ''
        document.getElementsByTagName('nav')[0].innerHTML = navElements + userLogButton
        document.getElementById('menuIconDiv').addEventListener('click', () => this.observer.broadcast('openUserLog', 250))
        document.getElementById('initializeAnchor')
        .addEventListener('click', () => initialize({ isForce: true }))
    }
}

export default Navigation