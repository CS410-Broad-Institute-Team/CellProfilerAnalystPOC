import logo from './logo.svg';
import './App.css';

import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
import * as prprcss from "ml-preprocess";

import EmmaComponent from "./components/Emma"
import EmmanuelComponent from "./components/Emmanuel"
import BellaComponent from "./components/Bella"
import AbbyComponent from "./components/Abby"
import ProofOfConceptComponent from "./components/ProofOfConcept"
import YahiyaHomeComponent from "./components/YahiyaTesting/YahiyaHome.js"
import EmmmmmmaComponent from "./components/CaveOfEmma/Emmmmmma.js"
import BelladndTestComponent from "./components/BelladndTest.js"





import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// import raw from "./example_SETUP.SQL";

function App() {
  // file read callback
  // var showFile = async (fileName) => {
  //   fileName.preventDefault()
  //   const reader = new FileReader()
  //   reader.onload = async (fileName) => { 
  //     const text = (fileName.target.result)
  //     console.log(text)
  //     alert(text)
  //   };
  //   reader.readAsText(fileName.target.files[0])
  // }	
  // var setup_lines = null;
  // var create_index = null;
  // var end_index = null;
  // var column_lines = null;

  // fetch(raw)
	// .then(r => r.text())
	// .then(text => {
	// 	return text.split("\n").map((x)=>x.trim());
	// })
	// .then(lines => {
	// 	console.log(lines.indexOf("CREATE TABLE per_object \("));
  //   console.log(lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"));
  //   setup_lines = lines;
  //   create_index = lines.indexOf("CREATE TABLE per_object \(");
  //   end_index = lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)");
  //   column_lines = lines.slice(create_index + 1, end_index);
  //   console.log(column_lines);

  //  // console.log(lines[1287]);
  //  // console.log(lines[1287] === "PRIMARY KEY  (ImageNumber,ObjectNumber)")
	// 	//console.log(lines.indexOf(" PRIMARY KEY  \(ImageNumber,ObjectNumber\)"));
	// })


  return (
    
    <div className="App">
      

    
          
      


      {/* <header className="App-header">
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
      </header> */}

      
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
              <Link to="/Emmanuel">Emmanuel</Link>
            </li>
            <li>
              <Link to="/ProofOfConcept">ProofOfConcept</Link>
            </li>
            <li>
              <Link to="/Bella">Bella</Link>
            </li>
            <li>
                <Link to="/Emmmmmma">Emmmmmma</Link>
            </li>
            <li>
                <Link to="/ProofOfConcept">ProofOfConcept</Link>
            </li>
            <li>
                <Link to="/YahiyaHome">Yahiya's Home of Testing</Link>
            </li>
            <li>
                <Link to="/BelladndTest">BelladndTest</Link>
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
            <Route path="/Emmmmmma">
              <Emmmmmma />
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
            <Route path="/ProofOfConcept">
              <ProofOfConcept />
            </Route>
            <Route path="/Emmanuel">
              <Emmanuel />
            </Route>
            <Route path="/YahiyaHome">
              <YahiyaHomeComponent></YahiyaHomeComponent>
            </Route>
            <Route path="/BelladndTest">
              <BelladndTest />
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

// TODO: stubbed for now, fix later
function Alex() {
	/*
  return (
    <div>
      <h2>dummy text</h2>
    </div>
  );
  */
  return <h2>the</h2>
}

function Emma() {
  return <EmmaComponent></EmmaComponent>
}
function Bella() {
  return <BellaComponent></BellaComponent>
}

function ProofOfConcept() {
  return <ProofOfConceptComponent></ProofOfConceptComponent>
}
function YahiyaHome() {
  return <YahiyaHomeComponent></YahiyaHomeComponent>
}
function Emmmmmma() {
  return <EmmmmmmaComponent></EmmmmmmaComponent>
}
function Abby() {
  return <AbbyComponent></AbbyComponent>
}
function BelladndTest() {
  return <BelladndTestComponent></BelladndTestComponent>
}

function Emmanuel() {
  return <EmmanuelComponent></EmmanuelComponent>
}

export default App;
