import React from "react";
import Header from "../Components/Header";
import CardDestino from "../Components/CardDestino";

class Destino extends React.Component {
  state = {
    data: [],
    error: null
  };

  async componentDidMount() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const res = await fetch("http://eventos.test/api/v1/destino", {
        headers: myHeaders
      });
      const data = await res.json();

      this.setState({
        data
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div>
          {this.state.data.map(card => {
            return (
              <CardDestino
                key={card.id}
                name={card.name}
                description={card.description}
                imgage={card.image}
                location={card.location}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Destino;
