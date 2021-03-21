import { render } from "@testing-library/react"
import raw from "../example_SETUP.SQL";
import React from 'react';

import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
import * as prprcss from "ml-preprocess";

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
    let num_checked = 0

    while(new_cell_indices.length < 50){

        num_checked += 50
        
        let data = tf.tensor2d([[20,30,40], [23,90, 28]])
        let df = new dfd.DataFrame(data)
        let tf_tensor = df.tensor
        console.log(tf_tensor);

        let random_cells = df.sample(10)
        tf_tensor.print()
        console.log(random_cells)
        

    }   
        return (
            <div>
                <h2>Emmanuel</h2>
                <p>Emmanuel Stuff</p>
            </div>
            );
  };
}