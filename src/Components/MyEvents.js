import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import Loading from "./Loading";

import TableMyEvents from "./TableMyEvents";
class MyEvents extends React.Component {
    state = {
        data: [],
        error: null,
        loading: true
    };

    componentDidMount() {
        this.traerDatos();
    }

    async traerDatos() {
        this.setState({
            loading: true
        });
        const user = JSON.parse(localStorage.getItem("myData"));
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${user.api_token}`);
        try {
            const res = await fetch(
                "http://backendeventos.test/api/v1/user/getevents",
                {
                    headers: myHeaders
                }
            );
            const data = await res.json();

            this.setState({
                data,
                loading: false
            });
        } catch (error) {
            this.setState({
                error
            });
        }
    }
    handleOnDelete = async id => {
        this.setState({loading: true});

        const user = JSON.parse(localStorage.getItem("myData"));
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.api_token}`
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
                    <Link to={"/crear-evento"}>
                        <button className="btn btn-outline-success">Crear evento</button>
                    </Link>
                    <TableMyEvents
                        events={this.state.data}
                        onDelete={this.handleOnDelete}
                    />
                </React.Fragment>
            </React.Fragment>
        );
    }
}

export default MyEvents;
