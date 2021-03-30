import { render } from "@testing-library/react"
import raw from "../example_SETUP.SQL";
import React from 'react';

import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
import * as prprcss from "ml-preprocess";
import _ from "lodash";

export default class Emmanuel extends React.Component {
   
  //why the empty object?  
  state = {

  };

  //what do these two do?
  componentDidMount(){};
  componentWillUnmount(){};
  //point of render?
  render(){

    let new_cell_indices = []
    //var name = window.prompt("Enter desired CellType")

    let data = [{a:1, b:2, c:3, d:7}, {a:4, b:5, c:6, d:7}, {a:7, b:8, c:9, d:7}]

    let cell_features = ["a", "b", "c"]

    let n = 5
    while(new_cell_indices.length < n){
        
        
        //random integer between 0 and length of object data
        let random_data_index = Math.floor(Math.random() * data.length)

        let new_features = _.pick(data[random_data_index], cell_features)

        new_cell_indices.push(new_features)
        console.log(new_features)
        //tf_tensor.print()
        //random_cells.print()
        //console.log(random_cells)
        //break
        

    }
    
    console.log(new_cell_indices)
        return (
            <div>
                <h2>Emmanuel</h2>
                <p>Emmanuel Stuff</p>
            </div>
            );
  };
}