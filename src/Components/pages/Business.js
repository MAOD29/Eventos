import React from "react"
import ListBusines from "../ListBusiness.js"
import Paginations from '../Pagination'
import Loading from "../Loading"
import Error from './NotFound'
import Pagination from "react-js-pagination";
//require("bootstrap-less/bootstrap/pagination.less");
//import BussinesProvider from '../providers/BussinesProvider'
class Business extends React.Component {

    state = {
        busines: [],
        error: null,
        loading: true,
        paginatonData:null,
    }
    componentDidMount() {

        this.handleGetBusiness()
    }

  
    componentWillUnmount() {
        this.setState({
            busines: [],
            loading: false
        });
    }
  
    
    handleGetBusiness = async () => {
        const { id } = this.props.match.params;
        
        const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json")
        myHeaders.append('Accept', 'application/json')
        try {
            const res = await fetch(`http://backendeventos.test/api/v1/business?page=${id}`, {
                headers: myHeaders
            })

            const business = await res.json();
            console.log(business)

            this.setState({
                busines: business.data.data,
                loading: false,
                paginationData: business.data

            });

        } catch (error) {
            console.log(error)
            this.setState({
                loading: false,
                error
            })
        }
    }
    handlePageChange = async (pageNumber) => {
        const { id } = this.props.match.params;
        
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
                busines: business.data.data,
                loading: false,
                paginationData: business.data

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
        /// this.handleGetBusiness()
        if (this.state.loading) {
            return <Loading />
        }
        if (this.state.error) {
            return <Error data={this.state.error} />
        }
        return (

            <React.Fragment>
                <div className="container">
                    <ListBusines
                        business={this.state.busines}
                    />
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

export default Business
