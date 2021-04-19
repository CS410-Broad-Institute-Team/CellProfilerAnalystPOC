import {ImageProvider} from './ImageProvider.js';
export default class ImageProviderAPI { 
    constructor(dp, fh) {
        this.dp = dp; //Dataprovider
        this.fh = fh;  //UserUploadFileHandler, constructed with begining file list object
    }
    runTest() {
        var ip = new ImageProvider();
        var file_names = this.dp.returnAllImgFileNames(5)
        var files = file_names.map(name => { //Alternatively, we could have this.dp.returnAllImgPromisesPerImg({'ImageNumber': 2}, fh)
         return this.fh.findFile(name)       // and abstract from 8-17 or more
         })
         Promise.all(files).then(files => {
             return files.map(file => {
                var image =  this.fh.fileReaderPromiseImage(file)
                return image;    
             })
         })
         .then(images => {
             var cords = this.dp.getCordsforCellDisplay({'ImageNumber' : 5, 'ObjectNumber': 7})
             return ip.getDataURLPromise(images, cords);   //The only method of imageprovider. If cords is left blank, it will produce a whole image. Should be
         })                                                //static class or function
         .then(image => {
             console.log(image);
         })
    }

    

}