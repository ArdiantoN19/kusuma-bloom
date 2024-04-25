import ExcelJs from "exceljs";
import path from "path";
import fs from "fs";

export const writeFileAsync = async (filename: string, data: any) => {
  const pathname = process.cwd() + "/public/report";
  if (!fs.existsSync(pathname)) {
    fs.mkdirSync(pathname);
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(`${pathname}/${filename}`, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("file successfully saved!");
      }
    });
  });
};

const readFileAsBase64 = (filePath: string) => {
  try {
    const imagefile = fs.readFileSync(filePath);
    const base64Data = Buffer.from(imagefile).toString("base64");
    const dataUrl = `data:image/png;base64,${base64Data}`;

    return dataUrl;
  } catch (error) {
    console.error("Error when reading file: ", error);
    return null;
  }
};

export const generateExcel = async (data: any[], filename: string) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet(filename, {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
    },
  });

  // initialize row index
  let rowIndex: number = 2;

  // Add header in row number 2
  let row = worksheet.getRow(rowIndex);
  row.values = Object.keys(data[0]).map((key) => key.toUpperCase());
  row.font = { bold: true };

  const columnsWidths: number[] = Object.keys(data[0]).map((key) => {
    return key.length * 1.2;
  });

  // set column width in every row
  row.eachCell((cell, colNumber) => {
    const columnIndex = colNumber - 1;
    const columnWidth = columnsWidths[columnIndex];
    worksheet.getColumn(colNumber).width = columnWidth;
  });

  // loop data
  data.forEach((row) => {
    const rowData: any[] = [];
    const headers = Object.keys(data[0]);
    headers.forEach((header) => rowData.push(row[header]));
    worksheet.addRow(rowData);
  });

  // increment the row index
  rowIndex += data.length;

  // merge cell for logo
  worksheet.mergeCells(
    `A1:${String.fromCharCode(65 + worksheet.columns.length - 1)}1`
  );

  const logoBase64 = readFileAsBase64(
    path.join(process.cwd(), "public/images/logo-telaga-kusuma.png")
  );
  // assign logo to the merged cell
  const image = workbook.addImage({
    base64: logoBase64!,
    extension: "png",
  });

  worksheet.addImage(image, {
    tl: { col: 0, row: 0 },
    ext: { width: 50, height: 50 },
  });

  worksheet.getRow(1).height = 50;

  // Define the border style
  const borderStyle: Record<string, any> = {
    style: "thin",
    color: { argb: "00000000" },
  };

  // Loop through the cells and apply the border style
  worksheet.eachRow((row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: borderStyle,
        bottom: borderStyle,
      };
    });
  });

  // Generate the xls file
  return workbook.xlsx.writeBuffer();
};
