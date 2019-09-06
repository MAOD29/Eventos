import React from "react"
import TableMisComercios from "./TableMisComercios"
import Loading from "./Loading"
import { Link } from "react-router-dom"

class MyBusiness extends React.Component {
  state = {
    data: [],
    error: null,
    loading: false
  }

  componentDidMount() {
    this.traerDatos();
  }

  async traerDatos() {
    this.setState({
      loading: true
    })
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    try {
      const res = await fetch("http://eventos.test/api/v1/comercio", { headers: myHeaders })
      const data = await res.json()

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
        <Link to={"/crear-comercio"}>
          <button className="btn btn-outline-success">Crear comercio</button>
        </Link>
        <TableMisComercios business={this.state.data} />
      </React.Fragment>
    )
  }
}

export default MyBusiness;
