import React from 'react'
import FormBusines from './FormBusines'
import { withRouter } from 'react-router-dom';
import Error from '../pages/NotFound'

class CreateBusines extends React.Component {

    state = {
        form: {
            name: '',
            descripcion: '',
            location: '',
            contact: '',
            start: '',
            finish: '',
            typebusinesses_id: '',
            image: null
        },
        options: [],
        error: null,
        imagePreview: ''

    };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    handleChooseFile = e => {
        //TODO VALIDAR QUE AL CAMBIAR SE BOORE LA IMAGEN PREVIA EL VALOR
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () => {
            this.setState({
                form: {
                    ...this.state.form,
                    image: file
                },
                imagePreview: reader.result
            });
        }
        if(file){
            reader.readAsDataURL(file)
        }
    }

    componentDidMount() {
        this.getTypeOfBussiness()

    }

    getTypeOfBussiness = async () => {

        try {
            const user = JSON.parse(localStorage.getItem('myData'))
            const config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.api_token}`
                }

            }
            const res = await fetch("http://backendeventos.test/api/v1/gettypebussiness", config)
            const data = await res.json()
            this.setState({
                options: data.types
            })


        } catch (error) {
            this.setState({
                error: error
            })
            return ''
        }

    }

    handleSubmit = async e => {
        //TODO:: Refactorizar 
        e.preventDefault();
        const { form } = this.state
        const getFormData = form => Object.keys(form).reduce((formData, key) => {
            formData.append(key, form[key]);
            return formData;
        }, new FormData());

        const formData = getFormData(form)
     
            const user = JSON.parse(localStorage.getItem('myData'))
            const config = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.api_token}`
                },
                body: formData
            }
            const res = await fetch('http://backendeventos.test/api/v1/business', config)
            const data = await res.json()
            switch (res.status) {
                case 201:
                    console.log(data);
                    this.props.history.push("/mis-comercios");
                    break;
                case 401:
                  
                    console.log("error 401");
                    console.log(data)
                    this.setState({
                        error: 'error 401',
                        loading: false
                    });
                    break;
                case 404:
                   
                    console.log("error 404");
                    this.setState({
                        error: "error 404 no contenido",
                        loading: false
                    });
                    break;
                case 500:
                    console.log("error 500");
                    this.setState({
                        error: "error 500",
                        loading: false
                    });
                    break;
    
                default:
                    
                    console.log("error inesperado");
                    console.log(data)
                    this.setState({
                        error: res.status,
                        loading: false
                    });
                    break;
            }
       
    }


    render() {
        if (this.state.error) {
            return <Error data={this.state.error} />
        }
        return (
           
            <FormBusines
                form={this.state.form}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                options={this.state.options}
                onChooseFile={this.handleChooseFile}
                imagePreview={this.state.imagePreview}
            />
        )
    }
}
export default withRouter(CreateBusines)