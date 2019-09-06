import React from 'react'
import FormBusines from './FormBusines'

class EditBusines extends React.Component{
  
  state = {
    form: this.props.location.state.busines,
    error: null,

  }
    
      handleChange = e => {
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        })
      }

      handleSubmit = async e => {
        const {busines} = this.props.location.state
        console.log(busines.id)
        e.preventDefault();
        try{
          const config ={
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'R0IAsWrf2UGKwBssyobzJv7wDHwviaKWwqNiewhnsfH0jUp53DVgAhnZbXOm'
            },
            body: JSON.stringify(this.state.form)
          }
          const res = await fetch(`http://eventos.test/api/v1/comercio/${busines.id}`,config)
          const data = await res.json()
          console.log(data)

          this.props.history.push('/mis-comercios')
        }catch(error){
          this.setState({
            error:error
          })
        }
      }

    render(){
        const {busines} = this.props.location.state
      
            return(
                <FormBusines
                    form={busines}
                    onChange = {this.handleChange}
                    onSubmit= {this.handleSubmit}
                />
            )
    }
}


export default EditBusines