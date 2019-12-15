import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../Loading';
import ListEvent from './ListEvent';
import Error from './NotFound'
class Event extends React.Component {

  state = {
    data: [],
    error: null,
    loading: true 
  }

  async componentDidMount() {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')

    try {
      const res = await fetch('http://backendeventos.test/api/v1/event', {
        headers: myHeaders
      })
      const event = await res.json();
      switch (res.status) {
        case 200:
          console.log(event.data);
          this.setState({
            data: event.data.data,
            loading: false
          });

          break;
        case 401:  
          console.log(event.message)
          this.setState({
            error: event.message,
            loading: false
          });
          break;
        case 500:
          console.log(event)
          this.setState({
            error: event,
            loading: false
          });
          break;

        default:
          console.log(event)
          this.setState({
            error: event,
            loading: false
          });
          break;
      }
    } catch (error) {
      console.log(error)
      this.setState({
        loading: false,
        error
      })
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    if(this.state.error){
      return <Error data = {this.state.error}/>
    }
    return (
      <React.Fragment>
        <ListEvent events={this.state.data} />
      </React.Fragment>
    )
  }
}

export default Event;
