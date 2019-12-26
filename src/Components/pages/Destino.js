import React from "react";
import CardDestino from "../CardDestino";
import Loading from "../Loading"
import Pagination from "react-js-pagination";
import Error from './NotFound'

class Destino extends React.Component {
    state = {
        destino: [],
        error: null,
        loading: true,
        paginatonData: null
    };

    async componentDidMount() {
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')
        try {
            const res = await fetch("http://backendeventos.test/api/v1/spot", {
                headers: myHeaders
            });
            const destino = await res.json();
            this.setState({
                destino: destino.data.data,
                loading: false,
                paginationData: destino.data
            });

        } catch (error) {
            this.setState({
                error,
                loading:false
            });
        }
    }

    handlePageChange = async (pageNumber) => {

        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')
        try {
            const res = await fetch(`http://backendeventos.test/api/v1/destino?page=${pageNumber}`, {
                headers: myHeaders
            })

            const destino = await res.json();

            this.setState({
                destino: destino.data.data,
                loading: false,
                paginationData: destino.data

            });

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
        if (this.state.error) {
            return <Error data={this.state.error} />
        }
        return (
            <React.Fragment>

                <div className="container section">
                    <div className="card-group">
                    {this.state.destino.map(card => {
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
                </div>
            </React.Fragment>
        );
    }
}

export default Destino;
