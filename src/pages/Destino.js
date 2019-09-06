import React from "react";
import CardDestino from "../Components/CardDestino";
import Loading from "../Components/Loading"
class Destino extends React.Component {
  state = {
    data: [],
    error: null,
    loading:true
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
        data,
        loading:false
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  render() {
    if(this.state.loading){
      return <Loading/>
    }
    return (
      <React.Fragment>
       
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
