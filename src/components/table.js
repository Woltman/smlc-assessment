import React from "react";

const dataTable = ({ keys, values }) => {
  return (
    <table className="tbl-main">
      <thead>
        <tr>
          {keys.map(key => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {values.map((object, valueIndex) => (
          <tr key={valueIndex}>
            {object.map((value, keyIndex) => (
              <td key={value + keyIndex}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default dataTable;
