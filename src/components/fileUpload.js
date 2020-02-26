import React from "react";

export const FileUpload = ({ onFileSelected, filename }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        onChange={onFileSelected}
        onClick={event => {
          event.target.value = null;
        }}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <label htmlFor="file" className="btn-primary">
        Choose a file
      </label>
      <span className="filename" style={{ paddingLeft: 10 }}>
        {filename}
      </span>
    </div>
  );
};
