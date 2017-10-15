import { urlConfig } from '../../config'

export default user => (
    `<div class="col-md-4">
        <div id="userImageDiv" style="background-image: url('${(user && user.imgSrc) ? user.imgSrc : urlConfig.getCurrentUrl('img/buddy.png')}');" class="user-profile-image"></div>
        <span class="form-info-text" name="imgSrcFile"></span>
        <label for="imgSrcFile">
            <div class="file-label">
                <i class='ion-ios-camera'></i>
                <label for="imgSrcFile">Change</label>
            </div>
            <input id="imgSrcField" type="hidden" onchange="alert("asdasd")" name="imgSrc" value="${(user && user.imgSrc) ? user.imgSrc : urlConfig.getCurrentUrl('img/buddy.png')}" /> 
            <input type="file" id="imgSrcFile" value="${user && user.imgSrc}" data-id="${user && user.userId}" name="imgSrcFile" />
        </label>
    </div>`
)