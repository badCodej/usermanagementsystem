import { GUID } from 'helpers'

const Initialize = props => {
    var obj = {
        'userLogs': [],

        'groups': [{
            'groupId': GUID(),
            'name': 'Admins group',
            'createdDate': '2017-10-04',
            'users': [{
                'userId': GUID(),
                'fullName': 'Javid Shirinbayli',
                'createdDate': '2017-10-05',
                'firstName': 'Javid',
                'lastName': 'Shirinbayli',
                'gender': 'Male',
                'imgSrc': 'https://wrappixel.com/demos/admin-templates/admin-pro/assets/images/users/2.jpg'
            },{
                'userId': GUID(),
                'fullName': 'Jon Snow',
                'createdDate': '2017-10-05',
                'firstName': 'Jon',
                'lastName': 'Snow',
                'gender': 'Male',
                'imgSrc': 'https://wrappixel.com/demos/admin-templates/admin-pro/assets/images/users/3.jpg'
            }]
        }, {
            'groupId': GUID(),
            'name': 'Vendor group',
            'createdDate': '2017-10-04',
            'users': [{
                'userId': GUID(),
                'fullName': 'Samantha Grooves',
                'firstName': 'Samantha',
                'lastName': 'Grooves',
                'createdDate': '2017-10-05',
                'gender': 'Female',
                'imgSrc': 'https://wrappixel.com/demos/admin-templates/admin-pro/assets/images/users/4.jpg'
            }]
        }, {
            'groupId': GUID(),
            'name': 'At group',
            'createdDate': '2017-10-04',
            'users': [{
                'userId': GUID(),
                'fullName': 'Salam Aleykum',
                'firstName': 'Salam',
                'lastName': 'Aleykum',
                'createdDate': '2017-10-05',
                'gender': 'Male',
                'imgSrc': 'https://wrappixel.com/demos/admin-templates/admin-pro/assets/images/users/5.jpg'
            }]
        }]
    }

    if (!localStorage.getItem('store') || (props && props.isForce)) {
        localStorage.setItem('store', JSON.stringify(obj))
        document.getElementById('sideBarContent').innerHTML= ''
    }
}


export default Initialize