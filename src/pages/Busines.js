import React from "react"
import ListBusines from "../Components/ListBusiness.js"
import Loading from "../Components/Loading"
class Business extends React.Component {
  state = {
    data: [],
    error: null,
    loading: true
  }
  async componentDidMount() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    try {
      const res = await fetch("http://eventos.test/api/v1/comercio", {
        headers: myHeaders
      })
      const data = await res.json();

      this.setState({
        data,
        loading: false
      })
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />
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
