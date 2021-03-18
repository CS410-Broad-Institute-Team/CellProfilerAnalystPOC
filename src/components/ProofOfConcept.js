import { render } from "@testing-library/react"
import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import jones from '../jones.jpg'

export default class ProofOfConcept extends React.Component {
    state = {

    };

    componentDidMount(){};
    componentWillUnmount(){};
    render(){

        // your javascript goes here:
        console.log("hi there");

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
            </Grid>

            <Container  maxWidth="sm">
                
            <GridList cellHeight={160} cols={3}>
                {[0,1,2,3,4,5,6,7,8].map((tile) => (
                <GridListTile key={tile} cols={ 1}>
                    <Button 
                            onClick={()=>console.log(`Click Image: ${tile}!`)}>
                        <img  width={'100%'} src={jones} alt={"jones"} />
                    </Button>
                </GridListTile>
                ))}
            </GridList>
                

            </Container>
        </div>)
    };
}