    export const openUserLog = () => {
        document.getElementById('sidebar').style.width = 250
    }
    export const closeUserLog = () => {
        document.getElementById('sidebar').style.width = 0
    }
    export const renderMainBar = (innerHtml) => {
        if (document.getElementsByClassName('main-bar') &&
            document.getElementsByClassName('main-bar').length > 0 &&
            document.getElementsByClassName('main-bar')[0].getElementsByTagName('section') &&
            document.getElementsByClassName('main-bar')[0].getElementsByTagName('section').length > 0)
        {
            document.getElementsByClassName('main-bar')[0].getElementsByTagName('section')[0].innerHTML = ''
            document.getElementsByClassName('main-bar')[0].getElementsByTagName('section')[0].innerHTML = innerHtml
        }
    }
    export const setMainBarHeader = (text) => {
        if(document.getElementById('headerTitle')) {
            document.getElementById('headerTitle').innerHTML = text
        }
    }