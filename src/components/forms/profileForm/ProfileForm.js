import React from 'react';
import './ProfileForm.css';
import SubmitButton from '../common/submitButton/SubmitButton';
import BackButton from '../common/backButton/BackButton';
import FileUploader from '../common/fileUploader/FileUploader';
import FormControl from '../common/formControl/FormControl';
//import Spinner from '../common/spinner/Spinner'
import axios from 'axios';

class ProfileForm extends React.Component {
    state = {
      file: null,
      uploading: false,
      imageUploadErr: false
    };
    dispLabel = lableText => {
        return (
          <div className="col-md-4">
            <div>{lableText}</div>
          </div>
        );
      };

dispFooterButtons = (goToPrevStep, handleSaveBtnClick) => {
    return (
      <div>
        <div className="row mt-5">
          <div className="col-md-12">
            <SubmitButton
              title="Save and go further"
              handleClick={() => {
                handleSaveBtnClick("userprofile");
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


  renderSpinner = () => {
    return (
      <div className="text-center">
        <div className=" spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  handleImageUpload = () => {
    const { file } = this.state;
    let formData = new FormData();
    formData.append("photo", file);
    axios
      .post("http://localhost:5000/upload", formData)
      .then(res => {
        console.log(res.data.imageId);
        this.props.handleAvatarChange("http://localhost:5000/"+res.data.imageId);
        this.setState({ uploading: false });
      })
      .catch(err => {
        this.setState({ imageUploadErr: true, uploading: false });
        console.log(err);
      });
  };

  handleFileSelection = file => {
    this.setState({ file: file, uploading: true }, () => {
      this.handleImageUpload();
    });
  };

  renderFileUploader = () => {
    if (this.props.avatar.value.trim() === "") {
      return (
        <div className="col-md-8">
          {!this.state.uploading && !this.state.imageUploadErr ? (
            <FileUploader
              onFileSelected={this.handleFileSelection}
              avatar={this.props.avatar}
            />
          ) : this.state.imageUploadErr && !this.state.uploading ? (
            <p className="small text-danger">
              Sorry, some error occured while uploading the image, please
              refresh the page and try again
            </p>
          ) : (
            this.renderSpinner()
          )}
        </div>
      );
    } else {
      return (
        <div className="col-md-8">
          <p className="small text-success my-1 mb-0">
            Avatar was uploaded successfuly !
          </p>
        </div>
      );
    }
  };

  render() {
    const {
      name,
      website,
      country,
      handleChange,
      goToPrevStep,
      handleSaveBtnClick
    } = this.props;

    return (
      <div className="profile-form">
        <h3 className="text-center mb-4">Complete your user profile</h3>
        <div className="row form-group">
          {this.dispLabel("Name")}
          <div className="col-md-8">
            <FormControl {...name} handleChange={handleChange} id="name" />
          </div>
        </div>
        <div className="row form-group">
          {this.dispLabel("Website")}
          <div className="col-md-8">
            <FormControl {...website} handleChange={handleChange} id="website" />
          </div>
        </div>
        <div className="row form-group">
          {this.dispLabel("Country")}
          <div className="col-md-8">
            <FormControl {...country} handleChange={handleChange} id="country" />
          </div>
        </div>
        <div className="row">
          {this.dispLabel("Avatar")}
          {this.renderFileUploader()}
        </div>
        <div className="row form-group">
          {this.dispLabel("")}
          <div className="col-md-8">
            {this.dispFooterButtons(goToPrevStep, handleSaveBtnClick)}
          </div>
        </div>
      </div>
    );
  }
}


export default ProfileForm;
