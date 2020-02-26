import XLSX from "xlsx";
import { excelArrayToProductModels } from "./parse";

export const loadExcelAsync = async (file, sheetNumber = 0) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = e => {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[sheetNumber];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
      const productModels = excelArrayToProductModels(dataParse);
      resolve(productModels);
    };

    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};

export const saveExcel = (keys, values) => {
  const ws = XLSX.utils.aoa_to_sheet([keys, ...values]);

  /*set width in sheet*/
  const wscols = keys.map(key => {
    return { wpx: 200 };
  });
  ws["!cols"] = wscols;

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "tabel 1");
  /* generate XLSX file and send to client */
  XLSX.writeFile(wb, "productData.xlsx");
};
