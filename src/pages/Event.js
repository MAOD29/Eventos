import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loading from '../Components/Loading'

import ListEvent from './ListEvent'
class Event extends React.Component {
  state = {
    data:[],
    error: null,
    loading:true
  
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
        data,
        loading:false  
      })
    }catch (error){
        this.setState({
          error
        })
    }
  }

  render() {
    console.log(  localStorage.getItem('myData'))
    if(this.state.loading){
      return <Loading/>
    }
    return (
      <React.Fragment>
        <ListEvent
        events= {this.state.data}
        />
      </React.Fragment>
    );
  }
}

export default Event;