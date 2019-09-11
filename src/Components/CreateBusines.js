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
            typebusiness_id:'',
            image:''
        },
        options:[],
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
     
      componentDidMount(){
        this.getTypeOfBussiness()

      }
     
      getTypeOfBussiness = async () => {

        try{
          const user = JSON.parse(localStorage.getItem('myData'))
          const config ={
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': user.api_token
            }
  
          }
          const res = await fetch('http://eventos.test/api/v1/comercio/getTypeBussiness',config)
          const data = await res.json()
          console.log(data.types)
         this.setState({
          options:data.types
         })
         
         
        }catch(error){
          this.setState({
            error:error
          })
          return ''
        }
        
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
                    options= {this.state.options}
            
                />
            )
    }
}
export default withRouter(CreateBusines)