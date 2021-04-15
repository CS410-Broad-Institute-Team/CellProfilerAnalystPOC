import { Container, Row, Col} from "reactstrap";
<<<<<<< HEAD
import {Box, Button, Grid, IconButton, GridList, GridListTile }from '@material-ui/core'; 
=======
import {Box, Button, Grid, IconButton,GridList, GridListTile }from '@material-ui/core'; 
>>>>>>> cec55257eb9f8f14754f987329aba67734139f97
import logo from '../CPA_newlogo.png';
import {Image, Dropdown, DropdownButton} from 'react-bootstrap'
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import jones from '../jones.jpg'
<<<<<<< HEAD

import ReactDOM from "react-dom";

=======
>>>>>>> cec55257eb9f8f14754f987329aba67734139f97
import React from 'react';
import "bootstrap/dist/css/bootstrap.css";




export default class Bella extends React.Component {
     
        state = {
        };

        componentDidMount(){};
        componentWillUnmount(){};



         
    render(){     
     
        return( 
            <div>
          
            <Row>
            <Col >
            <IconButton style={{color: "black", marginLeft:700}}> <SaveAltIcon /></IconButton> 
            </Col>
            
            <Col>
            <Image src={logo} style={{paddingRight:1000 , height:'90px'}}></Image>
            </Col>
            </Row>
            <Row>
            <Grid container justify="center" spacing={2} style={{marginBottom: 15}}>
           
            <Grid key={0} item>
            <DropdownButton variant="secondary" title= "Fetch">
            
             <Dropdown.Item >Positive</Dropdown.Item>
             <Dropdown.Item >Negative</Dropdown.Item>
             <Dropdown.Item >Random</Dropdown.Item>
            
            </DropdownButton>
        </Grid>


            <Grid key={1} item>
            <Button variant="contained">Train</Button>
            </Grid>

            <Grid key={2} item>
            <Button variant="contained">Evulate</Button>
            </Grid>
        </Grid>
        </Row>
        

            <Row>
            <Col md= {12} >
            <Box  style = {{backgroundColor: 'black', color: 'white', height: '93%', marginBottom: 25, textAlign: "left", paddingLeft:"5px"}}> Unclassified 
            
      
                    <GridList  cellHeight="auto" cols={5} >
                        {[0,1,2,3,4,5,6,7,8,9].map((tile) => (
                                    <GridListTile  key={tile} cols={ 1} spacing={0} > 
                                        <Button >
                                            <img  width={'100%'} src={jones} />
                                        </Button>       
                                        </GridListTile>    
                                    ))}        
                        </GridList>
               
        
                
                    </Box>
            
            </Col>
            </Row>
            
            <Row>
            <Col xs={6} >
            
 
            <Box style = {{backgroundColor: 'black', color: 'white',  marginBottom: 20, textAlign: "left", paddingLeft:"5px", height: '100%'}}> Positive
            
        
             
                    <GridList  cellHeight="auto" cols={3} >
                    {[0,1,2,3,4,5,6,7,8].map((tile) => (
                                <GridListTile key={tile} cols={ 1} spacing={0} > 
                                    <Button >
                                        <img  width={'100%'}  />
                                    </Button>       
                                    </GridListTile>
                                    ))}
                        </GridList>
                   
              
            
            </Box>
          
           
            </Col>
            <Col xs={6} >
           
           
            <Box style = {{backgroundColor: 'black', color: 'white', marginBottom: 20, textAlign: "left", paddingLeft:"5px", height: '100%'}}> Negative 
            <GridList cellHeight="auto" cols={3} >
            {[0,1,2,3,4,5,6,7,8].map((tile) => (
                        <GridListTile key={tile} cols={ 1} spacing={0} > 
                            <Button >
                                <img  width={'100%'} />
                            </Button>       
                            </GridListTile>
                            ))}
                </GridList>
            
            </Box>
          
            
            </Col>
            </Row>
        
           
      
        
        </div>)

        };
    }
