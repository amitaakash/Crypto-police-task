import React from 'react';
import SubmitButton from '../common/submitButton/SubmitButton';
import FormControl from '../common/formControl/FormControl';
import './RegisterForm.css';

const Label = lableText => {
    return (
      <div className="col-md-4 pr-4">
        <div>{lableText}</div>
      </div>
    );
  };
  
  const RegisterForm = ({
    email,
    phone,
    category,
    password,
    agreement,
    handleChange,
    handleShowPasswordClick,
    handleRegisterClick
  }) => {
    return (
      <div className="register-form">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mb-4">Register</h1>
          </div>
        </div>
        <div className="row form-group">
        {Label("Email")}
        <div className="col-md-8">
          <FormControl {...email} handleChange={handleChange} id="email" />
        </div>
      </div>
      <div className="row form-group">
        {Label("Mobile")}
        <div className="col-md-8">
          <FormControl
            {...phone}
            handleChange={handleChange}
            id="intlPhoneInput"
          />
        </div>
      </div>
      <div className="row form-group">
        {Label("Category")}
        <div className="col-md-8">
          <FormControl {...category} handleChange={handleChange} id="category" />
        </div>
      </div>
      <div className="row form-group">
        {Label("Password")}
        <div className="col-md-8">
          <FormControl
            {...password}
            handleChange={handleChange}
            id="password"
            handleShowPasswordClick={handleShowPasswordClick}
          />
        </div>
      </div>
      <div className="row form-group">
        {Label("")}
        <div className="col-md-8">
          <FormControl
            {...agreement}
            handleChange={handleChange}
            id="agreement"
          />
        </div>
      </div>
      <div className="row form-group">
        {Label("")}
        <div className="col-md-8">
           <SubmitButton
            title="Register"
            disabled={!agreement.isChecked}
            handleClick={() => {
              handleRegisterClick("register");
            }}
          />
        </div>
      </div>
      </div>
    );
  };

export default RegisterForm;