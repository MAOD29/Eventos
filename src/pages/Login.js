import React from 'react'
import FormLogin from '../Components/FormLogin'
class Login extends React.Component {

    state = {
        form:{
            email: '',
            password:''
        },
        error: null
    }
    handleChange = async e => {
       this.setState({
             //let partialstate = {}
            //partialstate[e.target.name] = e.target.value
            //this.setState(partialstate)
           form:{
               ...this.state.form,
               [e.target.name]: e.target.value
           }
       })
    }
    handleOnSubmit= async e => {
        e.preventDefault()
        console.log(this.state.form)
        /*try {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const res = await fetch('http://eventos.test/api/v1/login',{
                method:'POST',
                headers:myHeaders,
                body: JSON.stringify(this.state.form)
    
            })
            const data = await res.json()
            console.log(data);    
        } catch (error) {
            this.setState({
                error
            })
        }
        */
    }

    render(){

        return(
            <FormLogin
            form= {this.state.form}
            onSubmit={this.handleOnSubmit}
            onChange = {this.handleChange}
          
            />
        )
        
    }

}

export default Login