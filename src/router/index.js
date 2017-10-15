import Navigo from 'navigo'
import Groups from '../pages/groups'
import Users from '../pages/users'
import AddUser from '../pages/addUser'
import EditGroup from '../pages/editGroup'
import NotFound from '../pages/notFound'

class Router {
    constructor() {
        this.root = null;
        this.useHash = true; // Defaults to: false
        this.hash = '#'; // Defaults to: '#'
        this.router = new Navigo(this.root, this.useHash, this.hash);

        this.router
            .on({
                '/groups': () => {
                    new Groups()
                },
                '/groups/edit/:id': (e) => {
                    new EditGroup(e)
                },
                '/users': () => {
                    new Users()
                }
            })
            .resolve()
        this.router.notFound(() => {
            new NotFound()
        })
    }
}
export default Router