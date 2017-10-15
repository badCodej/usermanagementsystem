export default (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = () => {
            resolve(btoa(reader.result))
        }

        reader.onerror = (error) => {
            reject(error)
        }
    })
}