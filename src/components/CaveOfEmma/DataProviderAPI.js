//import UserUploadFileHandler from "./UserUploadFileHandler.js";
export default class DataProviderAPI {
    constructor(dp) {
        this.dp = dp;
    }
    testAll(fileListObject) {
        //returns all file names associated with image number passed to argument 
        //use filelistobject findfile to convert to files then tp
        //promise image
        var file_names = this.dp.returnAllImgFileNames(5);
        console.log(file_names)
        // var fh = new UserUploadFileHandler(fileListObject)
        // var files = file_names.map(name => {
        //     return fh.findFile(name)
        // })
        // console.log(files)
        // var promiseImages = files.map(file => {
        //     var image = await fh.fileReaderPromiseImage(file)
        //     return image;
        // })

        //get n random objects
        var randobjs = this.dp.getNRandomObjs(8)
        console.log(randobjs)

        //get row of data, first argument specifies 'image_data' or 'object_data'
        // second argument is object of form {'ImageNumber':  ,'ObjectNumber': , 'index' : }, accepts combos index, img, or obj img.
        console.log(this.dp.getRow('image_data', {'index' : 8}))
        console.log(this.dp.getRow('image_data', {'ImageNumber' : 7}))
        console.log(this.dp.getRow('object_data', {'ImageNumber' : 7, 'ObjectNumber': 8}))


        //get cords for display returns the cordinates of the top right corner of the cell.
        //put into canvas object like this  ctx_at_index.drawImage(temp_canvas, cords.x, cords.y, 40, 40, 0, 0, canvas_at_index.width, canvas_at_index.height)
        console.log(this.dp.getCordsforCellDisplay({'ImageNumber' : 7, 'ObjectNumber': 8}))

        //get value associated with img obj or image. Works simular to getRow
        console.log(this.dp.getValue('image_data', {'ImageNumber' : 7, 'value' : 'Image_FileNames_Filename_OrigActin' }))
        console.log(this.dp.getValue('object_data', {'ImageNumber' : 7, 'ObjectNumber' : 8, 'value': 'Nuclei_Location_CenterX'}))

        console.log(this.dp.getColumnLines('object_data'))
        console.log(this.dp.getColumnLines('image_data'))

    }
}