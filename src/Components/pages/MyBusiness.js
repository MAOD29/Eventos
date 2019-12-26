import React from 'react';
import TableMisComercios from '../TableMisComercios';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import Error from './NotFound'
import Pagination from "react-js-pagination";

class MyBusiness extends React.Component {
    state = {
        data: [],
        error: null,
        loading: true,
        paginationData: null,
    };

    componentDidMount() {
        this.traerDatos();
    }

    traerDatos = async () => {

        this.setState({ loading: true })

        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')

        const res = await fetch("http://backendeventos.test/api/v1/business", {
            headers: myHeaders
        });

        switch (res.status) {
            case 200:
                const myBusiness = await res.json();
                console.log(myBusiness);
                this.setState({
                    data: myBusiness.data.data,
                    loading: false,
                    paginationData: myBusiness.data,
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
    handlePageChange = async (pageNumber) => {
        this.setState({ loading: true })
        const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json")
        myHeaders.append('Accept', 'application/json')
        try {
            const res = await fetch(`http://backendeventos.test/api/v1/business?page=${pageNumber}`, {
                headers: myHeaders
            })

            const business = await res.json();
            console.log(business)

            this.setState({
                data: business.data.data,
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
        this.setState({
            loading: true
        });
        console.log(id)
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
        //console.log(this.state.paginationData)
        if (this.state.loading) {
            return <Loading />;
        }
        if (this.state.error) {
            return <Error data={this.state.error} />
        }
        return (
            <React.Fragment>
                <div className=" section">
                    <Link to={"/crear-comercio"}>
                        <button className="btn btn-outline-success">Crear comercio</button>
                    </Link>
                </div>
                <div className=" section">
                    <TableMisComercios
                        business={this.state.data}
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
        );
    }
}

export default MyBusiness;
