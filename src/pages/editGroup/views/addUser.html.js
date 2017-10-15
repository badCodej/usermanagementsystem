export default props => (
    `<div id="addUser" class="main-bar-content">
        <fieldset class="col-md-10 col-md-offset-1">
            <legend>Add user</legend>
            <div id="add-user-form" class="row add-form">
                <div class="row">
                    <div>
                        <form class="create" id="createUserForm">
                            <input type="text" name="firstName" placeholder="First name" />
                            <input type="text" name="lastName" placeholder="Last name" />
                            <select name="groupId" class="select">
                                <option>Group names:</option>
                                ${props.groups.map(group => {
                                    return `<option ${group.groupId === props.selectedGroupId && 'selected'} value="${group.groupId}">${group.name}</option>`
                                }).join('')}
                            </select>
                            <label for="userImage">
                                <div class="file-label">
                                    <i class='ion-ios-camera'></i>
                                    <label for="userImage">Image</label>
                                </div>
                            </label>
                            <input type="file" id="userImage" name="imgSrc" placeholder="First Name" />
                            <input type="submit" name="next" class="action-button" value="+ Add" />
                        </form>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>`
)