export default groups => (
    `<select name="groupId" class="select">
        <option>Group names:</option>
        ${groups.map(group => {
            return `<option value="${group.groupId}">${group.name}</option>`
        }).join('')}
    </select>`
)