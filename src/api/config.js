const API_KEY = process.env.REACT_APP_API_KEY;

export const commonAxiosRequestConfig = {
  crossDomain: true,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json"
  }
};
