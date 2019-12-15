import React from 'react'
import Error from '../pages/NotFound'
import Loading from "../Loading"
const BusinesContext = React.createContext()
export { BusinesContext }
class BussinesProvider extends React.Component {


    state = {
        busines: [],
        error: null,
        loading: true
    }
    componentDidMount(){
      
        this.handleGetBusiness()
    }
    
    
    componentWillUnmount() {
        this.setState({
            busines: [],
            loading: false
        });
    }
    
    handleGetBusiness = async () => {
        const {id}  = this.props.children[0]._self.props.match.params
        console.log(id)
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
                loading: false
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
            return <Loading />
        }
        if (this.state.error) {
            return <Error data={this.state.error} />
        }
        return (
            <BusinesContext.Provider
                value={{
                    state: this.state.busines,
                    handleGetBusiness: this.handleGetBusiness,
                    handleOnDelete: this.handleOnDelete,
                  
                }}

            >
                {this.props.children}
            </BusinesContext.Provider>
        );
    }
}

export default BussinesProvider