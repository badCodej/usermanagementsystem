export default props => (
    `<div id="addUser" class="main-bar-content">
        <div id="add-user-form" class="row add-form">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <form class="create" id="createUserForm">
                        <input type="text" name="firstName" placeholder="First name" />
                        <input type="text" name="lastName" placeholder="Last name" />
                        ${groupSelectField(groups)}
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
    </div>`
)