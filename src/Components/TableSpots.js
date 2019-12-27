import React from 'react'
import {Link} from 'react-router-dom'


class TableSpots extends React.Component{

    state={
        loading:false
    }

    list = () => { 
        return(    
            this.props.spots.map(spot => { 
                return(
                <tr key={spot.id}>
                    <td  width={"5%"}>{spot.id}</td>
                    <td width={"15%"}>{spot.name}</td>
                    <td width={"45%"}>{spot.description}</td>
                    <td width={"20%"}>{spot.location}</td>
                    <td width={"15%"}>
                        <Link to={{ pathname: `/gestion-destino/${spot.slug}`, state: { data:spot } }}><button className="btn btn btn-outline-info btn-sm">Editar</button></Link>  

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