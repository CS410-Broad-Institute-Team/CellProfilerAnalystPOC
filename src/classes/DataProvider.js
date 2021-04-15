
import ImageTable from "./ImageTable.js";
import ObjectTable from "./ObjectTable.js";
export default class DataProvider {
    constructor(unformed_data) {
        this.obj_data = new ObjectTable(unformed_data.object_data, unformed_data.object_columns)
        this.img_data = new ImageTable(unformed_data.image_data, unformed_data.image_columns)
        this.data = {
            // 'setup_lines' : unformed_data.setup_lines,
            'object_data' : this.obj_data,
            'image_data' :  this.img_data
        }

        //  this.setup_lines = unformed_data.setup_lines;
    }
    
    returnAllImgFileNames(img) {
        var channels = "Image_FileNames_Filename_OrigActin Image_FileNames_Filename_OrigpH3 Image_FileNames_Filename_OrigDNA".split(" ");
        return channels.map(path => {          
            return this.getValue('image_data', {'img': img, 'value': path }).substring(1, path.length-1)
        });
    }
    //TODO what if cell is on edge of image
    getNRandomObjs(n) {
        var num_of_objs = this.data.object_data.data_table.length
        var rand_objs = []
        var i;
        for (i = 0; i < n; i++) {
            var index = Math.floor(Math.random() * num_of_objs);
            var obj = this.getRow('object_data', {'index' : index});
            rand_objs.push({ 'ImageNumber': parseInt(obj.ImageNumber), 'ObjectNumber': parseInt(obj.ObjectNumber) })
        }
        return rand_objs
    }
    getRow(key, search_obj) { //Where key is a member of data and search obj is of form {'img': , 'objs': , 'index': }
        if (search_obj.hasOwnProperty('index')) {
            return this.data[key].data_table[search_obj.index]
        }
        if (key === 'image_data' && search_obj.hasOwnProperty('img')) {
            return this.data[key].find({'ImageNumber': search_obj.img.toString()})
        } 
        if (key === 'object_data'  && search_obj.hasOwnProperty('obj')  && search_obj.hasOwnProperty('img') ) {
            return this.data[key].find({'ImageNumber': search_obj.img.toString(), 'ObjectNumber' : search_obj.obj.toString()})
        }
        return -1;

    }
    getCordsforCellDisplay(img, obj) {
        var cords = [];        
        var cellinObj = this.getRow('object_data', {'img' : img, 'obj' : obj})
        var cellx = parseInt(this.getValue('object_data', {'img' : img, 'obj' : obj, 'value' : 'Nuclei_Location_CenterX' }))
        var celly = parseInt(this.getValue('object_data', {'img' : img, 'obj' : obj, 'value' : 'Nuclei_Location_CenterY' }))
        cords.push(Math.max(0, cellx - 20)) 
       // var hi_x = lo_x + 40
        cords.push(Math.max(0, celly - 20))
               // var hi_y = lo_y + 40
        return {'x' : cords[0], 'y' : cords[1]};
    }

    getValue(key, search_obj) {
        var index = -1;
        if (key === 'image_data' && search_obj.hasOwnProperty('img')) {
            index = this.data[key].findIndex({'ImageNumber': search_obj.img.toString()})
        } 
        else if (key === 'object_data'  && search_obj.hasOwnProperty('obj')  && search_obj.hasOwnProperty('img') ) {
            index = this.data[key].findIndex({'ImageNumber': search_obj.img.toString(), 'ObjectNumber' : search_obj.obj.toString()})
        }

        if (index !== -1) {
            return this.data[key].get(index, search_obj.value);
        }
    }
    // getSetupLines() {
    //     return this.data.setup_lines
    // }

}

export {DataProvider}