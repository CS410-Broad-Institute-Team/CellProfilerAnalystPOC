import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "@testing-library/react"
import Elephant from './Elephant.jpg';
import cheetah from './cheetah.jpg'
import cat from './cat.jpg'
import labrador from './labrador.jpg'
import puggy from './puggy.jpg'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import _ from "lodash"; 

class imGridManager extends React.Component {
    render(){
      function getDataUrl(img) {
      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // Set width and height
      //canvas.width = img.width;
      //canvas.height = img.height;
      //console.log(img)
      const image_object = new Image()
      image_object.onload = (() => {
          ctx.drawImage(image_object, 0, 0)
          //console.log(canvas.toDataURL())
          //(canvas.toDataURL().length);
      })
      image_object.src = img;
      image_object.crossOrigin = "Anonymous"
      
      var outputURL = canvas.toDataURL()
      return outputURL
      // Draw the image
      //ctx.drawImage(img, 0, 0);

      }
    
      const urls = [];
      //construct list of dataUrls
      urls.push(getDataUrl(Elephant))
      urls.push(getDataUrl(cheetah))
      urls.push(getDataUrl(puggy))
      urls.push(getDataUrl(labrador))
      urls.push(getDataUrl(cat))
      
      //console.log(urls[0])

      const data_pairs = [{
          "ImageKey": 2, 
          "ObjectKey" : 3
           },
           {
            "ImageKey": 3,
            "ObjectKey":4   
           },
           {
            "ImageKey": 4,
            "ObkectKey": 5  
           },
           {
            "ImageKey":5,
            "ObjectKey":6
           },
           {
            "ImageKey": 6,
            "ObjectKey": 7
           }
        ]

      const classifications = []
      var size = data_pairs.length
      
      //create classfication array and fill up indices up to size of 
      // data_pair array
      for(var i = 0; i < size; i++){
        classifications.push("unclassified")
      }
      //console.log(classifications)
      const get_url_by_ID = (index) => {
         return urls[index]
      }
      
      //test get_url_by_ID function
      //const val = get_url_by_ID(2)
      //console.log(val)
    
      const get_number_images = (arr) => {
          return data_pairs.length
      }

      //test get_number_images function
      //console.log(get_number_images(data_pairs))

      const set_grid_prop = (index, gridType) => {
        if(classifications[index] !== gridType){
          classifications[index] = gridType
        }

      }
      set_grid_prop(1, "positive")
      set_grid_prop(2, "negative")
      //console.log(classifications)

      const get_pairs = (gridType) => {
          const pairs = []
          for(var i = 0; i < classifications.length; i++){
              if(classifications[i] === gridType){
                  pairs.push(data_pairs[i])
              }
          }
          return pairs
      }

      console.log(get_pairs("unclassified"))
      return (
         <div>
             <p>imGridManager</p>
         </div>
         
         );
 
   }

}
export default imGridManager 
//ReactDOM.render(<imGridManager />, document.getElementById('root'));
