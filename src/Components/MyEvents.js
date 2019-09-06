import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom'
import Loading from './Loading'

import TableMyEvents from './TableMyEvents'
class MyEvents extends React.Component {
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
    if(this.state.loading){
      return <Loading/>
    }
    return (
      <React.Fragment>
       <React.Fragment>
        <Link to={"/crear-evento"}>
          <button className="btn btn-outline-success">Crear evento</button>
        </Link>
        <TableMyEvents 
        events={this.state.data} />
      </React.Fragment>
      </React.Fragment>
    );
  }
}

export default MyEvents;