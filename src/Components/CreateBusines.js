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
            image:null
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
      handleChooseFile = e => {
        //let partialstate = {}
        //partialstate[e.target.name] = e.target.value
        //this.setState(partialstate)
        console.log(e.target.files[0])
        this.setState({
          form: {
               ...this.state.form,
              [e.target.name]: e.target.files[0]
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
        //TODO:: Refactorizar 
        e.preventDefault();
        const {form} = this.state
        const getFormData = form => Object.keys(form).reduce((formData, key) => {
          formData.append(key, form[key]);
          return formData;
      }, new FormData());
      
      const formData = getFormData(form)
       try{
          const user = JSON.parse(localStorage.getItem('myData'))
          const config ={
            method: 'POST',
            headers: {
            
              'Authorization': user.api_token
            },
            body: formData
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
                  onChooseFile = {this.handleChooseFile}
          
              />
          )
    }
}
export default withRouter(CreateBusines)