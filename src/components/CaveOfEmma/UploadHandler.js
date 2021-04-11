import * as Papa from "papaparse";
import _ from "lodash";
import PapaParser from "./PapaParser.js";
import FileHandler from "./FileHandler.js";
import { data } from "@tensorflow/tfjs";
export default class UploadHandler {

    constructor(fileListObject) {
        this.fileListObject = fileListObject
        Papa.parsePromise = function(file, config) {
            return new Promise(function(complete, error) {
              Papa.parse(file, {...config, complete, error});
            });
        };  
        Promise.prototype.notify = function(strMsg) {
            return this.then(x=>{console.log(strMsg); return x});
          }
          Promise.prototype.debugPrint = function() {
            return this.then(x=>{console.log(x); return x});
        }  
        Papa.papaparseFilePromise = function(file, options={}, onEndMsg="") {
    
            return Papa.parsePromise(file,
                {...this.basicPapaConfig, ...options} 
            )
            .then((result)=> result.data)
            .notify(onEndMsg);
        }
        Papa.papaparseFilePromise_noReturn = function(file, options={}, onEndMsg="") {
    
            return Papa.parsePromise(file,
                {...this.basicPapaConfig, ...options} 
            )
            .notify(onEndMsg);
        }
    }
    // TODO
    // getProperties(file_handler) {

    // }
    sliceArrayByValue = function (array, value1, value2) {
        const index1 = array.indexOf(value1);
        const index2 = array.indexOf(value2);
      
        if (value1 === -1 || value2 === -1) {
            console.error("Values not found to slice");
            return null;
        }
      
        return array.slice(index1, index2);
      }

    basicPapaConfig = {
        worker: true,
        skipEmptyLines: true,
        dynamicTyping: true
    }
    getFiles() {
        var file_names = [
            "example_SETUP.SQL",
            "per_object.csv",
            "per_image.csv",
            "MyTrainingSet.txt"
        ]
        var file_handlers = [];
        var i = 0;
        var file_handler = new FileHandler(this.fileListObject)
        return  file_names.map(file_name => {
                var file = file_handler.findFile(file_name)
                return {'file': file, 'name' : file_name};
            })
    }
    getText(file_objects) {
        return Promise.all( file_objects.map( file_object => {
            if (file_object.name.endsWith(".csv") || file_object.name.endsWith(".txt")) {
                var papa_parser = new PapaParser();
                return papa_parser.papaTextfromCSV(file_object);
            }
            else {
                var file_handler = new FileHandler(this.fileListObject)
                return file_handler.fileReaderPromiseText(file_object.file);
            }
        }))
    }
        //return Promise.all([this.fileReaderPromiseText(fileListObject, setup_name).split('\n').map(e=>e.trim()),
    getColumnLines(column_lines_txt) {
        var data_columns = [] 
        var column_lines = column_lines_txt.split('\n').map(e=>e.trim())
        const object_column_lines = this.sliceArrayByValue(
            column_lines,
            "CREATE TABLE per_object (", 
            "PRIMARY KEY  (ImageNumber,ObjectNumber)"
        );
        data_columns.push(object_column_lines.map((name)=>name.split(' ')[0]).slice(1));
        const image_column_lines = this.sliceArrayByValue(
            column_lines,
            "CREATE TABLE per_image (", 
            "PRIMARY KEY  (ImageNumber)"
        );
        data_columns.push(image_column_lines.map((name)=>name.split(' ')[0]).slice(1));
        data_columns.push("label imagenum objectnum x y".split(" "));
        return data_columns
    }
    getDataHandlerandStartingTrainingSet = async function() {
        var data_types = [
            'column_lines',
            'object_data',
            'image_data',
            'training_data'
        ]  
        var data = [];
        console.time("data done")
        var file_objects = this.getFiles();
        var text_data = await this.getText(file_objects);
        var column_lines = this.getColumnLines(text_data[0]);
        var image_data = text_data[2].map(data_row=>{ return _.zipObject(column_lines[1], data_row)})
        var object_data = text_data[1].map(data_row=>{ return _.zipObject(column_lines[0], data_row)})
        var training_data = text_data[3].map(data_row=>{ return _.zipObject(column_lines[2], data_row)})

        console.timeEnd("data done")
 
        console.log(image_data);
        console.log(object_data);
        console.log(training_data);


    }

}