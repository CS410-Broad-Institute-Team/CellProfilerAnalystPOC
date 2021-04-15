

export default class DataTables {
    constructor(data_lines, column_lines) {
        this.data_table = data_lines.map(data_row=>{ return _.zipObject(column_lines, data_row)})
        this.column_lines = column_lines;
    }
    find (search_obj) {
        if (search_obj.hasOwnProperty('index')) 
            return data[search_obj.index];
        else 
                return  _.find(this.data_table, search_obj)
           
        }
    get(index, key) {
        return _.get(this.data_table[index], key)    
        
    }
    findIndex (search_obj) {
        return _.findIndex(this.data_table, search_obj)
    }
} 