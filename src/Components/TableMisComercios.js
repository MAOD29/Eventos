import React from 'react'
import {Link} from 'react-router-dom'
import Loading from './Loading'

class TableMisComercios extends React.Component{

    state={
        loading:false
    }

    list = () => { 
        return(    
            this.props.business.map(busines => { 
                return(
                <tr key={busines.id}>
                    <td>{busines.id}</td>
                    <td>{busines.name}</td>
                    <td>{busines.descripcion}</td>
                    <td>{busines.location}</td>
                    <td>
                        <Link to={{ pathname: `/mis-comercios/${busines.id}`, state: { busines: busines} }}><button className="btn btn btn-outline-info btn-sm">Editar</button></Link>  

                        <button onClick={() => this.props.onDelete(busines.id)} type="button" className="btn btn btn-outline-danger btn-sm" >Eliminar</button>
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
            <table className="table">
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

export default TableMisComercios