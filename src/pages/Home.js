import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../Components/Header";
import Portada from '../Components/Portada'
class Home extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Header />
		<Portada/>
      </React.Fragment>
    );
  }
}

export default Home;
