//import DataTables from "./DataTables";
import { DataTables } from "./DataTables";
export default class TrainingTable extends DataTables  {
    constructor(data_lines, column_lines) {
        super(data_lines, column_lines)
        this.column_lines = column_lines;
    }
    getTrainingSetColumnPaired() {
        return this.training_table;
        
    }
    getTrainingSetArr() {
        return this.data_lines;
    }
}