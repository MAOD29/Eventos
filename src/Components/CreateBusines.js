import React from 'react'
import FormBusines from './FormBusines'
import { withRouter } from 'react-router-dom';
class CreateBusines extends React.Component{

    state = {
        form: {
            name: '',
            descripcion: '',
            location: '',
            contact: '',
            start:'',
            finish:'',
            user_id:'',
            typebusiness_id:'',
            image:''
        },
        error: null,
    
      };
    
      handleChange = e => {
        //let partialstate = {}
        //partialstate[e.target.name] = e.target.value
        //this.setState(partialstate)
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        })
      }

      handleSubmit = async e => {
        e.preventDefault();
        try{
          const config ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'R0IAsWrf2UGKwBssyobzJv7wDHwviaKWwqNiewhnsfH0jUp53DVgAhnZbXOm'
            },
            body: JSON.stringify(this.state.form)
          }
          const res = await fetch('http://eventos.test/api/v1/comercio',config)
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
            return(
                <FormBusines
                    form={this.state.form}
                    onChange = {this.handleChange}
                    onSubmit= {this.handleSubmit}
                />
            )
    }
}
export default withRouter(CreateBusines)