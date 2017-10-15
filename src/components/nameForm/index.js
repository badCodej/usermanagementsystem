import './nameForm.scss'
export default ({classNameMain, className, formId, groupName }) => (
    `<div class="main-bar-content ${classNameMain}">
        <div class="row">
            <div class="${className}">
                <form id="${formId}">
                    <input class="input_round mt-5 form_color" type="text" name="groupName" value="${groupName ? groupName : ''}" placeholder="Group name">
                    <span class="form-info-text" name="groupName"></span>
                    <button class="btn right_round search_form  btn-primary add_btn"></i>Submit
                    </button>
                </form>
            </div>
        </div>
    </div>`
)