export default props => (
    `<div id="add-group-form" class="row groups-section add-form">
        <div class="row">
            <fieldset class="col-md-10 col-md-offset-1">
                <legend>Update group name</legend>
                <form class="groupForm createForm create" id="updateGroupForm">
                    <input type="text" value="${props.groupName}" name="groupName" placeholder="Group Name" />
                    <input type="submit" class="action-button" value="Update" />
                </form>
            </fieldset>
        </div>
    </div>`
)