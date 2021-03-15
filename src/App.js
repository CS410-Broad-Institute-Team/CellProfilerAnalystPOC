// import logo from './logo.svg';
import './App.css';
// import { useState } from 'react';
// import * as tf from "@tensorflow/tfjs";
// import * as dfd from "danfojs/src/index";
// import * as lgreg from "ml-logistic-regression";
// import * as prprcss from "ml-preprocess";
// import Papa from "papaparse";
import raw from "./example_SETUP.SQL"; 

import EmmaComponent from "./components/Emma"

import YahiyaComponent from "./components/Yahiya"

import BellaComponent from "./components/Bella"
import AbbyComponent from "./components/Abby"
import AlexComponent from "./components/Alex"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {


  var setup_lines = null;
  var create_index = null;
  var end_index = null;
  var column_lines = null;

  fetch(raw)
	.then(r => r.text())
	.then(text => {
		return text.split("\n").map((x)=>x.trim());
	})
	.then(lines => {
		// console.log(lines.indexOf("CREATE TABLE per_object \("));
    // console.log(lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"));
    setup_lines = lines;
    create_index = lines.indexOf("CREATE TABLE per_object (");
    end_index = lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)");
    column_lines = lines.slice(create_index + 1, end_index);
    // console.log(column_lines);

   // console.log(lines[1287]);
   // console.log(lines[1287] === "PRIMARY KEY  (ImageNumber,ObjectNumber)")
		//console.log(lines.indexOf(" PRIMARY KEY  \(ImageNumber,ObjectNumber\)"));
	});

  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/Yahiya">Yahiya</Link>
            </li>
            <li>
              <Link to="/Alex">Alex</Link>
            </li>
            <li>
              <Link to="/Emma">Emma</Link>
            </li>
            <li>

              <Link to="/Bella">Bella</Link>

            </li>
            <li>
            <Link to="/Abby">Abby</Link>
            </li>
          </ul>

          <hr />

          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/Yahiya">
              <Yahiya />
            </Route>
            <Route path="/Alex">
              <Alex />
            </Route>
            <Route path="/Emma">
            <Emma />
            </Route>
            <Route path="/Abby">
            <Abby />
            </Route>
            <Route path="/Bella">
              <Bella />
            </Route>
          </Switch>
        </div>
      </Router>


    </div>

  );
}

function Yahiya() {
  return <YahiyaComponent></YahiyaComponent>
}

function Alex() {
  return <AlexComponent></AlexComponent>
}

function Emma() {
  return <EmmaComponent></EmmaComponent>
}
function Bella() {
  return <BellaComponent></BellaComponent>
}



function Abby() {
  return <AbbyComponent></AbbyComponent>
}

export default App;