import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
import * as prprcss from "ml-preprocess";
import Papa from "papaparse";

import EmmaComponent from "./components/Emma"
import YahiyaComponent from "./components/Yahiya"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {

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
  return <YahiyaComponent></YahiyaComponent>
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
