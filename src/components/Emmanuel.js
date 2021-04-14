import React from 'react';

import _ from "lodash";
import General_Classifier from "./YahiyaTesting/GeneralClassifier"
<<<<<<< HEAD
import Training_Set_Handler from "./YahiyaTesting/TrainingSetHandler"
import downloadTxtFile from "./downloadButtonDemo"
=======
>>>>>>> 02c6dc2f6301019948fb28080d49d91581de15d0

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

    let data = [{a:1, b:2, c:3, d:7}, {a:4, b:5, c:6, d:7}, {a:7, b:8, c:9, d:7}]

    downloadTxtFile(data, "csv")

    let cell_features = ["a", "b", "c"]

    let n = 5
    const classifier = General_Classifier.createLogisticRegressionModel(cell_features.length)

    //while(new_cell_indices.length < n){
        
        
        //random integer between 0 and length of object data
        let random_data_index = Math.floor(Math.random() * data.length)

        let new_features = _.pick(data[random_data_index], cell_features)

        //new_cell_indices.push(new_features)
        //console.log(new_features)

        const classifier_input = General_Classifier.createBasicTestset([new_features], cell_features)
   
        let prediction = classifier.predict(classifier_input)
        
        if(prediction.argMax(-1).arraySync()[0] === 1){
          new_cell_indices.push(new_features)

        }

    //}
    
    console.log(new_cell_indices)

        return (
            <div>
                <h2>Emmanuel</h2>
                <p>Emmanuel Stuff</p>
            </div>
            
            );
  };
}