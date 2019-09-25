import React from "react"
import ListBusines from "../Components/ListBusiness.js"
import Loading from "../Components/Loading"
import Error from './NotFound'
class Business extends React.Component {
  state = {
    data: [],
    error: null,
    loading: true
  }
  async componentDidMount() {
    const myHeaders = new Headers();
   // myHeaders.append("Content-Type", "application/json")
    myHeaders.append('Accept','application/json')
    try {
      const res = await fetch("http://backendeventos.test/api/v1/business", {
        headers: myHeaders
      })
     
      const business = await res.json();
      switch (res.status) {
        case 200:
          console.log(business.data);
          this.setState({
            data: business.data.data,
            loading: false
          });

          break;
        case 401:  
          console.log(business.message)
          this.setState({
            error: business.message,
            loading: false
          });
          break;
        case 500:
          console.log(business)
          this.setState({
            error: business,
            loading: false
          });
          break;

        default:
          console.log(business)
          this.setState({
            error: business,
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
        <div className="container">
        <ListBusines business={this.state.data} />
        </div>
      </React.Fragment>
    );
  }
}

export default Business
