import { render } from "@testing-library/react"
//import React from 'react';
//import Button from '@material-ui/core/Button'



import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import Grid from '@material-ui/core/Grid';
import {Box, Button, Grid, IconButton}from '@material-ui/core'; 
import { positions } from '@material-ui/system';
import { FlipLeftRight } from "@tensorflow/tfjs";


import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {

    margin: theme.spacing(0),
    //flex: '1 1 auto',
    //marginLeft:587,
    
    
    
    
  },
  paper: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    textAlign: "left",
    padding: theme.spacing(8),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));





export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div >
        {/* <Button variant="contained"
            onClick={()=>{console.log("Fetch!");}}>Fetch</Button>
        <Button variant="contained"
            onClick={()=>{console.log("Fetch!");}}>Train</Button>
        <Button variant="contained"
            onClick={()=>{console.log("Fetch!");}}>Evaluate</Button> */}
      <Grid container justify="flex-end">
      <IconButton variant="contained" component="label" className={classes.root}
                            onClick={()=>console.log("upload!")} > <CloudUploadIcon/>
                            
                            <input  type="file" 
                                hidden webkitdirectory="true" 
                                mozdirectory="true" 
                                msdirectory="true" 
                                odirectory="true" 
                                directory="true" 
                                multiple 
                                onChange = {(fileName) => this.on_folder_uploaded_callback(fileName)}
                                />
                            </IconButton> 
      
      <IconButton variant="contained" component="label"
                            onClick={()=>console.log("Save!")}><SaveAltIcon />
                        
                        <input  type="file" 
                                hidden webkitdirectory="true" 
                                mozdirectory="true" 
                                msdirectory="true" 
                                odirectory="true" 
                                directory="true" 
                                multiple 
                                onChange = {(fileName) => this.on_folder_uploaded_callback(fileName)}
                                />
                    </IconButton>  
                    </Grid>             
                    
            

      {/* <Grid container spacing={5}>
        <Grid item xs={12}>
          <Box className={classes.paper}>Unclassified</Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Negative</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Positive</Paper>
        </Grid> 
        
      </Grid> */}

      
    </div>
    
  );
}



// export default class Abby extends React.Component {
//     state = {

//     };

    
//     componentDidMount(){};
//     componentWillUnmount(){};
    
//     render(){
//         console.log("hello world");
//         return (
//             <div>
//                 <Button variant="contained" color="grey" Fetch> Fetch
//         </Button>
//         <Button variant="contained" color="grey" Fetch> Fetch
//         </Button>
//         <Button variant="contained" color="grey" Fetch> Fetch
//         </Button>
            





//             </div>)

//     };
// }

