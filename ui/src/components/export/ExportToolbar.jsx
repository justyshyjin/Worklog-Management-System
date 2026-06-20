import {
  Button,
  Stack
} from "@mui/material";

import FileDownloadIcon
from "@mui/icons-material/FileDownload";

import PictureAsPdfIcon
from "@mui/icons-material/PictureAsPdf";

import TableViewIcon
from "@mui/icons-material/TableView";

import GridOnIcon
from "@mui/icons-material/GridOn";

import {
  exportToExcel
} from "../../utils/exportExcel";

import {
  exportToCsv
} from "../../utils/exportCsv";

import {
  exportToPdf
} from "../../utils/exportPdf";

const ExportToolbar = ({
  data = [],
  fileName = "Export"
}) => {

  return (

    <Stack
      direction="row"
      spacing={2}
      sx={{
        mb: 2
      }}
    >

      <Button
        startIcon={
          <GridOnIcon />
        }
        variant="contained"
        color="success"
        onClick={() =>
          exportToExcel(
            data,
            fileName
          )
        }
      >
        Excel
      </Button>

      <Button
        startIcon={
          <TableViewIcon />
        }
        variant="contained"
        color="info"
        onClick={() =>
          exportToCsv(
            data,
            fileName
          )
        }
      >
        CSV
      </Button>

      <Button
        startIcon={
          <PictureAsPdfIcon />
        }
        variant="contained"
        color="error"
        onClick={() =>
          exportToPdf(
            data,
            fileName
          )
        }
      >
        PDF
      </Button>

    </Stack>

  );
};

export default ExportToolbar;