import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import Portada from '../Components/Portada'
class Home extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
		    <Portada/>
      </React.Fragment>
    );
  }
}

export default Home;
