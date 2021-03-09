import { render } from "@testing-library/react"
import raw from "../example_SETUP.SQL";
import React from 'react';
export default class Emma extends React.Component {
  state = {

  };

  componentDidMount(){};
  componentWillUnmount(){};
  render(){


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
        console.log(lines.indexOf("CREATE TABLE per_object \("));
        console.log(lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)"));
        setup_lines = lines;
        create_index = lines.indexOf("CREATE TABLE per_object \(");
        end_index = lines.indexOf("PRIMARY KEY  (ImageNumber,ObjectNumber)");
        column_lines = lines.slice(create_index + 1, end_index);
        console.log(column_lines);

      // console.log(lines[1287]);
      // console.log(lines[1287] === "PRIMARY KEY  (ImageNumber,ObjectNumber)")
        //console.log(lines.indexOf(" PRIMARY KEY  \(ImageNumber,ObjectNumber\)"));
      })
      return (
          <div>
            <h2>Emma</h2>
            <p>Emma Stuff</p>
          </div>
        );
  };
}