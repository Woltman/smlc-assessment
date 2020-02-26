import React from "react";
import "./fileUpload.css";

export const FileUpload = ({ onFileSelected, filename }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <input
        type="file"
        id="file"
        onChange={onFileSelected}
        onClick={event => {
          event.target.value = null;
        }}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <label htmlFor="file" className="custom-file-upload">
        Choose a file
      </label>
      <span className="filename">{filename}</span>
    </div>
  );
};
