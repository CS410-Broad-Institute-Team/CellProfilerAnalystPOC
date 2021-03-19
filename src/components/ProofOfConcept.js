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
import { Matrix } from 'ml-matrix';
import {normal} from 'ml-preprocess';
import LogisticRegression, * as lgreg from "ml-logistic-regression";
// modified from emma.js




export default class ProofOfConcept extends React.Component {

    constructor(){
        super();
        Papa.parsePromise = function(file, config) {
            return new Promise(function(complete, error) {
              Papa.parse(file, {...config, complete, error});
            });
        };

        Array.prototype.sliceByValue = function (value1, value2) {
            const index1 = this.indexOf(value1);
            const index2 = this.indexOf(value2);

            if (value1 === -1 || value2 === -1) {
                console.error("Values not found to slice");
                return null;
            }
        
            return this.slice(index1, index2);
        }

        

        this.basicPapaConfig = {
            worker: true,
            skipEmptyLines: true,
            dynamicTyping: true
        }
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
            {...this.basicPapaConfig, fastMode: true } // luckily it has no quotes so we can use fastmode
        )
        .then((result)=> result.data)
        console.log("Finished Loading Object Data")
        
        const image_csv_index = this.findFileIndex(fileListObject, "per_image.csv");
        this.image_data = await Papa.parsePromise(fileListObject.target.files[image_csv_index],
            this.basicPapaConfig
        )
        .then((result)=> result.data)
        console.log("Finished Loading image Data")

        const setup_sql_index = this.findFileIndex(fileListObject, "example_SETUP.SQL");
        this.setup_lines = await Papa.parsePromise(fileListObject.target.files[setup_sql_index],
            {...this.basicPapaConfig, delimiter: ',' }    
        )
        .then((result)=> result.data.map(e=>e[0].trim()))
        console.log("Finished Loading image Data")

        const training_data_index = this.findFileIndex(fileListObject, "MyTrainingSet.txt");
        this.training_data = await Papa.parsePromise(fileListObject.target.files[training_data_index],
            {...this.basicPapaConfig, delimiter: " ", comments: "#" }
        )
        .then((result)=>result.data.slice(1));

        this.labeled_cells = this.training_data.map(training_row=>{
            return this.object_data.find((data_row)=>data_row[0] === training_row[1] && data_row[1] === training_row[2]);
        });

        this.object_column_lines = this.setup_lines.sliceByValue(
            "CREATE TABLE per_object (", "PRIMARY KEY  (ImageNumber,ObjectNumber)"
        );
        this.object_column_names = this.object_column_lines.map((name)=>name.split(' ')[0]);
        console.log(this.object_column_names)

        this.image_column_lines = this.setup_lines.sliceByValue(
            "CREATE TABLE per_image (", "PRIMARY KEY  (ImageNumber)"
        );
        this.image_column_names = this.image_column_lines.map((name)=>name.split(' ')[0]);
        this.training_data_column_names = "label imagenum objectnum x y".split(" ")
        console.log(this.image_column_names)

     
        this.object_features_to_use = this.object_column_lines.filter((elem)=>!elem.includes("Location"));
        this.object_features_to_use_indices = this.object_features_to_use.map((elem)=>this.object_column_lines.indexOf(elem));
        this.image_features_to_use = this.image_column_lines.filter((elem)=>!elem.includes("Location"));
        this.image_features_to_use_indices = this.image_features_to_use.map((elem)=>this.image_column_lines.indexOf(elem));

        
        this.labeled_features = this.labeled_cells.map(row=>{
            return this.object_features_to_use_indices.map((idx)=>row[idx]);
        })

        console.log(this.training_data.map((row)=> row[0]==='positive'? 1:0));
        this.labels = new Matrix([this.training_data.map((row)=> row[0]==='positive'? 1:0)]);

        this.standardized_features = new Matrix(normal(this.labeled_features));

        this.classifier = new LogisticRegression({ numSteps: 1000, learningRate: 5e-3 });

        this.classifier.train(this.standardized_features, this.labels);
        console.log(this.labeled_features);
        console.log(normal(this.labeled_features))
        console.log(new Matrix(this.labeled_features));
        console.log(this.standardized_features)
        console.log(this.classifier.predict(this.standardized_features));

    
    }
    
    on_fetch_button_callback() {
        const SAMPLES_NEEDED = 9;
        const SAMPLES_PER_PREDICT = 20;
        var sample_count = 0;

        var data_samples = [];
        console.log("fetching...");

        while (sample_count < 9) {
            const randDataIndices = Array(SAMPLES_PER_PREDICT).fill(0).map(()=>Math.floor(Math.random() * this.object_data.length));
            const cell_features = randDataIndices.map((data_idx)=>this.object_features_to_use_indices.map((feature_idx)=>this.object_data[data_idx][feature_idx]));
            const predicted_labels = this.classifier.predict(new Matrix(normal(cell_features)))
            console.log(predicted_labels);

            const positive_cells = predicted_labels.filter(x=>x===1);
            if (positive_cells.length > 0) {
                data_samples.concat(positive_cells);
                if (data_samples.length >= SAMPLES_NEEDED) {
                    console.log(data_samples);
                    return;
                }             
            }
            console.log("found no positive cells, looping...")
        }
    }

    componentDidMount(){};
    componentWillUnmount(){};
    render(){


        // JSX goes here:
        return (<div>

            <Grid container justify="center" spacing={2} style={{ backgroundColor: '#cfe8fc'}}>
                <Grid key={0} item>
                    <Button variant="contained"
                            onClick={()=>{console.log("Fetch!");this.on_fetch_button_callback();}}>Fetch</Button>
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