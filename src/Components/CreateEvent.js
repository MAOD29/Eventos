import React from "react";
import FormEvent from "./FormEvent";
import Error from './pages/NotFound'


class CreateEvent extends React.Component {
    state = {
        form: {
            title: "",
            descripcion: "",
            location: "",
            date: "",
            start: "",
            finish: "",
            web_site: "",
            image: ""
        },
        error: null
    };
    handleChooseFile = e => {
        //let partialstate = {}
        //partialstate[e.target.name] = e.target.value
        //this.setState(partialstate)
        console.log(e.target.files[0]);
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.files[0]
            }
        });
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

        const user = JSON.parse(localStorage.getItem("myData"));

        const config = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.api_token}`
            },
            body: formData
        };
        const res = await fetch("http://backendeventos.test/api/v1/event", config);
        const data = await res.json();

        switch (res.status) {
            case 201:
                console.log(data);
                this.props.history.push("/mis-eventos");
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

    };

    render() {
        if (this.state.error) {
            return <Error data={this.state.error} />
        }
        return (
            <FormEvent
                form={this.state.form}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                onChooseFile={this.handleChooseFile}
            />
        );
    }
}
export default CreateEvent;
