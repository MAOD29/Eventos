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
                    <td width={"5%"}>{event.id}</td>
                    <td width={"15%"}>{event.title}</td>
                    <td width={"45%"}>{event.descripcion}</td>
                    <td width={"20%"}>{event.location}</td>
                    <td width={"15%"}>
                        <Link to={{ pathname: `/mis-eventos/${event.slug}`, state: { data:event } }}><button className="btn btn btn-outline-info btn-sm">Editar</button></Link>  

                        <button onClick={() => this.props.onDelete(event.slug)} type="button" className="btn btn btn-outline-danger btn-sm" >Eliminar</button>
                    </td>
                </tr> 
                )
            })
        )
    }
     
    
    render(){
        if(this.state.loading){
            return <Loading/>
          }
        return(
            <table className="table table-striped table-bordered table-responsive-md">
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