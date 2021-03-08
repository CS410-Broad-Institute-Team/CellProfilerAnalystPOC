import logo from './logo.svg';
import './App.css';

import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
import * as prprcss from "ml-preprocess";

import EmmaComponent from "./components/Emma"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import raw from "./example_SETUP.SQL";

function App() {
  // file read callback
  var showFile = async (fileName) => {
    fileName.preventDefault()
    const reader = new FileReader()
    reader.onload = async (fileName) => { 
      const text = (fileName.target.result)
      console.log(text)
      alert(text)
    };
    reader.readAsText(fileName.target.files[0])
  }	

  fetch(raw)
	.then(r => r.text())
	.then(text => {
		return text.split("\n");
	})
	.then(lines => {
		console.log(lines.indexOf("CREATE TABLE per_object \("));
		console.log(lines.indexOf(" PRIMARY KEY  \(ImageNumber,ObjectNumber\)"));
	})


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          woo the atom thingy do the rotate woo yea
        </p>
	<input type="file" onChange = {(fileName) => showFile(fileName)} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      
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
          </Switch>
        </div>
      </Router>


    </div>

  );
}

function Yahiya() {
  return (
    <div>
      <h2>Yahiya</h2>
    </div>
  );
}

function Alex() {
  return (
    <div>
      <h2>Alex</h2>
    </div>
  );
}

function Emma() {
  return <EmmaComponent></EmmaComponent>
}

export default App;
