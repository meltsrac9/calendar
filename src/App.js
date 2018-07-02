import React, { Component } from 'react';

import "./App.css";

import Calendar from './components/calendar';


const style = {
  position: 'relative',
  margin: '50px auto'
}
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Calendar style = {style} width = '300px' />
      </div>
    );
  }
}

export default App;
