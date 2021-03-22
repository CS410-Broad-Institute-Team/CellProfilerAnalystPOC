import { render } from "@testing-library/react"
import React from 'react';
import { Container, Row, Col} from "reactstrap";
import {Box, Button, Grid, IconButton,GridList, GridListTile, withStyles, Menu, MenuItem, ListItemText }from '@material-ui/core'; 
import logo from '../CPA_newlogo.png';
import Image from 'react-bootstrap/Image'
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import jones from '../jones.jpg'

import "bootstrap/dist/css/bootstrap.css";



export default class Bella extends React.Component {
    constructor(){
        super();
        
        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        }
        showMenu(event) {
            event.preventDefault();
            
            this.setState({ showMenu: true }, () => {
            //  document.addEventListener('click', this.closeMenu);
            });
      
        }

        closeMenu() {
           
                this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);  
            });
          
        }
    

        componentDidMount(){};
        componentWillUnmount(){};
       
      
        
    render(){     
     
        return( 
            <div>
            <Container> 
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
            <Button variant="contained" onClick={this.showMenu} >Fetch</Button>
            {
            this.state.showMenu
            ?
            (
                <div> 
     
                <MenuItem>
                <ListItemText primary="Positive" />
                </MenuItem>
                <MenuItem>
                <ListItemText primary="Negitive" />
                </MenuItem>
                <MenuItem>
                <ListItemText primary="Random" />
                </MenuItem>
                
            </div>
            ) : (null)
            } 
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
            <Box style = {{backgroundColor: 'black', color: 'white', height: 200, marginBottom: 20, textAlign: "left", paddingLeft:"5px"}}> Unclassified 
            
            <GridList cellHeight="auto" cols={5}>
            {[0,1,2,3,4,5,6,7,8, 9].map((tile) => (
                        <GridListTile key={tile} cols={ 1} spacing={0}>
                            <Button onClick={()=>console.log()}>
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
            <Box style = {{backgroundColor: 'black', color: 'white', height: 200, marginBottom: 20, textAlign: "left", paddingLeft:"5px"}}> Positive</Box>
            </Col>
            <Col xs={6} >
            <Box style = {{backgroundColor: 'black', color: 'white', height: 200, marginBottom: 20, textAlign: "left", paddingLeft:"5px" }}> Negative </Box>
            </Col>
            </Row>
        </Container>
        
        </div>)

        };
    }
