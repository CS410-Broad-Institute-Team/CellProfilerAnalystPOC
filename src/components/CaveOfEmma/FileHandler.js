export default class FileHandler {
    fileListObject = null;
    constructor(fileListObject) {
        this.fileListObject = fileListObject
    }
    findFile = (fileName) => {
        const fileIndex = Array.from(this.fileListObject.target.files).findIndex((elem) => {
            return elem.name === fileName;
        });
        return this.fileListObject.target.files[fileIndex];
    }
    fileReaderPromiseText =  function(file_result) {
        return new Promise((resolve, reject)=> {
            var fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result)
            };
            fr.readAsText(file_result)
        })
    }
    fileReaderPromiseImage(file_result) {
        return new Promise((resolve, reject)=> {
            var fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result)
            };
            fr.readAsDataURL(file_result)
        })
    }

}