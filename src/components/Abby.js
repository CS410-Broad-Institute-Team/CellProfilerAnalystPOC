import { render } from "@testing-library/react"
import React from 'react';

export default class Abby extends React.Component {
    state = {

    };

    componentDidMount(){};
    componentWillUnmount(){};
    
    render(){
        console.log("hello world");
        return (<div>
            <p>Abby</p>
          </div>)

    };
}