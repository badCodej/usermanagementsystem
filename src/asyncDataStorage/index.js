import { GroupDto, UserDto, UserLogDto } from 'models'
import Observer from 'observer'

//async methods
export const getAllGroups = () => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        resolve(store.groups)
    })
}

export const getGroupById = (id) => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        const findedGroup = store.groups.find(group => {
            return group.groupId === id
        })
        resolve(findedGroup)
    })
}

export const deleteGroupById = (id) => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        var newGroups = store.groups.filter(item => {
            return id !== item.groupId
        })
        store.groups = newGroups
        localStorage.setItem('store', JSON.stringify(store))
        resolve()
    })
}

export const addGroup = (props) => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        store.groups.push(new GroupDto({
            name: props['groupName']
        }))
        localStorage.setItem('store', JSON.stringify(store))
        resolve()
    })
}

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const store = JSON.parse(localStorage.getItem('store'))
        var users = []
        for (var i = 0; i < store.groups.length; i++) {
            for (var j = 0; j < store.groups[i].users.length; j++) {
                users.push(Object.assign(store.groups[i].users[j], { groupName: store.groups[i].name }))
            }
        }
        resolve(users)
    })
}

export const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        let observer = new Observer()
        const store = JSON.parse(localStorage.getItem('store'))
        let findedGroup = store.groups.find(group => {
            return group.users.some(user => {
                return user.userId === id
            })
        })
        let deletedUser = findedGroup.users.find(user => {
            return user.userId === id
        })
        let newUsers = findedGroup.users.filter(item => {
            return item.userId !== id
        })
        findedGroup.users = newUsers
        store.groups.map(group => {
            if (group.groupId === findedGroup.groupId) {
                group = findedGroup
            }
        })
        localStorage.setItem('store', JSON.stringify(store))
        deletedUser.groupName = findedGroup.name
        observer.broadcast('userDeleted', deletedUser)
        resolve()
    })
}

export const addUser = (args) => {
    return new Promise((resolve, reject) => {
        let observer = new Observer()
        const store = JSON.parse(localStorage.getItem('store'))
        store.groups.map(group => {
            if (group.groupId === args.groupId) {
                let userArgs = Object.assign(args, { groupName: group.name })
                let newUser = new UserDto(userArgs)
                group.users.push(newUser)
                localStorage.setItem('store', JSON.stringify(store))
                newUser.groupName = group.name
                observer.broadcast('userCreated', newUser)
            }
        })
        resolve()
    })
}

export const changeGroupName = (args) => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        store.groups.map(group => {
            if (args.groupId === group.groupId) {
                group.name = args.groupName
            }
        })
        localStorage.setItem('store', JSON.stringify(store))
        resolve()
    })
}

export const getUsersByGroupId = (args) => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        const findedGroup = store.groups.find(group => {
            return group.groupId === args.groupId
        })
        resolve(findedGroup ? findedGroup.users : [])
    })
}

export const getUserById = args => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        let users = []
        store.groups.map(group => {
            group.users.map(user => {
                if (user.userId === args.userId) {
                    user.group = group
                    return resolve(user)
                }
            })
        })
        resolve()
    })
}

export const updateUserImage = args => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        let groupId = 0
        let user = store.groups.map(group => {
            group.users.map(user => {
                if (args.userId === user.userId) {
                    user.imgSrc = args.imgSrc
                    groupId = group.groupId
                }
            })
        })
        store.groups.map(group => {
            if (group.groupId === groupId) {
                group.user = user
            }
        })
        localStorage.setItem('store', JSON.stringify(store))
    })
}

export const updateUser = args => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        var user = {}
        store.groups.map(group => {
            group.users.map(oldUser => {
                if (oldUser.userId === args.userId) {
                    if(group.groupId != args.groupId){
                        user = oldUser
                        group.users = group.users.filter(user => {
                            return user.userId !== args.userId
                        })
                    } else {
                        oldUser.firstName = args.firstName
                        oldUser.lastName = args.lastName
                        oldUser.gender = args.gender
                        oldUser.imgSrc = args.imgSrc
                        oldUser.fullName = args.firstName+' '+args.lastName
                    }
                }
            })
        })

        store.groups.map(group => {
            if (group.groupId === args.groupId && user.userId) {
                user.firstName = args.firstName
                user.lastName = args.lastName
                user.gender = args.gender
                user.imgSrc = args.imgSrc
                user.fullName = args.firstName+' '+args.lastName
                group.users.push(user)
            }
        })
        
        localStorage.setItem('store', JSON.stringify(store))
        resolve()
    })
}

export const addUserLog = (args) => {
    return new Promise((resolve, reject) => {
        let store = JSON.parse(localStorage.getItem('store'))
        store.userLogs.push(new UserLogDto(args))
        localStorage.setItem('store', JSON.stringify(store))
        resolve()
    })
}