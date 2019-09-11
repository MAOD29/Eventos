import React from 'react'
import FormEvent from './FormEvent'

class CreateEvent extends React.Component{

    state = {
        form: {
            title: '',
            descripcion: '',
            location: '',
            date: '',
            start:'',
            finish:'',
            web_site:'',
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
          const user = JSON.parse(localStorage.getItem('myData'))
          const config ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': user.api_token
            },
            body: JSON.stringify(this.state.form)
          }
          const res = await fetch('http://eventos.test/api/v1/evento',config)
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
            return(
                <FormEvent
                    form={this.state.form}
                    onChange = {this.handleChange}
                    onSubmit= {this.handleSubmit}
                />
            )
    }
}
export default CreateEvent