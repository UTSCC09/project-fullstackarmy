import * as XLSX from 'xlsx';
import { MapExcelThreshold, ExcelBookData } from './MapConstants';

export const mapExcelDownload = (
  bookName: string,
  bookData: ExcelBookData[],
  valueName: string,
  thresholds: MapExcelThreshold[]
) => {
  let workBook = XLSX.utils.book_new();

  thresholds.forEach((threshold) => {
    let sheetData = [[], ['', 'Country Name', 'Iso Code', 'Percentage']];

    bookData.forEach((country) => {
      if (
        isNaN(country[valueName]) ||
        country[valueName] === null ||
        country[valueName] === undefined
      ) {
        sheetData.push(['', country.isoCodeName, country.isoCode, 'N/A']);
      }

      if (
        country[valueName] >= threshold.lowerBound &&
        country[valueName] <= threshold.upperBound
      ) {
        sheetData.push([
          '',
          country.isoCodeName,
          country.isoCode,
          country[valueName],
        ]);
      }
    });

    let workSheet = XLSX.utils.aoa_to_sheet(sheetData);

    let columnWidths = [{ wch: 8 }, { wch: 20 }, { wch: 12 }, { wch: 12 }];

    workSheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workBook, workSheet, threshold.sheetName);
  });

  XLSX.writeFile(workBook, `${bookName}.xlsx`);
};
