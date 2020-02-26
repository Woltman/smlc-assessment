import React, { useState } from "react";
import { saveExcel, loadExcelAsync } from "./utils/excel";
import { loadPredictions } from "./api/api";
import DataTable from "./components/table";
import { concatProductdataPredictions } from "./utils/parse";
import { FileUpload } from "./components/fileUpload";

function App() {
  const [data, setData] = useState(undefined);
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestionNumber, setSuggestionNumber] = useState(3);

  let keys = [];
  let values = [];

  if (data) {
    keys = Object.keys(data[0]);
    values = data.map(model => Object.values(model));
  }

  const onFileSelected = async event => {
    event.preventDefault();

    let file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setFilename(file.name);

    let result = await loadExcelAsync(file);
    let data = await loadPredictionsAsync(result);

    setIsLoading(false);
    setData(data);
  };

  const loadPredictionsAsync = async inputData => {
    return loadPredictions({
      data: inputData,
      numberOfSuggestions: suggestionNumber
    })
      .then(responseArray => {
        let predictionData = responseArray
          .map(
            response =>
              response.data.ExecutionResults.Results.ExecutionOutputs.Output
          )
          .flat();

        return concatProductdataPredictions(inputData, predictionData);
      })
      .catch(response => console.log(response));
  };

  const handleSuggestionNumberChanged = e => {
    const value = parseInt(e.currentTarget.value);

    if (Number.isInteger(value) && value > 0 && value <= 10) {
      setSuggestionNumber(value);
    }
  };

  return (
    <div className="App">
      Suggestion amount:{" "}
      <input
        style={{ padding: 5, marginRight: 10 }}
        className="suggestionAmount"
        onChange={handleSuggestionNumberChanged}
        type="number"
        min="1"
        max="10"
        step="1"
        value={suggestionNumber}
      />
      <FileUpload
        filename={filename}
        onFileSelected={onFileSelected}
      ></FileUpload>
      {data && (
        <button
          style={{ display: "block", marginBottom: 15, marginTop: 15 }}
          className="btn-primary green"
          onClick={e => saveExcel(keys, values)}
        >
          Download excel
        </button>
      )}
      <DataTable
        keys={keys}
        values={values}
        isLoadingData={isLoading}
      ></DataTable>
    </div>
  );
}

export default App;
