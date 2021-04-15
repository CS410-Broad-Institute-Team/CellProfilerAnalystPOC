//import DataTables from "./DataTables";
import _ from "lodash";
export default class ImageTable {
    constructor(data_lines, column_lines) {
        this.data_table = data_lines.map(data_row=>{ return _.zipObject(column_lines, data_row)})
        this.column_lines = column_lines;
    }
    find (search_obj) {
        if (search_obj.hasOwnProperty('index')) 
            return this.data_table[search_obj.index];
        else 
                return  _.find(this.data_table, search_obj)
           
        }
    get(index, key) {
        return _.get(this.data_table[index], key)    
        
    }
    findIndex (search_obj) {
        return _.findIndex(this.data_table, search_obj)
    }
        //console.log(image_paths)
    }
    
