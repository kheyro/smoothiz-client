import React from 'react';
import validator from 'validator';

// Add isNotEmpty rules to validator package
validator.isNotEmpty = value => !!value.replace(' ', '');

function displayError(field) {
  return (
    <div className="fv-messages text-danger">
      {field.messages.map(message => (
        <div className="fv-message">{message}</div>
      ))}
    </div>
  );
}

export const FVDisplayError = props =>
  (props.field && !props.field.isValid && displayError(props.field)) || '';

export class FormValidator {
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