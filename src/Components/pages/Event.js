import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../Loading';
import ListEvent from './ListEvent';
import Error from './NotFound'
import Pagination from "react-js-pagination";
class Event extends React.Component {

    state = {
        event: [],
        error: null,
        loading: true,
        paginatonData: null
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
            console.log(error)
            this.setState({
                loading: false,
                error
            })
        }
    }

    handlePageChange = async (pageNumber) => {

        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json')
        try {
            const res = await fetch(`http://backendeventos.test/api/v1/event?page=${pageNumber}`, {
                headers: myHeaders
            })

            const event = await res.json();

            this.setState({
                event: event.data.data,
                loading: false,
                paginationData: event.data

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
                    <ListEvent events={this.state.event} />
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
        )
    }
}

export default Event;
