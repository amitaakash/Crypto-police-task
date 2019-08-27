import React from 'react';


const DispComment = ({ commentData }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-4"><img src={commentData.avatar} alt="avatar" className="img-thumbnail" /></div>        
          <div className="col-md-8">
            <h5 className="text-info">{commentData.name}</h5>
            <small>{commentData.date}</small>
            <p>{commentData.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispComment;