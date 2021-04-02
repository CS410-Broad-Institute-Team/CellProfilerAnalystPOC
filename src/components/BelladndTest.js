import React from 'react';
import jones from '../jones.jpg'
import { Container, Row, Col} from "reactstrap";

import ReactDOM from "react-dom";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";

import "../dndstyles.css";

function BelladndTest() {
    
    const [items, setItems] = React.useState({
        unclassifed: [
            { id: 1 },
            { id: 2 },
            { id: 3},
            { id: 4 },
            { id: 5 },
            { id: 6 }
          ],
        left: [
          { id: 7 },
          { id: 8},
          { id: 9},
          { id: 10 },
          { id: 11 },
          { id: 12 }
        ],
        right: [
          { id: 13 },
          { id: 14 },
          { id: 15 },
          { id: 16 },
          { id: 17 },
          { id: 18 }
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
                <div className="grid-item">
                         <img  width={'100%'} src={jones} />     
                </div>
              </GridItem>
            ))}
          </GridDropZone>
          </div>
        
          <div className="container">
          <GridDropZone
            className="dropzone left"
            id="left"
            boxesPerRow={4}
            rowHeight={70}
          >
            {items.left.map(item => (
              <GridItem key={item.id}>
                <div className="grid-item">
                
                         <img  width={'100%'} src={jones} />
                
                </div>
              </GridItem>
            ))}
          </GridDropZone>
         
          <GridDropZone
            className="dropzone right"
            id="right"
            boxesPerRow={4}
            rowHeight={70}
          >
            {items.right.map(item => (
              <GridItem key={item.id}>
                <div className="grid-item">
                         <img  width={'100%'} src={jones} />     
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




