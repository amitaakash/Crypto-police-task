import React from 'react';

const TextPlaceHolder = props => {
   
    return (
        <div className="text-center">
        <h1>{props.header}</h1>
        <h5>{props.content}</h5>
        </div>
    );
}

export default TextPlaceHolder;