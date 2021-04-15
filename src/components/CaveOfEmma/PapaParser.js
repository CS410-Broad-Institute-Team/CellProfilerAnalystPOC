import * as Papa from "papaparse"
export default class PapaParser {

    constructor() {
        // Could do the whole thing in here by keeping what configs mapped by key name
        // Maybe faster?
        //Is making multiple of these smart
    
        this.file_config_options = {
            "object_data" :  {fastMode: true, error: (e)=>console.error(e)} ,
            "image_data" : { error: (e)=>console.error(e)} ,
            "MyTrainingSet.txt" : {delimiter: " ", comments: "#" }
        }

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
    basicPapaConfig = {
        worker: true,
        skipEmptyLines: true,
        dynamicTyping: true
    }
    papaTextfromCSV(file_object) {
        var file_for_papa = file_object.file;
        return Papa.papaparseFilePromise(file_for_papa, this.file_config_options[file_object.name])
    }

}