import { groupNameSelection } from 'components'

export default ({ groups, user, group, groupNamesIsDisabled }) => (
    `<div class="col-md-8">
            <div class="info-section">
                <dl class="dl-horizontal">
                    <dt>First name</dt>
                    <dd>
                        <input type="hidden" name="userId" value="${(user && user.userId)}" />
                        <input class="input_round mt-5 form_color" type="text" name="firstName" value="${(user && user.firstName) ? user.firstName : ''}" placeholder="First name">
                        <span class="form-info-text" name="firstName"></span>
                    </dd>
                </dl>
                <hr />
                <dl class="dl-horizontal">
                    <dt>Last name</dt>
                    <dd>
                        <input class="input_round mt-5 form_color" type="text" name="lastName" value="${(user && user.lastName) ? user.lastName : ''}" placeholder="Last name">
                        <span class="form-info-text" name="lastName"></span>
                    </dd>
                </dl>
                <hr />
                ${(user && user.createdDate)
        ? `<dl class="dl-horizontal">
                            <dt>Created date</dt>
                            <dd>
                                <input class="input_round mt-5 form_color" type="text" name="createdDate" disabled value="${user.createdDate}" placeholder="Created date">
                                <span class="form-info-text" name="createdDate"></span>
                            </dd>
                        </dl>
                    <hr />` : ''}
                <dl class="dl-horizontal">
                    <dt>Gender</dt>
                    <dd>
                        <select name="gender" placeholder="Group names" class="select">
                            <option value="" disabled selected hidden>Gender</option>
                            <option ${user && user.gender === 'Male' ? 'selected' : ''}>Male</option>
                            <option ${user && user.gender === 'Female' ? 'selected' : ''}>Female</option>
                        </select>
                        <span class="form-info-text" name="gender"></span>
                    </dd>
                </dl>
                <hr />
                <dl class="dl-horizontal">
                    <dt>Group name</dt>
                    <dd>
                        ${groupNameSelection({ id: 'userGroups', fieldName: 'groupId', selectedGroupId: (user && user.group) ? user.group.groupId : '', groups, isDisabled: groupNamesIsDisabled })}
                        <span class="form-info-text" name="groupId"></span>
                    </dd>
                </dl>
                <dl class="dl-horizontal">
                    <dt style="flex:3"></dt>
                    <dd style="flex:1">
                        <input type="submit"  class="action-button" value="Save" />
                    </dd>
                </dl>
            </div>
    </div>`
)