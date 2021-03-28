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
    var name = window.prompt("Enter desired CellType")

    while(new_cell_indices.length < 50){
        
        let data = tf.tensor2d([[20,30,40], [23,90, 28], [39, 42, 57], [51, 54, 56],
          [67, 68, 70], [53, 44, 48], [32, 23, 45], [88, 87, 95], [12, 11, 12], [14, 15, 17]
        ])
        let df = new dfd.DataFrame(data)
        let tf_tensor = df.tensor

        //random integer between 0 and length of object data
        let margin = Math.floor(Math.random() * tf_tensor.shape[0])

        let random_cells = df.sample(margin)
        //tf_tensor.print()
        random_cells.print()
        //console.log(random_cells)
        break
        

    }   
        return (
            <div>
                <h2>Emmanuel</h2>
                <p>Emmanuel Stuff</p>
            </div>
            );
  };
}