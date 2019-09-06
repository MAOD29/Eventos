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

                        <button onClick={() => this.handleOnDelete(busines.id)} type="button" className="btn btn btn-outline-danger btn-sm" >Eliminar</button>
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
          const res = await fetch(`http://eventos.test/api/v1/comercio/${id}`,config)
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