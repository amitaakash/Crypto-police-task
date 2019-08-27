import React from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import uuid from 'uuid/v4'

class FormControl extends React.Component {
    constructor(props) {
      super(props);
      this.flagRef = React.createRef();
    }
  
    componentDidUpdate(prevProps) {
      if (prevProps.defaultCountry !== this.props.defaultCountry) {
        let { value } = this.props;
        let updatedFlag = value.substring(0, value.indexOf("-"));
        this.flagRef.current.updateFlagFromNumber(updatedFlag);
      }
    }
  
    displayFormField = ({
      valid,
      value,
      placeholder,
      touched,
      type,
      element,
      handleChange,
      id,
      name,
      options,
      handleShowPasswordClick,
      showPassword,
      labelText,
      styles,
      inputPhoneVal,
      errorMessage,
      defaultCountry
    }) => {
      switch (element) {
        case "input":
          return type === "password" ? (
            <>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  onChange={e => handleChange(e, id)}
                  value={value}
                  className={
                    !valid && touched ? "form-control is-invalid" : "form-control"
                  }
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-dark"
                    onClick={e => {
                      e.preventDefault();
                      handleShowPasswordClick();
                    }}
                  >
                    <i
                      className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
                    />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <input
                type={type}
                placeholder={placeholder}
                onChange={e => handleChange(e, id)}
                value={value}
                className={
                  !valid && touched ? "form-control is-invalid" : "form-control"
                }
                style={{ ...styles }}
              />
              {this.renderInvalidFeedback(errorMessage)}
            </>
          );
  
        case "select":
          return (
            <>
              <select
                value={value}
                onChange={e => handleChange(e, id)}
                className={
                  !valid && touched ? "form-control is-invalid" : "form-control"
                }
              >
                {this.renderSelectOptions(options, placeholder, id)}
              </select>
            </>
          );
  
        case "intlPhoneInput":
          let initVal = inputPhoneVal;
          return (
            <>
              <IntlTelInput
                containerClassName="intl-tel-input"
                value={inputPhoneVal}
                inputClassName={
                  !valid && touched ? "form-control is-invalid" : "form-control"
                }
                ref={this.flagRef}
                autoPlaceholder={true}
                defaultCountry={defaultCountry}
                onPhoneNumberChange={(isValid, value, countryData) => {
                  if (value !== initVal) {
                    handleChange({}, "intlPhoneInput", {
                      value: value,
                      countryData: countryData
                    });
                  }
                }}
                onSelectFlag={(value, countryData) => {
                  handleChange({}, "intlPhoneInput", {
                    value: value,
                    countryData: countryData
                  });
                }}
              />
              {touched && !valid ? (
                <div className="small text-danger">{errorMessage}</div>
              ) : (
                ""
              )}
            </>
          );
  
        case "checkbox":
          return (
            <div className="form-check" style={{ paddingLeft: "0" }}>
              <label className="form-check-label" htmlFor={id}>
                <input
                  type="checkbox"
                  value={value}
                  onChange={e => handleChange(e, id)}
                  id={id}
                  style={{
                    height: "1.01rem",
                    width: "1.01rem",
                    verticalAlign: "middle"
                  }}
                />
                <label htmlFor={id} className="ml-2">
                  {labelText}
                </label>
              </label>
            </div>
          );
  
        default:
          return null;
      }
    };
  
    renderInvalidFeedback = msg => {
      return <div className="invalid-feedback">{msg}</div>;
    };
  
    renderSelectOptions = (options, placeholder, id) => {
      let optionsToRender = options.map(option => (
        <option
          value={id === "country" ? option.name : option.value}
          key={uuid()}
        >
          {option.name}
        </option>
      ));
      optionsToRender = [
        <option value="" key={uuid()}>
          {placeholder}
        </option>,
        ...optionsToRender
      ];
      return optionsToRender;
    };
  
    render() {
      return <>{this.displayFormField(this.props)}</>;
    }
  }
  
  export default FormControl;
  