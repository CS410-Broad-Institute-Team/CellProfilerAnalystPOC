import { train } from "@tensorflow/tfjs";
import _ from "lodash";


export default class TrainingSetHandler {

    constructor(data) {
        this.object_data = data.object_data;
        this.training_data = data.training_data;
        this.object_column_names = data.object_column_names;
        this.training_columns = data.training_columns;

        console.assert(_.isEqual(Object.keys(this.object_data[0]), this.object_column_names));
        console.assert(_.isEqual(Object.keys(this.training_data[0]), this.training_columns));
    }

    displayData(){
        console.log(this.object_data, this.training_data, this.object_column_names);
    }

    createTrainingSet() {
        console.assert(this.object_data != undefined)
        if (!this.object_data) {
            return null;
        }

        this.labeled_cells = this.training_data.map(training_row => {
            return _.find(this.object_data, {"ObjectNumber": training_row.objectnum, "ImageNumber": training_row.imagenum})
        })

        
        
        console.log(this.labeled_cells);

        this.object_features_to_use = this.object_column_names.filter(
            (elem)=>!elem.includes("Location") && (elem !== "ObjectNumber") && (elem !== "ImageNumber")
        );

        this.labeled_keys = this.labeled_cells.map(row => {
            return _.pick(row, ["ObjectNumber", "ImageNumber"])
        })

        this.labeled_features = this.labeled_cells.map(row => {
            return _.mapValues( (_.pick(row, this.object_features_to_use)),
                                (value=>parseFloat(value))
                                )
                    
        })

        

        this.labels = this.training_data.map((row)=> row.label === 'positive'? 1 : 0 ).slice(0,613);

        console.log(this.labeled_features, this.labels)
        return [this.labels, this.labeled_features, this.object_features_to_use];
    }


}