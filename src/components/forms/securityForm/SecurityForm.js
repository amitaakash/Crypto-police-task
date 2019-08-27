import React from 'react';
import SubmitButton from '../common/submitButton/SubmitButton';
import TextPlaceHolder from '../../textPlaceHolder/TextPlaceHolder';
import BackButton from '../common/backButton/BackButton';
import './SecurityForm.css';
import FormControl from '../common/formControl/FormControl';


const dispHeader = () => {
    return (
        <div>
            <TextPlaceHolder 
            header="Create your security code"
            content="Enter code below"
            />
        </div>
    );
}

const dispFooterButtons = (goToPrevStep, handleSaveBtnClick) => {
    return (
      <div>
        <div className="row mt-5">
          <div className="col-md-12">
            <SubmitButton
              title="Save and go further"
              handleClick={() => {
                handleSaveBtnClick("securitycode");
              }}
              
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <BackButton title="Or go back!" handleClick={goToPrevStep} />
          </div>
        </div>
      </div>
    );
  };

const SecurityForm = ({
    securityCode,
    handleChange,
    goToPrevStep,
    handleSaveBtnClick,
    
  }) =>{
    return(
        <div className="security-form">
            {dispHeader()}
            <div className="mt-3">
            <FormControl
            {...securityCode}
            handleChange={handleChange}
            id="securityCode"
            styles={{ textAlign: "center" }}
          /></div>
           {dispFooterButtons(goToPrevStep, handleSaveBtnClick)}
            
        </div>
    );

}

export default SecurityForm;