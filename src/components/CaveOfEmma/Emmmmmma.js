
import Button from '@material-ui/core/Button'
import * as tf from '@tensorflow/tfjs'
import { getImgFromArr } from 'array-to-image';
import jones from './jones.jpg'
import React, {useState} from 'react'
import UploadDataHandlerE from "./UploadDataHandlerE"
import FetchHandler from "./FetchHandler"
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from '@tim-soft/react-dat-gui';
import { bytesToBase64 } from "./base64.js";
var fileListObjects = null;
var image_data = null;

export default class Emmmmmma extends React.Component {
    constructor() {
        super();
        
    this.handleUpdate = newData =>
    {
        this.setState(prevState => ({
      data: { ...prevState.data, ...newData }
    }))};

    }
    on_folder_uploaded_callback = async function(fileListObject) {
        fileListObjects = fileListObject;
        const DataModel = UploadDataHandlerE.getInstance();
        await DataModel.handleFolderUpload(fileListObject);
        image_data = DataModel.getImageData();
        

   
    // const tick_labels = ["Positive", "Negative"];
    // await LogRegClassifier.renderConfusionMatrix_utility(preds, pred_labels, confusion_container, tick_labels);

    
}
    on_fetch_button_callback = async function() {
       const Fetch = new FetchHandler(fileListObjects, image_data);
     var img_tensor = await Fetch.handleFetch(1,2);
     await Promise.all(Array.from({length: 9}, (_,idx)=> {

     var canvas_at_index = document.getElementById(`canvas: ${idx}`);
     var ctx_at_index = canvas_at_index.getContext("2d");
     var temp_canvas = document.createElement('canvas');
     // alright this promise will resolve when canvas is loaded with the tensorflow image
     tf.browser.toPixels(img_tensor, temp_canvas).then(()=>{
         ctx_at_index.drawImage(temp_canvas, 0, 0, canvas_at_index.width, canvas_at_index.height)
         temp_canvas.remove();

    
     })
     }));
        // )
    }
    state = {
        imageSources: new Array(9).fill(jones),
        data: {
            package: 'react-dat-gui',
            power: 9000,
            isAwesome: true,
            feelsLike: '#2FA1D6',
          },
        buttonsDisabled: true
    }

componentDidMount(){

};
componentWillUnmount(){};

handleUpdate = newData =>
this.setState(prevState => ({
  data: { ...prevState.data, ...newData }
}));

    render() {

        return (<div>

            <DatGui data={this.state.data} onUpdate={this.handleUpdate}>
                <DatString path='package' label='Package' />
                <DatNumber path='power' label='Power' min={9000} max={9999} step={1} />
                <DatBoolean path='isAwesome' label='Awesome?' />
                <DatColor path='feelsLike' label='Feels Like' />
            </DatGui>
                1
            

            <Grid container justify="center" spacing={2} style={{ backgroundColor: '#cfe8fc'}}>
                <Grid key={0} item>
                    <Button variant="contained" component="label"
                            onClick={()=>{console.log("Fetch!");this.on_fetch_button_callback();}}>Fetch</Button>
                </Grid>

                <Grid key={1} item>
                    <Button disabled={this.state.buttonsDisabled} variant="contained"
                            onClick={()=>console.log("Train!")}>Train</Button>
                </Grid>

                <Grid key={2} item>
                    <Button disabled={this.state.buttonsDisabled} variant="contained"
                            onClick={()=>console.log("Evaluate!")}>Evaluate</Button>    
                </Grid>

                <Grid key={3} item>
                    <Button variant="contained" component="label"
                            onClick={()=>console.log("Upload Folder!")}>
                        Upload Data
                        <input  type="file" 
                                hidden webkitdirectory="true" 
                                mozdirectory="true" 
                                msdirectory="true" 
                                odirectory="true" 
                                directory="true" 
                                multiple 
                                onChange = {(fileName) => this.on_folder_uploaded_callback(fileName)}
                                />
                    </Button>    
                </Grid>

                <Grid key={4} item>
                    
                    <Button disabled={this.state.buttonsDisabled} variant="contained"  component="label" onClick={()=>console.log("Download!")}>     
                        <a style={{color: 'black', textDecoration: 'none'}} href={jones} download="jones.jpg">        
                        Download
                        </a>
                    </Button>

                </Grid>
            </Grid>

            <Container  maxWidth="xs" spacing={0}> 
            
               
            
                <GridList cellHeight="auto" cols={3}>
                    {[0,1,2,3,4,5,6,7,8].map((tile_idx) => (
                    <GridListTile key={tile_idx} cols={ 1} spacing={0}>
                        <Button  onClick={()=>console.log(`Click Image: ${tile_idx}!`)}>
                            {/* <img  width={'100%'} src={this.state.imageSources[tile_idx]} alt={"jones"} /> */}
                            <canvas color="black" height="100%" width="100%" id={`canvas: ${tile_idx}`}></canvas>
                        </Button>
                    </GridListTile>
                    ))}
                </GridList>
            </Container>
        </div>)
    };
}