import * as dfd from "danfojs/src/index";
import React from 'react';
import logo from '../logo.svg';
import Papa from "papaparse";
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
      class SetupSqlData {
        constructor() {  
          this.df = null;
          this.perObjData = null;
          this.column_names = null;
          Papa.parsePromise = function(file) {
            return new Promise(function(complete, error) {
              Papa.parse(file, {complete, error});
            });
          };
      }
          getDF() {
            return this.df;
          }
          findFileIndex (fName) {
              var index = Array.from(fileName.target.files).findIndex((elem) => {
                  return elem.name === fName;
            });
               return index;
          }
          parseSQLData() {
             var column_n = null;
             const textReader = new FileReader()
             textReader.onload = async (fileName) => { 
             console.log(fileName.target.result);
            };
            var index = this.findFileIndex("example_SETUP.SQL");
           
            return fileName.target.files[index].text()
            .then((text) => {
              return text.split("\n").map((x)=>x.trim());
            })
            .then(lines => {
              console.log(lines.indexOf("CREATE TABLE per_object \("));
              console.log(lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"));
              var setup_lines = lines;             
              var create_index = lines.indexOf("CREATE TABLE per_object \(");
              var end_index = lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)");
              var column_lines = lines.slice(create_index + 1, end_index);
              this.column_names = column_lines.map((name)=>(name.split(' ')[0]));      
              console.assert(this.column_names[this.column_names.length - 1],
                   'AreaNormalized_Cytoplasm_AreaShape_Zernike9_9');
                   console.log("df complete");
             });
      

          }
          parsePerObj() {
            return Papa.parsePromise(fileName.target.files[this.findFileIndex("per_object.cvs")], 
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
                  this.perObjData = results.data;
                  }
              });  
             }
          setupDF() {
                  // turn the data into a dataframe
                 // let new_index = ["ImageNumber", "ObjectNumber" ]
                  this.df = new dfd.DataFrame(this.perObjData,{ columns : this.column_names});
                  console.log("df complete")

                 // calcuate a unique index number for each pair
                 const image_keys = this.df.column("ImageNumber").tensor;
                 console.log("imagekeys complete")
                 const object_keys = this.df.column("ObjectNumber").tensor;
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
                     this.df.set_index({key: indices, inplace: true});
                     this.df.head().print();
                     window.data_df = this.df;
                 });

            
          }
          init() {
            this.parseSQLData()
            .then (()=> {
              this.parsePerObj()
              .then (()=>{
                console.log(this.column_names);
                console.log(this.perObjData);
                this.setupDF();
              });
            });

          }
      }
      const setUpDF = new SetupSqlData();
      setUpDF.init();
      var object_data = setUpDF.getDF();
       
      
  }	
      
        
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
