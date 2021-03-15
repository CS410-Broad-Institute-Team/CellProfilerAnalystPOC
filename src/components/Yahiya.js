import { render } from "@testing-library/react"
import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
import * as prprcss from "ml-preprocess";
import React from 'react';
import logo from '../logo.svg';
import Papa from "papaparse";
// import raw_csv from '../per_object.csv'

// import raw from "./example_SETUP.SQL";

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
                const df = new dfd.DataFrame(tf.tensor(results.data));
                // print the first 5 lines
                df.head().print();
                }
            });        
            
        }	
        
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