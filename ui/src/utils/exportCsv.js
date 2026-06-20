import { saveAs } from "file-saver";

export const exportToCsv = (
  data,
  fileName = "Export"
) => {

  if (!data?.length) return;

  const headers =
    Object.keys(data[0]);

  const csvRows = [];

  csvRows.push(
    headers.join(",")
  );

  data.forEach(row => {

    const values =
      headers.map(header => {

        const value =
          row[header] ?? "";

        return `"${value}"`;

      });

    csvRows.push(
      values.join(",")
    );

  });

  const csvString =
    csvRows.join("\n");

  const blob =
    new Blob(
      [csvString],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    );

  saveAs(
    blob,
    `${fileName}.csv`
  );
};