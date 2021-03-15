import { render } from "@testing-library/react"
import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
import * as prprcss from "ml-preprocess";
import React from 'react';
import logo from '../logo.svg';
import Papa from "papaparse";
import raw from "../example_SETUP.SQL";
export default class Emma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imageSource: logo};
}

  componentDidMount(){};
  componentWillUnmount(){};
  render(){
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
      console.log(fileName.target.files);
      var object_index = Array.from(fileName.target.files).findIndex((elem) => {
        return elem.name === "per_object.csv";
      });
      Papa.parse(fileName.target.files[object_index], 
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
          window.data_test = results.data;
          // turn the data into a dataframe
         // let new_index = ["ImageNumber", "ObjectNumber" ]
         const df = new dfd.DataFrame(results.data,{ columns : column_names});
          // print the first 5 lines
          
            //df.set_index({key: new_index, inplace: true});
            df.head().print();
          }
      });        
      
  }	
  


      var setup_lines = null;
      var create_index = null;
      var end_index = null;
      var column_lines = null;
      var column_names = null
      var object_data;

      fetch(raw)
      .then(r => r.text())
      .then(text => {
        return text.split("\n").map((x)=>x.trim());
      })
      .then(lines => {
        console.log(lines.indexOf("CREATE TABLE per_object \("));
        console.log(lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"));
        setup_lines = lines;             
        create_index = lines.indexOf("CREATE TABLE per_object \(");
        end_index = lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)");
        column_lines = lines.slice(create_index + 1, end_index);
        column_names = column_lines.map((name)=>(name.split(' ')[0]));         
        console.assert(column_names[column_names.length - 1],
             'AreaNormalized_Cytoplasm_AreaShape_Zernike9_9');
        })
   
        /*
        .then (lines=> {
          dfd.read_csv("https://drive.google.com/file/d/1Ku2oYxF3dYbhSbLo4dGNkTyp7gkS7PFr")
          .then(df => {
            object_data = new dfd.DataFrame(df, { columns : column_names} )
          })
          console.log(object_data)
        })
    
   
        dfd.read_csv("../cpa_example/per_object.csv")
        .then ( df => {
          console.log(df.head());
        })
        */
                          
  
        


      // console.log(lines[1287]);
      // console.log(lines[1287] === "PRIMARY KEY  (ImageNumber,ObjectNumber)")
        //console.log(lines.indexOf(" PRIMARY KEY  \(ImageNumber,ObjectNumber\)"));
      

        
      
        
        return (
            
            
          <div>
              <h2>Emma</h2>
              <p>Stuff of Emma</p>

              <header className="App-header">
                  <img src={this.state.imageSource} className="App-logo" alt="logo" />
                  <p>
                  woo the atom thingy do the rotate woo yea
                  </p>
                  <script src="https://cdn.jsdelivr.net/npm/danfojs@0.2.4/lib/bundle.min.js"></script>    
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