import React from "react";
import FormBusines from "./FormBusines";
import Error from '../pages/NotFound'

class EditBusines extends React.Component {
    state = {
        form: this.props.location.state.busines,
        options: [],
        error: null,
        imagePreview: this.props.location.state.busines.image
    };

    componentDidMount() {
        this.getTypeOfBussiness();
    }
    handleChooseFile = e => {
        console.log(e.target.files[0]);
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.files[0]
            }
        });
    };
    getTypeOfBussiness = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("myData"));
            const config = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.api_token}`
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
        const { busines } = this.props.location.state;
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
                Authorization: `Bearer ${user.api_token}`
            },
            body: formData
        };
        const res = await fetch(
            `http://backendeventos.test/api/v1/business/${busines.id}`,
            config
        );
        const data = await res.json();
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

    render() {
        const { busines } = this.props.location.state;
        if (this.state.error) {
            return <Error data={this.state.error} />
        }
        return (
            <FormBusines
                form={busines}
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
