import React from 'react';
import moment from 'moment';
import './calendar.css';
import { Modal, Button } from 'antd';

export default class Calendar extends React.Component{

  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false,
    ModalText: makeEvent(),
    visible: false,
    confirmLoading: false,
  }

  constructor(props){
    super(props);
    this.width = props.width || '350px';
    this.style = props.style || {};
    this.style.width = this.width;

  }


  weekdays = moment.weekdays(); //days of the week (duh) obj
  weekdaysShort = moment.weekdaysShort(); //3 letter
  months = moment.months();

//for sheduling stuff
makeEvent = () => {
  return(
    
    <td key = {day} className = "week-day"> {day}</td>
  )
}
showModal = () => {
   this.setState({
     visible: true,
   });
 }

 handleOk = () => {
   this.setState({
     ModalText: 'You have scheduled an event',
     confirmLoading: true,
   });
   setTimeout(() => {
     this.setState({
       visible: false,
       confirmLoading: false,
     });
   }, 2000);
 }

 handleCancel = () => {
  console.log('Clicked cancel button');
  this.setState({
    visible: false,
  });
}

//functions to retrieve day/mo/yr
year = () => {
  return this.state.dateContext.format('Y');
}

month = () => {
  return this.state.dateContext.format('MMMM');
}

daysInMonth = () => {
  return this.state.dateContext.daysInMonth();
}

currentDate = () => {
  return this.state.dateContext.get('date');
}

currentDay = () => {
  return this.state.dateContext.format('D');
}

firstDayOfMonth = () => {
  let dateContext = this.state.dateContext;
  let firstDay = moment(dateContext).startOf('month').format('d'); //numeric val
  return firstDay;
}

// schedule = () =>{
//
//   console.log(this);
// }

onDayClick = (e, day) => {
    this.setState({
      selectedDay: day
    }, () => {
      console.log("SELECTED DAY: ", this.state.selectedDay);
    });

    this.props.onDayClick && this.props.onDayClick(e, day);
}

  render(){
    const { visible, confirmLoading, ModalText } = this.state; //for my modal
    let month = this.month();

    let weekdays = this.weekdaysShort.map((day) => {
      return(
        <td key = {day} className = "week-day"> {day}</td>
      )
    });

    let blanks = []; //days leading up to first of month
    for  (let i = 0; i < this.firstDayOfMonth(); i++){
      blanks.push(<td key =  {i * 50} className = "emptySlot">
        {''}
        </td>
      );
    }

    console.log('blanks: ', blanks);

    let daysInMonth = [];
    for(let d = 1; d<= this.daysInMonth(); d++){
      let className = (d == this.currentDay() ? 'day current-day': 'day');
      let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
      daysInMonth.push(
        <td key={d} className={className + selectedClass} >
          <span onClick={(e)=>{this.showModal()}}>{d}</span>
        </td>
      );
    }

    //let trElems = [];

    console.log("days: ", daysInMonth);

    var totalSlots = [...blanks, ...daysInMonth]; //total num of boxes for month
    let rows = [];
    let cells = [];

      totalSlots.forEach((row, i) => {
        if((i % 7) != 0){
          cells.push(row);
        } else{
          let insertRow = cells.slice(); //create new array of rows in insertRow
          rows.push(insertRow);
          cells = [];
          cells.push(row);
        }
        if(i == totalSlots.length - 1){
          let insertRow = cells.slice();
          rows.push(insertRow);
        }
      });

      let trElems = rows.map((d, i) =>{
        return(
          <tr key = {i*100} >
            {d}
          </tr>
        );
      })

    return(
      <div className = "calendar-container" style = {this.style}>
      <h2> {month}</h2>
      <Modal title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
        <table className = "calendar">
          <thead>
            <tr className = "calendar-header">
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekdays}
            </tr>
            {trElems}
          </tbody>
        </table>
      </div>
    );
  }
}
