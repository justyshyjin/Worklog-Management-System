import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPdf = (
  data,
  fileName = "Export"
) => {

  if (!data?.length) return;

  const doc =
    new jsPDF();

  const headers =
    Object.keys(data[0]);

  const rows =
    data.map(row =>
      headers.map(
        key => row[key]
      )
    );

  doc.setFontSize(16);

  doc.text(
    fileName,
    14,
    15
  );

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 25
  });

  doc.save(
    `${fileName}.pdf`
  );
};