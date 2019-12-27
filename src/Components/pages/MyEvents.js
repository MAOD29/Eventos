import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Pagination from "react-js-pagination";


import TableMyEvents from "../TableMyEvents";
class MyEvents extends React.Component {
    state = {
        event: [],
        error: null,
        loading: true,
        paginationData: null,
    };

    componentDidMount() {
        this.traerDatos();
    }

    async traerDatos() {
       
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')

        try {
            const res = await fetch('http://backendeventos.test/api/v1/event', {
                headers: myHeaders
            })
            const event = await res.json();
            switch (res.status) {
                case 200:
                   
                    this.setState({
                        event: event.data.data,
                        loading: false,
                        paginationData: event.data
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
            this.setState({
                error
            });
        }
    }
    handlePageChange = async (pageNumber) => {
        this.setState({ loading: true })
        const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json")
        myHeaders.append('Accept', 'application/json')
        try {
            const res = await fetch(`http://backendeventos.test/api/v1/event?page=${pageNumber}`, {
                headers: myHeaders
            })

            const business = await res.json();
            console.log(business)

            this.setState({
                event: business.data.data,
                paginationData: business.data,
                loading: false,

            });

        } catch (error) {
            console.log(error)
            this.setState({
                loading: false,
                error
            })
        }
    }
    handleOnDelete = async id => {
        this.setState({loading: true});

        const user = JSON.parse(localStorage.getItem("myData"));
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        };
        const res = await fetch(
            `http://backendeventos.test/api/v1/event/${id}`,
            config
        );
        const data = await res.json();
        switch (res.status) {
            case 200:
                console.log(data);
                this.setState({loading: false});
                this.traerDatos();
                this.props.history.push("/mis-eventos");
                break;
            case 401:
                console.log("error 401");
                console.log(data)
                this.setState({
                    error: 'error 401',
                    loading: false
                });
                break;
            case 404:

                console.log("error 404");
                this.setState({
                    error: "error 404 no contenido",
                    loading: false
                });
                break;
            case 500:
                console.log("error 500");
                this.setState({
                    error: "error 500",
                    loading: false
                });
                break;

            default:

                console.log("error inesperado");
                console.log(data)
                this.setState({
                    error: res.status,
                    loading: false
                });
                break;
        }

    };
    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <React.Fragment>
                <React.Fragment>
                <div className=" section">
                    <Link to={"/crear-evento"}>
                        <button className="btn btn-outline-success">Crear evento</button>
                    </Link>
                </div>    
                <div className=" section">
                    <TableMyEvents
                        events={this.state.event}
                        onDelete={this.handleOnDelete}
                    />
                </div>    
                <div className="pagination justify-content-center">
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        hideDisabled
                        activePage={this.state.paginationData.current_page}
                        itemsCountPerPage={this.state.paginationData.per_page}
                        totalItemsCount={this.state.paginationData.total}
                        pageRangeDisplayed={3}
                        onChange={this.handlePageChange}

                    />
                </div>
                </React.Fragment>
            </React.Fragment>
        );
    }
}

export default MyEvents;
