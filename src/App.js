import logo from './logo.svg';
import './App.css';

import * as tf from "@tensorflow/tfjs";
import * as dfd from "danfojs/src/index";
import * as lgreg from "ml-logistic-regression";
import * as prprcss from "ml-preprocess";

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
    </div>
  );
}

export default App;
