import React, { Component } from 'react';
import validator from 'validator';

// Add isNotEmpty rules to validator package
validator.isNotEmpty = value => !!value.replace(' ', '');

class FormValidate {
  constructor(validations) {
    this.validations = validations;
  }
  capitalize = word => word[0].toUpperCase() + word.slice(1);
  validate(state) {
    const response = { isValid: true };
    this.validations.forEach(field => {
      const { fieldName } = field;
      const friendlyFieldName =
        field.friendlyName && this.capitalize(field.friendlyName) ||
        this.capitalize(fieldName);
      // Initialize field properties
      response[fieldName] = {};
      response[fieldName].isValid = true;
      response[fieldName].messages = [];

      field.rules.forEach(rule => {
        let method;
        let args = [];
        let errorMessage = '';
        let test;
        if (typeof rule === 'object') {
          [method] = Object.keys(rule);
          args = rule[method];
        } else {
          method = rule;
        }
        // Construct function call with right argument format
        if (method === 'equals') {
          test = validator[method](state[fieldName].toString(), state[args[0]]);
        } else {
          test = validator[method](state[fieldName].toString(), ...args);
        }

        // Create response object with error messages
        if (!test) {
          response.isValid = false;
          response[fieldName].isValid = false;
          if (method === 'equals') {
            const matchingFieldName = this.validations.find(
              fld => fld.fieldName === args[0]
            ).friendlyName;
            response[fieldName].messages.push(`
            ${friendlyFieldName} must match ${this.capitalize(
              matchingFieldName
            )} field`);
          }
          if (method === 'isInt') {
            errorMessage = `${friendlyFieldName} must be a number`;
            if (args.length > 0) {
              const keys = Object.keys(...args);
              if (keys.includes('max', 'min')) {
                errorMessage += ` between ${args[0].min} and ${args[0].max}`;
              } else if (keys.includes('min')) {
                errorMessage += ` greater than ${args[0].min}`;
              } else if (keys.includes('max')) {
                errorMessage += ` lower than ${args[0].mix}`;
              }
            }
            response[fieldName].messages.push(errorMessage);
            errorMessage = '';
          }
          if (method === 'isNotEmpty') {
            response[fieldName].messages.push(`${friendlyFieldName} can't be empty`);
          }
        }
      });
    });
    console.log(response);

    return response;
  }
}

function displayError(field) {
  return (
    <div className="fv-messages red">
      { field.messages.map(message => <div className="fv-message">{message}</div>) }
    </div>
  );
}

export const FVDisplayError = props =>
  (props.field && !props.field.isValid && displayError(props.field)) || '';

const validation = new FormValidate([
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

class FormValidator extends Component {
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

export default FormValidator;
