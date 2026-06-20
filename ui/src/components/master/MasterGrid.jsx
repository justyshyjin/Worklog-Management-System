import {
  AgGridReact
} from "ag-grid-react";

const MasterGrid = ({
  rows,
  onEdit,
  onDelete
}) => {

  const columns = [

    {
      field: "id",
      width: 100
    },

    {
      field: "name",
      flex: 1
    },

    {
      field: "description",
      flex: 2
    },

    {
      headerName: "Actions",

      width: 180,

      cellRenderer: (
        params
      ) => {

        return (
          <div>

            <button
              onClick={() =>
                onEdit(
                  params.data
                )
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(
                  params.data
                )
              }
            >
              Delete
            </button>

          </div>
        );
      }
    }
  ];

  return (
    <div
      className="
      ag-theme-alpine
      task-grid
      "
    >
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        pagination={true}
      />
    </div>
  );
};

export default MasterGrid;