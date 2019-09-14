import React from "react";
import FormEvent from "./FormEvent";

class EditEvent extends React.Component {
  state = {
    form: this.props.location.state.event,
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
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

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
        `http://eventos.test/api/v1/evento/${event.id}`,
        config
      );
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
    const { event } = this.props.location.state;

    return (
      <FormEvent
        form={event}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onChooseFile={this.handleChooseFile}
      />
    );
  }
}

export default EditEvent;
