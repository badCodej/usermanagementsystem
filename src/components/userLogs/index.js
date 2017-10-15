import Observer from 'observer'
import { openUserLog, closeUserLog } from 'DOMManipulations'
import { addUserLog } from 'asyncDataStorage'

class UserLogs {
    constructor(props) {
        this.props = JSON.parse(localStorage.getItem('store'))
        var observer = new Observer()
        observer.subscribe('openUserLog', (e) => {
            openUserLog()
            document.addEventListener('click', closeUserLog)
            document.getElementById("sidebar")
                .addEventListener('click', (e) => {
                    e.stopPropagation()
                })
            document.getElementById("menuIconDiv")
                .addEventListener('click', (e) => {
                    e.stopPropagation()
                })
            document.getElementById('closeIcon').addEventListener('click', closeUserLog)
        })
        observer.subscribe('userDeleted', (user) => {
            addUserLog({
                fullName: user.fullName,
                groupName: user.groupName,
                imgSrc: user.imgSrc,
                isDeleted: true 
            }).then(() => {
                this.props = JSON.parse(localStorage.getItem('store'))
                this.render()
            })
        })
        observer.subscribe('userCreated', (user) => {
            addUserLog({
                fullName: user.fullName,
                groupName: user.groupName,
                imgSrc: user.imgSrc,
                isDeleted: false 
            }).then(() => {
                this.props = JSON.parse(localStorage.getItem('store'))
                this.render()
            })
        })
        this.render()
    }

    render() {
        let userLog = this.props
            ? `<div class="row user-logs">
                <ul>
                    ${this.props.userLogs.map(item => {
                        return `<li>
                                    <div class='log-item'>
                                        <div class="users-log-img">
                                            <img src="${item.imgSrc}" alt="user" class="img-circle">
                                        </div>
                                        <div class="log-content">
                                            <h5>${item.fullName}</h5>
                                            <span>${item.groupName}</span>
                                        </div>
                                    </div>
                                    <div class="log-sign ${item.isDeleted ? 'deleted' : 'added'}">${item.isDeleted ? 'deleted' : 'added'}</div>
                                </li>`
                        }).join('')}
                </ul>
            </div>`
            : ''
        document.getElementById('sideBarContent').innerHTML = ''
        document.getElementById('sideBarContent').insertAdjacentHTML('beforeend', userLog);
    }
}

export default UserLogs