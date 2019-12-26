import React from 'react'
import {Link} from 'react-router-dom'
import Loading from './Loading'

class TableSpots extends React.Component{

    state={
        loading:false
    }

    list = () => { 
        return(    
            this.props.spots.map(spot => { 
                return(
                <tr key={spot.id}>
                    <td >{spot.id}</td>
                    <td>{spot.name}</td>
                    <td>{spot.descripcion}</td>
                    <td>{spot.location}</td>
                    <td>
                        <Link to={{ pathname: `/mis-comercios/${spot.slug}`, state: { data:spot } }}><button className="btn btn btn-outline-info btn-sm">Editar</button></Link>  

                        <button onClick={() => this.props.onDelete(spot.slug)} type="button" className="btn btn btn-outline-danger btn-sm" >Eliminar</button>
                    </td>
                </tr> 
                )
            })
        )
    }
    
     
  
    render(){
       
        return(
            <table className="table table-striped table-bordered table-responsive-md">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
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

export default TableSpots