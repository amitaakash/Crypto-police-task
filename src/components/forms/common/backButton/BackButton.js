import React from 'react';

const BackButton = props => {
    return (
      <button
        className="btn btn-link btn-lg mt-3"
        style={{ ...props.style }}
        onClick={e => {
          e.preventDefault();
          props.handleClick();
        }}
      >
        {props.title}
      </button>
    );
  };

  export default BackButton;