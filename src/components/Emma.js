import { render } from "@testing-library/react"
import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import raw from "../example_SETUP.SQL";
import React from 'react';
export default class Emma extends React.Component {
  state = {

  };

  componentDidMount(){};
  componentWillUnmount(){};
  render(){

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
        fetch(raw)
        .then(r => r.text()) 
        .then(text =>  {
          return text.split("\n");
        })
        .then (lines=> {
          dfd.read_csv("https://drive.google.com/file/d/1Ku2oYxF3dYbhSbLo4dGNkTyp7gkS7PFr")
          .then(df => {
            object_data = new dfd.DataFrame(df, { columns : column_names} )
          })
          console.log(object_data)
        })
    
        /*
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
            <p>Emma Stuff</p>
          </div>
        );
  };
}