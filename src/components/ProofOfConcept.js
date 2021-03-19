import { render } from "@testing-library/react"
import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import jones from '../jones.jpg'
import { findRenderedComponentWithType } from "react-dom/test-utils";



export default class ProofOfConcept extends React.Component {

    
    state = {
        imageSources: new Array(9).fill(jones)
    }

    async fileReaderPromiseImage(fileName, fileIndex) {
        return new Promise((resolve, reject)=> {
            var fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result)
            };
            fr.readAsDataURL(fileName.target.files[fileIndex])
        })
    }

    on_folder_uploaded_callback = function(fileName) {
        console.log("folder upload done!")
    

        Promise.all(Array.from({length: 9}, (_,idx)=>
            this.fileReaderPromiseImage(fileName, idx+6).then(img=>{
                this.state.imageSources[idx] = img;
                this.setState({imageSources: this.state.imageSources})
            }
        )))
        .then(()=>console.log("Finished Loading Images"))

        // const imageReader = new FileReader()
        //     imageReader.onload = async (fileName) => { 
        //         console.log(fileName.target.result);
    
        //         this.state.imageSources[0] = fileName.target.result;
    
        //         this.setState({imageSources: this.state.imageSources})
        //         };
        //     // start the reading of the image
    
    
    
        //     imageReader.readAsDataURL(fileName.target.files[6]);

            
    
    }

    componentDidMount(){};
    componentWillUnmount(){};
    render(){

        // your javascript goes here:
        console.log("hi there");
        console.log(this.state.imageSources)

        // JSX goes here:
        return (<div>

            <Grid container justify="center" spacing={2} style={{ backgroundColor: '#cfe8fc'}}>
                <Grid key={0} item>
                    <Button variant="contained"
                            onClick={()=>console.log("Fetch!")}>Fetch</Button>
                </Grid>

                <Grid key={1} item>
                    <Button variant="contained"
                            onClick={()=>console.log("Train!")}>Train</Button>
                </Grid>

                <Grid key={2} item>
                    <Button variant="contained"
                            onClick={()=>console.log("Evaluate!")}>Evaluate</Button>    
                </Grid>

                <Grid key={3} item>
                    <Button variant="contained" component="label"
                            onClick={()=>console.log("Upload!")}>
                        Upload
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
            </Grid>

            <Container  maxWidth="sm" spacing={0}>    
                <GridList cellHeight="auto" cols={3}>
                    {[0,1,2,3,4,5,6,7,8].map((tile) => (
                    <GridListTile key={tile} cols={ 1} spacing={0}>
                        <Button onClick={()=>console.log(`Click Image: ${tile}!`)}>
                            <img  width={'100%'} src={this.state.imageSources[tile]} alt={"jones"} />
                        </Button>
                    </GridListTile>
                    ))}
                </GridList>
            </Container>
        </div>)
    };
}