import React from 'react';
import validator from 'validator';

// Add isNotEmpty rules to validator package
validator.isRequired = value => !!value.replace(' ', '');
validator.isSelected = value => value !== '0';

function displayError(field) {
  return (
    <div className="fv-messages text-danger">
      {field.messages.map((message, i) => (
        <div className="fv-message">{message}</div>
      ))}
    </div>
  );
}

export const FVDisplayError = props => {
  const field =
    (props.index || props.index === 0) && props.field
      ? props.field[props.index]
      : props.field;
  return (field && !field.isValid && displayError(field)) || '';
};

export class FormValidator {
  constructor(validations) {
    this.validations = validations;
    this.formIsValid = true;
  }
  capitalize = word => word[0].toUpperCase() + word.slice(1);
  checkRule(friendlyFieldName, state, field, fieldName, fieldValue) {
    const response = { isValid: true, messages: [] };
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
        this.formIsValid = false;
        if (method === 'equals') {
          let matchingFieldName = this.validations.find(
            fld => fld.fieldName === args[0]
          );
          matchingFieldName = matchingFieldName.friendlyName
            ? matchingFieldName.friendlyName
            : matchingFieldName.fieldName;
          response.messages.push(`
            ${friendlyFieldName} doesn't match ${this.capitalize(
            matchingFieldName
          )} field`);
        }
        if (method === 'isAlpha') {
          response.messages.push(`
            ${friendlyFieldName} should only contain letters`);
        }
        if (method === 'isEmail') {
          response.messages.push(`
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
          response.messages.push(errorMessage);
          errorMessage = '';
        }
        if (method === 'isRequired') {
          response.messages.push(`${friendlyFieldName} is required`);
        }
        if (method === 'isSelected') {
          response.messages.push(`${friendlyFieldName} is required`);
        }
        if (method === 'isISO8601') {
          response.messages.push(`
            ${friendlyFieldName} is not a valid date`);
        }
      }
    });
    return response;
  }
  validate(state) {
    this.formIsValid = true;
    const response = { isValid: this.formIsValid };
    this.validations.forEach(field => {
      const { fieldName } = field;
      const friendlyFieldName =
        field.friendlyName && this.capitalize(field.friendlyName) ||
        this.capitalize(fieldName);
      // Initialize field properties
      if (state[fieldName] instanceof Array) {
        // if fieldName is an array of value (ie: checkboxes or multiple dropdown)
        response[fieldName] = [];
        state[fieldName].forEach(arrayEl => {
          const fieldValue = arrayEl.toString();
          const thisField = this.checkRule(friendlyFieldName, state, field, fieldName, fieldValue);
          response[fieldName].push(thisField);
        });
      } else {
        response[fieldName] = this.checkRule(friendlyFieldName, state, field, fieldName, state[fieldName]);
      }
    });
    // console.log(response);
    response.isValid = this.formIsValid;
    return response;
  }
}