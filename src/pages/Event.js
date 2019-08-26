import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../Components/Header";
import ListEvent from './ListEvent'
class Event extends React.Component {
  state = {
    data:[],
    error: null
  
  }

  async componentDidMount(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try{
      const res = await fetch("http://eventos.test/api/v1/evento",{
        headers: myHeaders
      })
      const data = await res.json()
     
      this.setState({
        data  
      })
    }catch (error){
        this.setState({
          error
        })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <ListEvent
        events= {this.state.data}
        />
      </React.Fragment>
    );
  }
}

export default Event;