export const dataModelToDto = (dataModel, numberOfSuggestions) => {
  const input = dataModel.map(model => {
    return { ...model, "Number of Suggestions": numberOfSuggestions };
  });

  return {
    Inputs: {
      Input: input
    },
    GlobalParameters: {}
  };
};

export const excelArrayToProductModels = excelArray => {
  const keys = excelArray[0];
  return excelArray
    .slice(1, excelArray.length)
    .map(array => arrayToProductModel(array, keys));
};

export const arrayToProductModel = (array, keys) => {
  let productModel = {};
  keys.forEach((key, index) => {
    productModel[key] = array[index];
  });
  return productModel;
};

export const concatProductdataPredictions = (inputData, predictionData) => {
  return inputData.map((input, index) => {
    return { ...input, ...predictionData[index]?.items?.OutputItem };
  });
};
