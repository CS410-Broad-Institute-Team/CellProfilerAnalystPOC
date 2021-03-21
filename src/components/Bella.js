import { render } from "@testing-library/react"
import React from 'react';
import { Container, Row, Col} from "reactstrap";
import {Box, Button, Grid, IconButton }from '@material-ui/core'; 
import logo from '../CPA_newlogo.png';
import Image from 'react-bootstrap/Image'
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';




import "bootstrap/dist/css/bootstrap.css";



export default class Bella extends React.Component {
    state = {

    };

    componentDidMount(){};
    componentWillUnmount(){};
    
    render(){
        
        return( 
        <div>
        <Container> 

        <Row>
        <Col >
         <IconButton style={{color: "black", marginLeft:587}}> <SaveAltIcon /></IconButton> 
         </Col>
        <Col >
         <IconButton style={{color: "black" , marginLeft: -65}}> <CloseIcon /></IconButton> 
         </Col>
         
         <Col>
         <Image src={logo} style={{paddingRight:1000 , height:'90px'}}></Image>
         </Col>
        </Row>
        <Row>
        <Grid container justify="center" spacing={2} style={{marginBottom: 15}}>
       
        <Grid key={0} item>
        <Button variant="contained">Fetch</Button>
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
          <Box style = {{backgroundColor: 'black', color: 'white', height: 200, marginBottom: 20, textAlign: "left", paddingLeft:"5px"}}> Unclassified </Box>
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