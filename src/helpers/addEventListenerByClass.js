export default (className, event, fn, useCapture = false) => {
    var list = document.getElementsByClassName(className);
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, useCapture);
    }
}