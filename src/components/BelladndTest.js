import React from 'react';
import jones from '../jones.jpg'
import test1 from './cell_image1.jpg'
import test2 from './cell_image2.jpg'
import test3 from './cell_image3.jpg'
import test4 from './cell_image4.jpg'
import test5 from './cell_image5.jpg'
import test6 from './cell_image6.jpg'
import test7 from './cell_image7.jpg'
import test8 from './cell_image8.jpg'
import test9 from './cell_image9.jpg'
import test10 from './cell_image10.jpg'
import test11 from './cell_image11.jpg'
import test12 from './cell_image12.jpg'
import test13 from './cell_image13.jpg'
import test14 from './cell_image14.jpg'
import test15 from './cell_image15.jpg'
import test16 from './cell_image16.jpg'
import test17 from './cell_image17.jpg'
import test18 from './cell_image18.jpg'
import test19 from './cell_image19.jpg'
import test20 from './cell_image20.jpg'



import ReactDOM from "react-dom";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";

import "../dndstyles.css";
import { unregisterKernel } from '@tensorflow/tfjs';


var urls = [
    test1,
    test2,
    test3,
    test4,
    test5,
    test6,
    test7,
    test8,
    test9,
    test10,
    test11,
    test12,
    test13,
    test14,
    test15,
    test16,
    test17,
    test18, 
    test19, 
    test20
   ];

function BelladndTest() {
    
    //function getURL(){
        // for (i = 0; i < urls.length; i++)  
         // urlRandom = urls[Math.floor(Math.random()*urls.length)]
        
            
   // }
    
  
   
    const [items, setItems] = React.useState({ 
        unclassifed: [
            { id: 1 , address: urls[0]},
            { id: 2, address: urls[1]},
            { id: 3 , address:urls[2]},
            { id: 4, address: urls[3] },
            { id: 5 , address: urls[4]},
            { id: 6 , address: urls[5]}, 
            { id: 7 , address: urls[6]}, 
            { id: 8, address: urls[7] }, 
            { id: 9 , address: urls[8]}, 
            { id: 10, address:urls[9] }, 
            { id: 11, address:urls[10] }, 
            { id: 12, address:urls[11] }, 
            { id: 13 , address:urls[12]}, 
            { id: 14, address:urls[13] }, 
            { id: 15, address:urls[14]}, 
            { id: 16, address:urls[15] }, 
            { id: 17, address:urls[16] }, 
            { id: 18, address:urls[17] }, 
            { id: 19, address:urls[18] }, 
            { id: 20, address:urls[19]}, 
          ],
        positive: [
         
        ],
        negative: [
        
        ]

      });

    
     
      function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        if (targetId) {
          const result = move(
            items[sourceId],
            items[targetId],
            sourceIndex,
            targetIndex
          );
          return setItems({
            ...items,
            [sourceId]: result[0],
            [targetId]: result[1]
          });
        }
    
        const result = swap(items[sourceId], sourceIndex, targetIndex);
        return setItems({
          ...items,
          [sourceId]: result
        });
      }
 
    return( 
   
    <GridContextProvider onChange={onChange}>
        <div>
        <div className="topContainer">
       
        <GridDropZone
             className="dropzone "
            id="unclassifed"
            boxesPerRow={8}
            rowHeight={70}
          >
            {items.unclassifed.map(item => (
              <GridItem key={item.id}>
                <div className="grid-item" >
                    <div className="grid-item-content" style = {{backgroundImage: `url(${item.address})`}} >
                        
                        </div> 
                </div>
              </GridItem>
            ))}
          </GridDropZone>
          </div>
        
          <div className="container">
          <GridDropZone
            className="dropzone positive"
            id="positive"
            boxesPerRow={4}
            rowHeight={70}
          >
            {items.positive.map(item => (
              <GridItem key={item.id}>
                <div className="grid-item"> 
                    <div className="grid-item-content" style = {{backgroundImage: `url(${item.address})`}}>
                         
                        </div>  
                </div>
              </GridItem>
            ))}
          </GridDropZone>
         
          <GridDropZone
            className="dropzone negative"
            id="negative"
            boxesPerRow={4}
            rowHeight={70}
          >
            {items.negative.map(item => (
              <GridItem key={item.id}>
                <div className="grid-item">
                <div className="grid-item-content" style = {{backgroundImage: `url(${item.address})`}}>
                        
                        </div>      
                </div>
              </GridItem>
            ))}
          </GridDropZone>

          
        </div>
        </div>
      </GridContextProvider>
    );

    }


export default BelladndTest; 




