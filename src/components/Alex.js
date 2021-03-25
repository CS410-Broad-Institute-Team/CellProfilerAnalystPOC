import { render } from "@testing-library/react"
import React from 'react'

export default class Alex extends React.Component {
    state = {

    };

    componentDidMount(){};
    componentWillUnmount(){};
    render(){

	console.log("function start?");

        // TODO: stubbed, all API-reliant calls to be commented in
	let new_cell_indices = [];
	num_checked = 0;

	    /*
        while(new_cell_indices.length < 50) {

		num_checked += 50;

		// fetch random_cells here
		let random_cells = [];

		// fetch cell_features
		let cell_features = [];

		// fetch predicted_labels
		let predicted_labels = [];
		
		// only here for the sake of the conditional
		let dummy = 1;

		if (dummy) {
			// not entirely sure on what the Python implementation did, but
			// this looks close enough?
			let positive_cells = [];
			for (int i = 0; i < random_cells.length; i++) {
				if (predicted_labels[i] == 1)
					positive_cells.push(random_cells[i]);
			}

			new_cell_indices.push(positive_cells);
		}
	}
	*/

        console.log("function end?");

        // JSX goes here:
        return (<div>
            <h2>dummy text</h2>
        </div>)
    };
}
