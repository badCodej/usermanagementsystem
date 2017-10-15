
export default ({ fieldName, id, groups, isDisabled, selectedGroupId }) => (
    `<select ${isDisabled ? 'disabled' : ''} name="${fieldName}" class="select" id="${id}">
        ${groups.map(group => {
            return `<option value="${group.groupId}" ${group.groupId === selectedGroupId ? 'selected' : ''}>
                        ${group.name}
                    </option>`
        }).join('')}
    </select>`
)