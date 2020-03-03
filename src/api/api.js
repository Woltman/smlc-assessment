import axios from "axios";
import { dataModelToDto } from "../utils/parse";
import { commonAxiosRequestConfig } from "./config";

const API_URL =
  "https://8k0pp3461c.execute-api.eu-central-1.amazonaws.com/api/";
const MAX_BATCH_SIZE = 50;

axios.interceptors.request.use(
  config => {
    // perform a task before the request is sent
    console.log("Request was sent");
    console.log(config);

    return config;
  },
  error => {
    // handle the error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // do something with the response data
    console.log("Response was received");
    console.log(response);

    return response;
  },
  error => {
    // handle the response error
    return Promise.reject(error);
  }
);

export const loadPredictions = async ({
  numberOfSuggestions = 3,
  data,
  onProgress
}) => {
  let batches = arrayToBatches(data, MAX_BATCH_SIZE);

  const inputData = batches.map(batch =>
    dataModelToDto(batch, numberOfSuggestions)
  );

  let fetchCalls = [];
  onProgress &&
    onProgress({ total: inputData.length, done: fetchCalls.length });

  for (const input of inputData) {
    let res = await loadPrediction(input);
    fetchCalls.push(res);

    onProgress &&
      onProgress({ total: inputData.length, done: fetchCalls.length });
  }

  return fetchCalls;
};

const loadPrediction = async input => {
  return axios
    .post(API_URL, input, commonAxiosRequestConfig)
    .then(
      response => response.data.ExecutionResults.Results.ExecutionOutputs.Output
    );
};

const arrayToBatches = (array, batchSize) => {
  var tempArray = [];

  for (let i = 0; i < array.length; i += batchSize) {
    let batch = array.slice(i, i + batchSize);
    tempArray.push(batch);
  }

  return tempArray;
};
