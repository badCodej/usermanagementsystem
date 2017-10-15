export default item => (
    `<tr class="userTableItem" item-id="${item.userId}">
        <td>
            <div class="users-table-image-container">
                <img src="${item.imgSrc}" alt="user" class="img-circle">
            </div>
        </td>
        <td>
            ${item.fullName}
        </td>
        <td>
            ${item.groupName}
        </td>
        <td>
            ${item.createdDate}                   
        </td>
        <td>
            <a><i data-id="${item.userId}" class="deleteUserIcon ion-close-round"></i></a>
        </td>
    </tr>`
)