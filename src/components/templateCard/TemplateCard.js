import React from 'react';
import './TemplateCard.css'

const TemplateCard = props => {
    return(
        <div className="card mt-5">
            <div className="card-body">
                {props.children}
            </div>
        </div>
    );
}

export default TemplateCard;