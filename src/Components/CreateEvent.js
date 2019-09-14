import React from "react";
import FormEvent from "./FormEvent";

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
    try {
      const user = JSON.parse(localStorage.getItem("myData"));

      const config = {
        method: "POST",
        headers: {
          Authorization: user.api_token
        },
        body: formData
      };
      const res = await fetch("http://eventos.test/api/v1/evento", config);
      const data = await res.json();
      console.log(data);
      this.props.history.push("/mis-eventos");
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };

  render() {
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
