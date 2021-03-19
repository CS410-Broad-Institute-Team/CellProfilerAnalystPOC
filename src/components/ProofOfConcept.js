import { render } from "@testing-library/react"
import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Papa from 'papaparse'
import jones from '../jones.jpg'
import { findRenderedComponentWithType } from "react-dom/test-utils";

// modified from emma.js


export default class ProofOfConcept extends React.Component {

    constructor(){
        super();
        Papa.parsePromise = function(file, config) {
            return new Promise(function(complete, error) {
              Papa.parse(file, {...config, complete, error});
            });
        };
    }
    
    state = {
        imageSources: new Array(9).fill(jones)
    }

    // modified from emma.js  
    findFileIndex (fileListObject, fileName) {
        var index = Array.from(fileListObject.target.files).findIndex((elem) => {
            return elem.name === fileName;
        });
        return index;
    }


    fileReaderPromiseImage(fileListObject, fileIndex) {
        return new Promise((resolve, reject)=> {
            var fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result)
            };
            fr.readAsDataURL(fileListObject.target.files[fileIndex])
        })
    }

    fileReaderPromiseText(fileListObject, fileIndex) {
        return new Promise((resolve, reject)=> {
            var fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result)
            };
            fr.readAsText(fileListObject.target.files[fileIndex])
        })
    }


    on_folder_uploaded_callback = async function(fileListObject) {
        console.log("folder upload done!")
    

        Promise.all(Array.from({length: 9}, (_,idx)=>
        // the 6th item is an image and a lot of items after are images, obviously we need a better implementation lol
            this.fileReaderPromiseImage(fileListObject, idx+6).then(img=>{
                this.state.imageSources[idx] = img;
                this.setState({imageSources: this.state.imageSources})
            }
        )))
        .then(()=>console.log("Finished Loading Images"))



        const object_csv_index = this.findFileIndex(fileListObject, "per_object.csv");
        this.object_data = await Papa.parsePromise(fileListObject.target.files[object_csv_index],
            {
                worker: true,
                skipEmptyLines: true,
                // we're lucky there are no strings
                fastMode: true, 
                dynamicTyping: true,
            }    
        )
        .then((result)=> result.data)
        console.log("Finished Loading Object Data")
        
        const image_csv_index = this.findFileIndex(fileListObject, "per_image.csv");
        this.image_data = await Papa.parsePromise(fileListObject.target.files[image_csv_index],
            {
                worker: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            }    
        )
        .then((result)=> result.data)
        console.log("Finished Loading image Data")

        const setup_sql_index = this.findFileIndex(fileListObject, "example_SETUP.SQL");
        this.image_data = await Papa.parsePromise(fileListObject.target.files[setup_sql_index],
            {
                worker: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            }    
        )
        // .then((result)=> result.data.map(e=>e.trim()))
        console.log("Finished Loading image Data")
    
    }
    

    componentDidMount(){};
    componentWillUnmount(){};
    render(){


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