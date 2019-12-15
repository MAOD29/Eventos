import React from 'react';
import TableMisComercios from './TableMisComercios';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import Error from './pages/NotFound'

class MyBusiness extends React.Component {
    state = {
        data: [],
        error: null,
        loading: false
    };

    componentDidMount() {
        this.traerDatos();
    }

    async traerDatos() {

        this.setState({ loading: true })
        const user = JSON.parse(localStorage.getItem("myData"));
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        const res = await fetch("http://backendeventos.test/api/v1/user/getbussiness", {
            headers: myHeaders
        });

        switch (res.status) {
            case 200:
                const myBusiness = await res.json();
                console.log(myBusiness);
                this.setState({
                    data: myBusiness,
                    loading: false
                });

                break;
            case 401:
                console.log('error 401')
                this.setState({
                    error: 'error no autorizado',
                    loading: false
                });
                break;
            case 404:
                console.log('error 404')
                this.setState({
                    error: 'error 404 no contenido',
                    loading: false
                });
                break;
            case 500:
                console.log('error 500')
                this.setState({
                    error: 'error 500',
                    loading: false
                });
                break;

            default:
                console.log('error inesperado')
                this.setState({
                    error: res.status,
                    loading: false
                });
                break;
        }

    }

    handleOnDelete = async id => {
        this.setState({
            loading: true
        });

        const user = JSON.parse(localStorage.getItem("myData"));
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        };
        const res = await fetch(
            `http://backendeventos.test/api/v1/business/${id}`,
            config
        );
        console.log(res.status)

        switch (res.status) {
            case 200:
                const data = await res.json();
                console.log(data);
                this.setState({
                    loading: false
                });
                this.traerDatos();
                this.props.history.push("/mis-comercios");
                break;
            case 401:
                console.log('error 401')
                this.setState({
                    error: 'error no autorizado',
                    loading: false
                });
                break;
            case 404:
                console.log('error 404')
                this.setState({
                    error: 'error 404 no contenido',
                    loading: false
                });
                break;
            case 500:
                console.log('error 500')
                this.setState({
                    error: 'error 500',
                    loading: false
                });
                break;

            default:
                console.log('error inesperado')
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
        if (this.state.error) {
            return <Error data={this.state.error} />
        }
        return (
            <React.Fragment>
                <Link to={"/crear-comercio"}>
                    <button className="btn btn-outline-success">Crear comercio</button>
                </Link>
                <TableMisComercios
                    business={this.state.data}
                    onDelete={this.handleOnDelete}
                />
            </React.Fragment>
        );
    }
}

export default MyBusiness;
