import React from "react";
import Dropzone from "react-dropzone";

const handleOnFileDrop = (acceptedFiles, onFileSelected) => {
  onFileSelected(acceptedFiles[0]);
};

const handleDropRejection = e => {
  alert("Please select an image file!!");
};

const FileUploader = ({ onFileSelected, avatar }) => {
  return (
    <Dropzone
      onDrop={acceptedFiles => handleOnFileDrop(acceptedFiles, onFileSelected)}
      accept="image/*"
      onDropRejected={handleDropRejection}
    >
      {({ getRootProps, getInputProps }) => (
         <div className="border rounded text-center p-5">
          <div
            {...getRootProps()}
            
          >
            <input {...getInputProps()} name= "file"/>
            <h5>Drag and drop file here</h5>
            <span className="fa fa-file fa-2x"></span>
          </div>
          </div>
      )}
    </Dropzone>
  );
};

export default FileUploader;