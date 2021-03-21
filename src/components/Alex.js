import { render } from "@testing-library/react"
import React from 'react'

export default class Alex extends React.Component {
    state = {

    };

    componentDidMount(){};
    componentWillUnmount(){};
    render(){

        // your javascript goes here:
        console.log("hi there");

        // JSX goes here:
        return (<div>
            <h2>Alex</h2>
            <p>Alex stuff</p>
        </div>)
    };
}