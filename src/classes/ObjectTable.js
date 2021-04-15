
import _ from "lodash";
export default class ObjectTable {
    constructor(data_lines, column_lines) {
        this.data_table = data_lines.map(data_row=>{ return _.zipObject(column_lines, data_row)})
        this.data_lines = column_lines;
    }
    find (search_obj) {
        if (search_obj.hasOwnProperty('index')) 
            return this.data[search_obj.index];
        else 
                return  _.find(this.data_table, search_obj)
           
        }
    get(index, key) {
        return _.get(this.data_table[index], key)    
        
    }
    findIndex (search_obj) {
        return _.findIndex(this.data_table, search_obj)
    }
    getCords(img, obj) {
        var cords = [];        
        var index = this.findIndex({'ImageNumber': img.toString(), 'ObjectNumber': obj.toString()})
        var cellx = parseInt(this.get(index, 'Nuclei_Location_CenterX'))
        var celly = parseInt(this.get(index, 'Nuclei_Location_CenterY'))
        cords.push(Math.max(0, cellx - 20)) 
        // var hi_x = lo_x + 40
        cords.push(Math.max(0, celly - 20))
                // var hi_y = lo_y + 40
        return cords;
        }
}


