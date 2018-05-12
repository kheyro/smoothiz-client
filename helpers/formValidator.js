import React from 'react';
import validator from 'validator';

// Add isNotEmpty rules to validator package
validator.isRequired = value => !!value.replace(' ', '');

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
        const fieldValue = state[fieldName].toString();
        if (typeof rule === 'object') {
          [method] = Object.keys(rule);
          args = rule[method];
        } else {
          method = rule;
        }
        // Construct function call with right argument format
        if (method === 'equals') {
          test = validator[method](fieldValue, state[args[0]]);
        } else {
          test = validator[method](fieldValue, ...args);
        }

        // Create response object with error messages
        // || because validator consider empty as falsy
        // we don't to test when it is not empty and not required
        if (
          (field.rules.includes('isRequired') && !test) ||
          (fieldValue !== '' && !test)
        ) {
          response.isValid = false;
          response[fieldName].isValid = false;
          if (method === 'equals') {
            let matchingFieldName = this.validations.find(
              fld => fld.fieldName === args[0]
            );
            matchingFieldName = matchingFieldName.friendlyName
              ? matchingFieldName.friendlyName
              : matchingFieldName.fieldName;
            response[fieldName].messages.push(`
            ${friendlyFieldName} doesn't match ${this.capitalize(
              matchingFieldName
            )} field`);
          }
          if (method === 'isAlpha') {
            response[fieldName].messages.push(`
            ${friendlyFieldName} should only contain letters`);
          }
          if (method === 'isEmail') {
            response[fieldName].messages.push(`
            ${friendlyFieldName} is not a valid email address`);
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
          if (method === 'isRequired') {
            response[fieldName].messages.push(`
            ${friendlyFieldName} is required`);
          }
          if (method === 'isISO8601') {
            response[fieldName].messages.push(`
            ${friendlyFieldName} is not a valid date`);
          }
        }
      });
    });
    // console.log(response);

    return response;
  }
}