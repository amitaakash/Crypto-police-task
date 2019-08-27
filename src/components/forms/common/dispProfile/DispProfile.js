import React from 'react';

const DispProfile = ({
  avatar,
  name,
  category,
  email,
  country,
  intlPhoneInput,
  website
}) => {
  return (
    <div className="container mr-2 ml-2">
      <div className="row">
        <div className="col-md4">
          <img src= {avatar} alt="avatar" className="img-thumbnail"/>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-4">Name:</div>
            <div className="col-md-8">{name}</div>
          </div>
          <div className="row">
            <div className="col-md-4">Email:</div>
            <div className="col-md-8">{email}</div>
          </div>
          <div className="row">
            <div className="col-md-4">Mobile :</div>
            <div className="col-md-8">{intlPhoneInput}</div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-4">Category :</div>
            <div className="col-md-8">{category}</div>
          </div>
          <div className="row">
            <div className="col-md-4">Country :</div>
            <div className="col-md-8">{country}</div>
          </div>
          <div className="row">
            <div className="col-md-4">Website :</div>
            <div className="col-md-8">{website}</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DispProfile;