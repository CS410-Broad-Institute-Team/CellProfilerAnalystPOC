import { render } from "@testing-library/react"
import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import LogisticRegression, * as lgreg from "ml-logistic-regression";
// import * as prprcss from "ml-preprocess";
import {normal} from 'ml-preprocess'; // replaces StandardScaler
import {Matrix} from 'ml-matrix';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';

// example:
// let matrix = [
//     [2000, 1000, 3000],
//     [3000, 2000, 1000],
//     [1000, 1000, 1000]
// ];
// normal(matrix) == [
//     [0, -1, 1],
//     [1, 0, -1],
//     [0, 0, 0]
// ];
import React from 'react';
import logo from '../logo.svg';
import Papa from "papaparse";
// import raw_csv from '../per_object.csv'

// import raw from "./example_SETUP.SQL";

import setup_sql_raw from "../example_SETUP.SQL"; 

export default class Yahiya extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imageSource: logo};

        Papa.parsePromise = function(file) {
            return new Promise(function(complete, error) {
              Papa.parse(file, {complete, error});
            });
          };
    }

    componentDidMount(){

    };
    componentWillUnmount(){};



    render(){

        // const object_data_promise = Promise((resolve) => {

            // return Papa.parsePromise(fileName.target.files[object_data_index])
            // .then((results) => {

            // })


            // Papa.parse(fileName.target.files[object_data_index], 
            //     {
            //         // use separate thread to not make app too slow
            //         worker: true,
            //         // blank lines confuse danfo.js so get rid of them
            //         skipEmptyLines: true,
            //         // per_object.csv has no strings, so we can get a faster speed reading it
            //         fastMode: true, 
            //         // convert strings to numbers for smaller memory footprint
            //         dynamicTyping: true,
            //         // call this when the reading is done
            //         complete: (results, file) => {
            //             console.log("Parsing complete:");
            //             // console.log(results.data);
    
            //             // turn the data into a dataframe
            //             const object_data = new dfd.DataFrame(results.data, {columns: column_names});
            //             console.log("df complete")
    
            //             // calcuate a unique index number for each pair
            //             const image_keys = object_data.column("ImageNumber").tensor;
            //             console.log("imagekeys complete")
            //             const object_keys = object_data.column("ObjectNumber").tensor;
            //             console.log("objeckeys complete")
            //             const output_tensor1 = image_keys.square().add(image_keys).add(object_keys);
            //             console.log("output1 complete")
            //             const output_tensor2 = object_keys.square().add(image_keys);
            //             console.log("output2 complete")
    
            //             // calculate the index values, extract the js array, when its done set it as the indices for the df
            //             output_tensor1.where(image_keys.greaterEqual(object_keys), output_tensor2)
            //             .array()
            //             .then(indices => {
            //                 console.log("indices complete", indices)
            //                 object_data.set_index({key: indices, inplace: true});
            //                 console.log("finish set index");
            //                 object_data.head().print();
            //                 // window.data_df = object_data;
            //                 return object_data;
            //             })
            //         }
            //     }
            // )


            // fetch(setup_sql_raw)
            // .then(r => r.text())
            // .then(text => {
            //     return text.split("\n").map((x)=>x.trim());
            // })
            // .then(lines => {
            //     // console.log(lines.indexOf("CREATE TABLE per_object \("));
            // // console.log(lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"));
            //     setup_lines = lines;
            //     create_index = lines.indexOf("CREATE TABLE per_object (");
            //     end_index = lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)");
            //     column_lines = lines.slice(create_index + 1, end_index);
            //     column_names = column_lines.map((name)=>(name.split(' ')[0])); //copied from Emma.js
            //     return column_names;
            // })
            // .then (column_names => {
            //     var object_data_index = Array.from(fileName.target.files).findIndex((elem) => {
            //         return elem.name === "per_object.csv";
            //       });

                
            // })
        // })

        // manually fetch and modify string in javascript normally
        // fetch(raw)
        // .then(r => r.text())
        // .then(text => {
        // 	return text.split("\n");
        // })
        // .then(lines => {
        // 	console.log(lines.indexOf("CREATE TABLE per_object \("));
        // 	console.log(lines.indexOf(" PRIMARY KEY  \(ImageNumber,ObjectNumber\)"));
        // })
            
    // file read callback
        // var on_folder_uploaded_callback = async (fileName) => {
        //     fileName.preventDefault()

        //     // read in text file and display it on the console
        //     // const textReader = new FileReader()
        //     // textReader.onload = async (fileName) => { 
        //     //   console.log(fileName.target.result);
        //     // };
        //     // textReader.readAsText(fileName.target.files[4])


        //     // read in first image and display where logo was using the callback I made
        //     // create the image reader and callback to use the result when finished
        //     const imageReader = new FileReader()
        //     imageReader.onload = async (fileName) => { 
        //         console.log(fileName.target.result);
        //         this.setState({imageSource: fileName.target.result})
        //         };
        //     // start the reading of the image

        //     var object_data_index = Array.from(fileName.target.files).findIndex((elem) => {
        //         return elem.name === "per_object.csv";
        //       });

        //     var image_data_index = Array.from(fileName.target.files).findIndex((elem) => {
        //     return elem.name === "per_image.csv";
        //     });
        //     var training_data_index = Array.from(fileName.target.files).findIndex((elem) => {
        //         return elem.name === "MyTrainingSet.txt";
        //         });


        //     imageReader.readAsDataURL(fileName.target.files[6]);

            // this displays the available files from the user upload of cpa_example directory
            // console.log(fileName.target.files) 

            // var df = null;
            // parse with the papa, per_object.csv
            // Papa.parsePromise(fileName.target.files[object_data_index], 
            // {
            //     // use separate thread to not make app too slow
            //     worker: true,
            //     // blank lines confuse danfo.js so get rid of them
            //     skipEmptyLines: true,
            //     // per_object.csv has no strings, so we can get a faster speed reading it
            //     fastMode: true, 
            //     // convert strings to numbers for smaller memory footprint
            //     dynamicTyping: true,
            //     // call this when the reading is done
            //     complete: (results, file) => {
            //         console.log("Parsing complete:");
            //         // console.log(results.data);

            //         // turn the data into a dataframe
            //         const object_data = new dfd.DataFrame(results.data, {columns: column_names});
            //         console.log("df complete")

            //         // calcuate a unique index number for each pair
            //         const image_keys = object_data.column("ImageNumber").tensor;
            //         console.log("imagekeys complete")
            //         const object_keys = object_data.column("ObjectNumber").tensor;
            //         console.log("objeckeys complete")
            //         const output_tensor1 = image_keys.square().add(image_keys).add(object_keys);
            //         console.log("output1 complete")
            //         const output_tensor2 = object_keys.square().add(image_keys);
            //         console.log("output2 complete")

            //         // calculate the index values, extract the js array, when its done set it as the indices for the df
            //         // output_tensor1.where(image_keys.greaterEqual(object_keys), output_tensor2)
            //         // .array()
            //     }})
            //         .then(indices => {
            //             console.log("indices complete", indices)
            //             object_data.set_index({key: indices, inplace: true});
            //             console.log("finish set index");
            //             object_data.head().print();
            //             // window.data_df = object_data;
            //             return object_data;
            //         })
            //         .then(object_data => {
            //             Papa.parse(fileName.target.files[image_data_index], 
            //             {
            //                 worker: true,
            //                 skipEmptyLines: true,
            //                 dynamicTyping: true,
            //                 complete: (results, file) => {
            //                     console.log('parsed image data csv')
            //                     console.log(results.data)
            //                     console.log(column_names)
            //                     console.log(object_data)
            //                     const image_data = new dfd.DataFrame(results.data, {columns: column_names});
            //                     // got image data
            //                     image_data.set_index({key: "ImageNumber", inplace: true});
            //                     // image data set index to image number
            //                     image_data.head().print();

            //                     Papa.parse(fileName.target.files[training_data_index], 
            //                         {
            //                             worker: true,
            //                             skipEmptyLines: true,
            //                             dynamicTyping: true,
            //                             delimiter: " ",
            //                             comments: "#",
            //                             complete: (results, file) => {
            //                                 const training_data = new dfd.DataFrame(results.data, {columns: "label imagenum objectnum x y".split(" ")})
            //                                 training_data.drop({ index: [0,1],axis:0,inplace:true});


            //                                 const image_keys = training_data.column("imagenum").tensor;
            //                                 const object_keys = object_data.column("objectnum").tensor;
            //                                 const output_tensor1 = image_keys.square().add(image_keys).add(object_keys);
            //                                 const output_tensor2 = object_keys.square().add(image_keys);

            //                                 output_tensor1.where(image_keys.greaterEqual(object_keys), output_tensor2)
            //                                 .array()
            //                                 .then(indices => {
            //                                     console.log("indices complete", indices)
            //                                     const labeled_cells = object_data.loc({rows: indices}).tensor;
            //                                     window.labeled_cells = labeled_cells;
            //                                     window.features_to_use = features_to_use;
            //                                     object_data.head().print();
            //                                     // window.data_df = object_data;
            //                                     return object_data;
            //                                 })
            //                             }
                                        
            //                         }
            //                     );

            //                 }
            //             })
            //         })
                    
                    
            //     }  
            

        // MY CODE ASSIGNMENT STARTS HERE
        var setup_lines = null;
        var create_index = null;
        var end_index = null;
        var column_lines = null;
        var column_names = null;
        var features_to_use = null;

        fetch(setup_sql_raw)
        .then(r => r.text())
        .then(text => {
            return text.split("\n").map((x)=>x.trim());
        })
        .then(lines => {
            // console.log(lines.indexOf("CREATE TABLE per_object \("));
        // console.log(lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"));
            setup_lines = lines;
            create_index = lines.indexOf("CREATE TABLE per_object (");
            end_index = lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)");
            column_lines = lines.slice(create_index + 1, end_index);
            column_names = column_lines.map((name)=>(name.split(' ')[0])); //copied from Emma.js
            
        // console.log(column_lines);

    // console.log(lines[1287]);
    // console.log(lines[1287] === "PRIMARY KEY  (ImageNumber,ObjectNumber)")
            //console.log(lines.indexOf(" PRIMARY KEY  \(ImageNumber,ObjectNumber\)"));

            return column_lines;
        })
        .then(column_lines => {
            features_to_use = column_lines.filter((elem)=>elem.includes("Location"));
            console.log(column_lines);
            console.log(features_to_use);

            //normal()

            const classifier = new LogisticRegression({ numStep: 1000, learningRate: 5e-3 });
            // classifier.train(X, Y);
        });


        
        return (
            
            
            <div>
                <h2>Yahiya</h2>
                <p>Yahiya Stuff</p>

                <header className="App-header">
                    <img src={this.state.imageSource} className="App-logo" alt="logo" />
                    <p>
                    woo the atom thingy do the rotate woo yea
                    </p>
                    
                {/* <input type="file" onChange = {(fileName) => on_folder_uploaded_callback(fileName)} webkitdirectory="true" mozdirectory="true" msdirectory="true" odirectory="true" directory="true" multiple/> */}
                    <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Learn React
                    </a>
                </header>
            </div>
        )
    };
}