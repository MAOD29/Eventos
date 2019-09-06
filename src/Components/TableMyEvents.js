import React from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

class TableMyEvents extends React.Component{

    state={
        loading:false
    }

    list = () => { 
        return(    
            this.props.events.map(event => { 
                return(
                <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.title}</td>
                    <td>{event.descripcion}</td>
                    <td>{event.location}</td>
                    <td>
                        <Link to={{ pathname: `/mis-eventos/${event.id}`, state: { event: event} }}><button className="btn btn btn-outline-info btn-sm">Editar</button></Link>  

                        <button onClick={() => this.handleOnDelete(event.id)} type="button" className="btn btn btn-outline-danger btn-sm" >Eliminar</button>
                    </td>
                </tr> 
                )
            })
        )
    }
     
    handleOnDelete = async id => {
        this.setState({
            loading:true
        })
        try{
          const config ={
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'R0IAsWrf2UGKwBssyobzJv7wDHwviaKWwqNiewhnsfH0jUp53DVgAhnZbXOm'
            },
          }
          const res = await fetch(`http://eventos.test/api/v1/evento/${id}`,config)
          const data = await res.json()
          console.log(data)
          this.setState({
            loading:false
        })
       
         
        }catch(error){
          this.setState({
            error:error
          })
        }
      }
    render(){
        if(this.state.loading){
            return <Loading/>
          }
        return(
            <table className="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Titulo</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Lugar</th>
                <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>   
                {this.list()}
            </tbody>
        </table>

        )
    }
    }

export default TableMyEvents