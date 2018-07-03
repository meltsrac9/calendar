import React, { Component } from 'react';
import { Modal, Button } from 'antd';


import "./App.css";

import Calendar from './components/calendar';


const style = {
  position: 'relative',
  margin: '50px auto'
}
class App extends React.Component {


  onDayClick = (e, day) => {
    this.showModal();
  }

  render() {
    return (
      <div className="App">
        <Calendar style = {style} width = '300px'
        onDayClick = {(e, day) => this.onDayClick(e,day)} />
      </div>
    );
  }
}

export default App;
