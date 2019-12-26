import React from "react";
import FormBusines from "./FormBusines";
import Error from './pages/NotFound'
import Loading from './Loading';

class EditBusines extends React.Component {
    state = {
        form: [],
        options: [],
        error: null,
        imagePreview: null,
        loading: false
    };

    componentDidMount() {
        //prueba de redenrizar con base a props por link 
        if(this.props.location.state ){
            console.log('si esxiste')
            this.setState({
                form: this.props.location.state.data,
                imagePreview:this.props.location.state.data.image
            })
            this.getTypeOfBussiness();
        }else{
            this.traerDatos()
            this.getTypeOfBussiness();
        }
      
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
    getTypeOfBussiness = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("myData"));
            const config = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };
            const res = await fetch(
                "http://backendeventos.test/api/v1/gettypebussiness",
                config
            );
            const data = await res.json();
            this.setState({
                options: data.types
            });
        } catch (error) {
            this.setState({
                error: error
            });
            return "";
        }
    };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    handleSubmit = async e => {
       
        e.preventDefault();

        const { form } = this.state;
        const getFormData = form =>
            Object.keys(form).reduce((formData, key) => {
                formData.append(key, form[key]);
                return formData;
            }, new FormData());
        const formData = getFormData(form);
        formData.append("_method", "put");

        const user = JSON.parse(localStorage.getItem("myData"));
        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            body: formData
        };
        const res = await fetch(
            `http://backendeventos.test/api/v1/business/${form.slug}`,
            config
        );
        const data = await res.json();
        console.log('aqui')
        console.log(data)

        switch (res.status) {
            case 200:
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
                this.props.history.goback();
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
                this.setState({
                    error: res.status,
                    loading: false
                });
                break;
        }
    };

    async traerDatos() {
        
        
        const { id } = this.props.match.params;
       
        this.setState({ loading: true })
        const user = JSON.parse(localStorage.getItem("myData"));
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //myHeaders.append('Accept', 'application/json')
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        const res = await fetch(`http://backendeventos.test/api/v1/business/${id}`, {
            headers: myHeaders
        });

        switch (res.status) {
            case 200:
                const business = await res.json();
                console.log(business);
                this.setState({
                    form: business.data,
                    imagePreview: business.data.image,
                    loading: false,
                });

                break;
            case 401:
                console.log('error 401')
                this.setState({
                    error: 'error no autorizado',
                    loading: false
                });
                break;
            case 404:
                console.log('error 404')
                this.setState({
                    error: 'error 404 no contenido',
                    loading: false
                });
                break;
            case 500:
                console.log('error 500')
                this.setState({
                    error: 'error 500',
                    loading: false
                });
                break;

            default:
                console.log('error inesperado')
                this.setState({
                    error: res.status,
                    loading: false
                });
                break;
        }

    }
    render() {
        if (this.state.loading) {
            return <Loading />;
        }
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
        );
    }
}

export default EditBusines;
