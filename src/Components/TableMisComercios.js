import React from 'react'
import {Link} from 'react-router-dom'


class TableMisComercios extends React.Component{

    state={
        loading:false
    }

    list = () => { 
        return(    
            this.props.business.map(busines => { 
                return(
                <tr key={busines.id}>
                    <td width={"5%"} >{busines.id}</td>
                    <td width={"15%"}>{busines.name}</td>
                    <td width={"45%"}>{busines.descripcion}</td>
                    <td width={"20%"}>{busines.location}</td>
                    <td width={"15%"}>
                        <Link to={{ pathname: `/mis-comercios/${busines.slug}`, state: { data:busines } }}><button className="btn btn btn-outline-info btn-sm">Editar</button></Link>  

                        <button onClick={() => this.props.onDelete(busines.slug)} type="button" className="btn btn btn-outline-danger btn-sm" >Eliminar</button>
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

export default TableMisComercios