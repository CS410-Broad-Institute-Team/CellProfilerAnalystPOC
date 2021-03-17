import { render } from "@testing-library/react"
import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
// import * as prprcss from "ml-preprocess";
import {normal} from 'ml-preprocess'; // replaces StandardScaler
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

import raw from "../example_SETUP.SQL"; 

export default class Yahiya extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imageSource: logo};
    }

    componentDidMount(){

    };
    componentWillUnmount(){};
    render(){

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
        var showFile = async (fileName) => {
            fileName.preventDefault()

            // read in text file and display it on the console
            // const textReader = new FileReader()
            // textReader.onload = async (fileName) => { 
            //   console.log(fileName.target.result);
            // };
            // textReader.readAsText(fileName.target.files[4])


            // read in first image and display where logo was using the callback I made
            // create the image reader and callback to use the result when finished
            const imageReader = new FileReader()
            imageReader.onload = async (fileName) => { 
                console.log(fileName.target.result);
                this.setState({imageSource: fileName.target.result})
                };
            // start the reading of the image
            imageReader.readAsDataURL(fileName.target.files[6]);

            // this displays the available files from the user upload of cpa_example directory
            // console.log(fileName.target.files) 

            // parse with the papa, per_object.csv
            Papa.parse(fileName.target.files[5], 
            {
                // use separate thread to not make app too slow
                worker: true,
                // blank lines confuse danfo.js so get rid of them
                skipEmptyLines: true,
                // per_object.csv has no strings, so we can get a faster speed reading it
                fastMode: true, 
                // convert strings to numbers for smaller memory footprint
                dynamicTyping: true,
                // call this when the reading is done
                complete: (results, file) => {
                console.log("Parsing complete:");
                console.log(results.data);

                // turn the data into a dataframe
                const df = new dfd.DataFrame(results.data, {columns: column_names});
                console.log("df complete")

                // calcuate a unique index number for each pair
                const image_keys = df.column("ImageNumber").tensor;
                console.log("imagekeys complete")
                const object_keys = df.column("ObjectNumber").tensor;
                console.log("objeckeys complete")
                const output_tensor1 = image_keys.square().add(image_keys).add(object_keys);
                console.log("output1 complete")
                const output_tensor2 = object_keys.square().add(image_keys);
                console.log("output2 complete")

                // calculate the index values, extract the js array, when its done set it as the indices for the df
                output_tensor1.where(image_keys.greaterEqual(object_keys), output_tensor2)
                .array()
                .then(indices => {
                    console.log("indices complete", indices)
                    df.set_index({key: indices, inplace: true});
                    df.head().print();
                    window.data_df = df;
                });
                
                // df.print();
                // print the first 5 lines
                // df.head().print();
                
                }
            });        
            
        }	

        // MY CODE ASSIGNMENT STARTS HERE
        var setup_lines = null;
        var create_index = null;
        var end_index = null;
        var column_lines = null;
        var column_names = null;

        fetch(raw)
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
            const features_to_use = column_lines.filter((elem)=>elem.includes("Location"));
            console.log(column_lines);
            console.log(features_to_use);
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
                    
                <input type="file" onChange = {(fileName) => showFile(fileName)} webkitdirectory="true" mozdirectory="true" msdirectory="true" odirectory="true" directory="true" multiple/>
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