import React from 'react';
import Stepper from "react-stepper-horizontal";

const StepperHorizontal = props => {
    return (
      <div className="form-step">
        <Stepper {...props} />
      </div>
    );
  };

  export default StepperHorizontal;