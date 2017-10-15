import { Navigation } from '../header'
import { UserLogs } from 'components'
import mainBarHeader from './views/mainBarHeader.html.js'
class Layout {
    constructor() {
        this.render()
    }

    render() {
        let layout = `<div id="root" class="container">
                        <nav></nav>
                        <div class="content">
                            <div id="page" class="main-bar">
                                <section id="mainBarSection" class="col-md-12"></section>
                            </div>
                            <aside id="sidebar">
                                <div style="margin-left:10px" class="bar-header">
                                    <h3>User logs</h3>
                                    <i id="closeIcon" class="closebtn ion-close-round"></i>
                                </div>
                                <div id='sideBarContent'></div>
                            </aside>
                        </div>
                      </div>`
        document.getElementsByTagName('body')[0].innerHTML = ''
        document.getElementsByTagName('body')[0].innerHTML = layout 
        new Navigation() 
        new UserLogs()       
    }
}

export default Layout