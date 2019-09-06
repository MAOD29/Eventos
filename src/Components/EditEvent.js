import React from 'react'
import FormEvent from './FormEvent'

class EditEvent extends React.Component{
  
  state = {
    form: this.props.location.state.event,
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
        const {event} = this.props.location.state
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
          const res = await fetch(`http://eventos.test/api/v1/evento/${event.id}`,config)
          const data = await res.json()
          console.log(data)

          this.props.history.push('/mis-eventos')
        }catch(error){
          this.setState({
            error:error
          })
        }
      }

    render(){
        const {event} = this.props.location.state
      
            return(
                <FormEvent
                    form={event}
                    onChange = {this.handleChange}
                    onSubmit= {this.handleSubmit}
                />
            )
    }
}


export default EditEvent