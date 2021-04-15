//import DataTables from "./DataTables";
import _ from "lodash";
export default class TrainingTable {
    constructor(data_lines, column_lines) {
        this.training_table = data_lines.map(data_row=>{ return _.zipObject(column_lines, data_row)})
        this.training_lines = column_lines;
    }
    getTrainingSetColumnPaired() {
        return this.training_table;
        
    }
    getTrainingSetArr() {
        return this.training_lines;
    }
    find (search_obj) {
        if (search_obj.hasOwnProperty('index')) 
            return this.training_table[search_obj.index];
        else 
                return  _.find(this.training_table, search_obj)
           
        }
    get(index, key) {
        return _.get(this.training_table[index], key)    
        
    }
    findIndex (search_obj) {
        return _.findIndex(this.training_table, search_obj)
    }


}