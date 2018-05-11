import React, { Component } from 'react';
import { FormValidator, FVDisplayError } from '../../helpers/formValidator';

const validation = new FormValidator([
  {
    fieldName: 'age',
    friendlyName: 'age',
    rules: ['isNotEmpty', { isInt: [{ min: 11, max: 25 }] }],
  },
  {
    fieldName: 'ageConfirm',
    friendlyName: 'age confirmation',
    rules: ['isNotEmpty', { equals: ['age'] }],
  },
]);

class FormValidate extends Component {
  constructor() {
    super();
    this.state = {
      age: '',
      ageConfirm: '',
      form: {},
    };
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({
      form: validation.validate(this.state),
    });
  }
  render() {
    return (
      <form onSubmit={e => this.handleFormSubmit(e)}>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            className="form-control"
            type="text"
            name="age"
            id="age"
            onChange={this.handleInputChange}
          />
          <FVDisplayError field={this.state.form.age} />
        </div>
        <div className="form-group">
          <label htmlFor="ageConfirm">Age Confirm</label>
          <input
            className="form-control"
            type="text"
            name="ageConfirm"
            id="ageConfirm"
            onChange={this.handleInputChange}
          />
          <FVDisplayError field={this.state.form.ageConfirm} />
        </div>
        <button type="submit">Send</button>
      </form>
    );
  }
}

export default FormValidate;
