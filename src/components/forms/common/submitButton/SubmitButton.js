import React from 'react';

const SubmitButton = props => {
  
    return (
      <button className="btn btn-info btn-lg btn-block" 
        onClick={e => {
          e.preventDefault();
          !props.disabled ? props.handleClick() : e.preventDefault();
        }}
      >
        {props.title}
      </button>
    );
  };
  export default SubmitButton;