import React from "react";
import FormBusines from "./FormBusines";

class EditBusines extends React.Component {
  state = {
    form: this.props.location.state.busines,
    options: [],
    error: null
  };

  componentDidMount() {
    this.getTypeOfBussiness();
  }
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
  getTypeOfBussiness = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("myData"));
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.api_token
        }
      };
      const res = await fetch(
        "http://eventos.test/api/v1/comercio/getTypeBussiness",
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
    formData.append('_method','put')
   
    try {
      const user = JSON.parse(localStorage.getItem("myData"));
      const config = {
        method: "POST",
        headers: {
          Authorization: user.api_token
        },
        body: formData
      };
      const res = await fetch(
        `http://eventos.test/api/v1/comercio/${busines.id}`,
        config
      );
      const data = await res.json();
      console.log(data)
      this.props.history.push("/mis-comercios");
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };

  render() {
    const { busines } = this.props.location.state;

    return (
      <FormBusines
        form={busines}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        options={this.state.options}
        onChooseFile={this.handleChooseFile}
      />
    );
  }
}

export default EditBusines;
