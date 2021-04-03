import { render } from "@testing-library/react"
import React from 'react'

export default class MainPOC extends React.Component {
    render(){
	console.log("dummy text");

        // JSX goes here:
        return (<div>
            <h2>dummy text</h2>
        </div>)
    };
}
