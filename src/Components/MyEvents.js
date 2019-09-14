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

  componentDidMount(){
    this.traerDatos();
  } 

  async traerDatos(){
    this.setState({
      loading: true
    });
    const user = JSON.parse(localStorage.getItem("myData"));
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", user.api_token);
    try {
      const res = await fetch("http://eventos.test/api/v1/user/getevents", {
        headers: myHeaders
      });
      const data = await res.json();

      this.setState({
        data,
        loading: false
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  }
  handleOnDelete = async id => {
    this.setState({
      loading: true
    });
    try {
      const user = JSON.parse(localStorage.getItem("myData"));
      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.api_token
        }
      };
      const res = await fetch(
        `http://eventos.test/api/v1/evento/${id}`,
        config
      );
      const data = await res.json();
      console.log(data);

      this.setState({
        loading: false
      });
      this.traerDatos();
      this.props.history.push("/mis-eventos");
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };
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
        events={this.state.data}
        onDelete={this.handleOnDelete} />
        
      </React.Fragment>
      </React.Fragment>
    );
  }
}

export default MyEvents;