import React, { useState } from "react";
import { saveExcel, loadExcelAsync } from "./utils/excel";
import { loadPredictions } from "./api/api";
import DataTable from "./components/table";
import { concatProductdataPredictions } from "./utils/parse";
import { FileUpload } from "./components/fileUpload";
import ActivityIndicator from "./components/activityIndicator";
import { useFakeLoaderState } from "react-progress-hook";

function App() {
  const [data, setData] = useState(undefined);
  const [filename, setFilename] = useState("");
  const [suggestionNumber, setSuggestionNumber] = useState(3);
  const tableLoaderState = useFakeLoaderState({
    expectedStepTime: 5000
  });

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

    setFilename(file.name);

    let result = await loadExcelAsync(file);
    let data = await loadPredictionsAsync(result);

    setData(data);
  };

  const loadPredictionsAsync = async inputData =>
    loadPredictions({
      data: inputData,
      numberOfSuggestions: suggestionNumber,
      onProgress: tableLoaderState.onProgress
    })
      .then(resultArray => {
        let predictionData = resultArray.flat();

        return concatProductdataPredictions(inputData, predictionData);
      })
      .catch(response => console.log(response));

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
      {!tableLoaderState.isLoading && keys && values && (
        <DataTable keys={keys} values={values}></DataTable>
      )}
      {tableLoaderState.isLoading && (
        <ActivityIndicator
          displayPercentage={tableLoaderState.displayPercentage}
        />
      )}
    </div>
  );
}

export default App;
