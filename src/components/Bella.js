import { render } from "@testing-library/react"
import React from 'react';

export default class Bella extends React.Component {
    state = {

    };

    componentDidMount(){};
    componentWillUnmount(){};
    
    render(){
        console.log("hello woorld?");
        return(<div>
            <p>Bella is here </p>
        </div>)
    };
}