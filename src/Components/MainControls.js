import React, { Component } from 'react';
import '../scss/MainControls.css';

export default class MainControls extends Component {
  render () {
    return (
      <div className="mainControls">
        <input type="date" id="chooseDate"></input>
        <input type="button" className="mainButton addDayBtn" value="Dodaj dzień"></input>
        <input type="button" className="mainButton saveToFileBtn" value="Save to File"></input>
        <input type="file" name="getFile" id="fileInput" accept="text/plain"></input>
        <button tabIndex="-1" className="mainButton loadFromFileBtn"><label htmlFor="fileInput">Load from
                File</label></button>
      </div>
    );
  }
}
