import './groupItem.scss'
export default (item) => {
    return `<a href="#/groups/edit/${item.groupId}">
                <div style="padding-top: 0 !important;" class="group-element col-md-6 p-5 mt-5">
                    <div class="group-item">
                        ${item.users.length === 0 ? '<i data-id="'+item.groupId+'" class="deleteIcon ion-close-round"></i>' : ''}
                        <h2 class="circle-count">${item.users.length}</h2>
                        <p>${item.createdDate}</p>
                        <h3>${item.name}</h3>
                    </div>
                </div>
            </a>`
}