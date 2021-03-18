// import logo from './logo.svg';
import './App.css';

import EmmaComponent from "./components/Emma"

import YahiyaComponent from "./components/Yahiya"

import BellaComponent from "./components/Bella"
import AbbyComponent from "./components/Abby"
import AlexComponent from "./components/Alex"

import ProofOfConceptComponent from "./components/ProofOfConcept"

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
              <Link to="/ProofOfConcept">Proof Of Concept</Link>
            </li>
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
            <Route exact path="/ProofOfConcept">
              <ProofOfConcept/>
            </Route>
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
function ProofOfConcept() {
  return <ProofOfConceptComponent></ProofOfConceptComponent>
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