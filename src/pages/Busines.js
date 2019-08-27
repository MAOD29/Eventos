import React from 'react'
import Header from '../Components/Header'
import CardBusines from '../Components/CardBusines.js'
class Business extends React.Component {
    state={
        data:[],
        error: null
    }
    async componentDidMount(){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {
          const res = await fetch("http://eventos.test/api/v1/comercio", {
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

    render(){
        return (
            <React.Fragment>
              <Header />
              <div>
                {this.state.data.map(card => {
                  return (
                    <CardBusines
                      key={card.id}
                      name={card.name}
                      descripcion={card.descripcion}
                      imgage={card.image}
                      location={card.location}
                      contact={card.contact}
                      start
                      finish
                      type={card.typebusiness_id}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          );
    }
}


export default Business