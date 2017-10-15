import item from './userItem.html.js'
import { noData } from 'components'

export default users => (
    `${users.length > 0 ? `<table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Full name</th>
                                        <th>Group name</th>
                                        <th>Created</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${users.map(user => {
                                        return item(user)
                                        }).join('')}
                                </tbody>
                            </table>` 
                        : noData({ text: 'There is no any user' })}`
)