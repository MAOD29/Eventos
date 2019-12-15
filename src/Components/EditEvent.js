import React from "react";
import FormEvent from "./FormEvent";
import Error from './pages/NotFound'

class EditEvent extends React.Component {
  state = {
    form: [],
    error: null
  };

  componentDidMount(){
    this.traerDatos()
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
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };
  
  async traerDatos() {

    const { id } = this.props.match.params;
    this.setState({ loading: true })
    const user = JSON.parse(localStorage.getItem("myData"));
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const res = await fetch( `http://backendeventos.test/api/v1/event/${id}`, {
        headers: myHeaders
    });

    switch (res.status) {
        case 200:
            const event = await res.json();
            console.log(event);
            this.setState({
                form: event.data,
                loading: false
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

  handleSubmit = async e => {
    const { event } = this.props.location.state;
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
        `http://backendeventos.test/api/v1/event/${event.id}`,
        config
      );
      const data = await res.json();
      switch (res.status) {
        case 200:
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

export default EditEvent;
