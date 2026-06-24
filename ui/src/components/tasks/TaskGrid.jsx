import { useState, useRef, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SnackbarAlert from "../common/SnackbarAlert";

import TaskActions from "./TaskActions";

import QuickReports from "../filters/QuickReports";
import SavedFilters from "../filters/SavedFilters";
import AdvancedTaskFilters from "../filters/AdvancedTaskFilters";

import ExportToolbar from "../export/ExportToolbar";

import taskService from "../../api/taskService";

import ViewTask from "../modals/ViewTask";

import "../../styles/TaskGrid.css";


const TaskGrid = () => {


  const gridRef = useRef();



  const [selectedRows, setSelectedRows] =
    useState([]);



  const [filters, setFilters] =
    useState({
      search: "",
      status: "",
      project: "",
      platform: "",
      created_from: "",
      created_to: "",
      min_hours: "",
      max_hours: ""
    });



  // const {
  //   tasks,
  //   fetchTasks
  // } = useTasks();

  const [tasks, setTasks] = useState([]);

  const [alert, setAlert] = useState({

    open: false,

    message: "",

    severity: ""

  });

  const [loading, setLoading] =
    useState(false);

  const [
    viewOpen,
    setViewOpen
  ] = useState(false);

  const [
    selectedTask,
    setSelectedTask
  ] = useState(null);

  const fetchTasks = useCallback(
    async () => {

      try {

        setLoading(true);

        const response =
          await taskService.getTasks();

        setTasks(
          response.data
        );

      }
      catch (error) {

        console.error(
          error
        );

      }
      finally {

        setLoading(false);

      }

    },
    []
  );

  useEffect(() => {

    fetchTasks();

    const refreshTasks = () => {

      fetchTasks();

    };


    window.addEventListener(
      "task-created",
      refreshTasks
    );


    return () => {


      window.removeEventListener(
        "task-created",
        refreshTasks
      );


    };


  }, [fetchTasks]);





  const handleStatusChange = async (row) => {

    try {

      const response = await taskService.changeStatus(
        row.id
      );


      await fetchTasks();

      // console.log(response.data);
      
      setAlert({

        open: true,

        message:
          response.data.message,

        severity:
          "success",

        duration: 3000,

        onClose: () => {

          setAlert(prev => ({
            ...prev,
            open: false
          }));

        }

      });

    }
    catch (error) {

      handleStatusBlocked(
        error.response.data.detail
      );
      console.error(
        "Status change failed",
        error
      );

    }

  };

  const handleStatusBlocked = (
    message
  ) => {

    setAlert({

      open: true,

      message,

      severity:
        "warning",

      duration: 3000,

      onClose: () => {

        setAlert(prev => ({
          ...prev,
          open: false
        }));

      }

    });

  };



  const handleView =
    (params) => {


      setSelectedTask(
        params.data
      );


      setViewOpen(true);


    };





  const handleEdit =
    (row) => {

      console.log(
        "Edit",
        row
      );

    };


  const handleDelete =
    async (row) => {


      try {

        await taskService.deleteTask(
          row.id
        );


        setViewOpen(false);


        await fetchTasks();


      }
      catch (error) {

        console.error(error);

      }


    };


  const columns = [

    {
      field: "id",
      headerName: "ID",
      width: 80
    },


    {
      field: "task_details",
      headerName: "Task",
      flex: 2
    },


    {
      field: "project",
      headerName: "Project",
      width: 150
    },


    {
      field: "task_status",
      headerName: "Status",
      width: 150,


      cellRenderer: (params) => {


        const value =
          params.value || "";


        const cls =
          "status " +
          value
            .toLowerCase()
            .replace(
              /\s+/g,
              "_"
            );


        return (

          <span className={cls}>

            {value}

          </span>

        );


      }


    },


    {
      field: "task_type",
      headerName: "Type",
      width: 150
    },


    {
      field: "task_source",
      headerName: "Task Source",
      width: 150
    },


    {
      field: "total_minutes",
      headerName: "Hours",
      width: 120
    },


    {
      headerName: "Actions",

      width: 160,


      cellRenderer: (params) => (

        <TaskActions

          row={params.data}

          onStatusChange={
            handleStatusChange
          }
          onStatusBlocked={
            handleStatusBlocked
          }
          onEdit={
            handleEdit
          }

          onDelete={
            handleDelete
          }

        />

      )


    }


  ];





  return (

    <div className="task-grid-container">


      <div className="export-toolbar">


        <ExportToolbar

          rowData={tasks}

          selectedRows={selectedRows}

        />


      </div>


      {/* <QuickReports
onSelect={(data)=>
setFilters({
...filters,
...data
})
}
/> */}



      {/* <SavedFilters
onSelect={(saved)=>
setFilters(
saved.filter_json
)
}
/> */}



      {/* <AdvancedTaskFilters
filters={filters}
setFilters={setFilters}
onApply={fetchTasks}
onReset={()=>{
setFilters({
search:"",
status:"",
project:"",
platform:"",
created_from:"",
created_to:"",
min_hours:"",
max_hours:""
});

fetchTasks();

}}
/> */}





      <div

        className="ag-theme-alpine"

        style={{
          height: "600px",
          width: "100%"
        }}

      >


        <AgGridReact


          theme="legacy"


          ref={gridRef}


          rowData={tasks}


          columnDefs={columns}


          pagination={true}


          paginationPageSize={20}


          onRowClicked={(params) => {

            if (
              params.event.target.closest(
                ".task-actions"
              )
            ) {
              return;
            }

            handleView(params);

          }}

          rowSelection={{
            mode: "multiRow",
            checkboxes: true,
            headerCheckbox: true
          }}



          onSelectionChanged={() => {

            const selected =
              gridRef.current.api
                .getSelectedRows();


            setSelectedRows(
              selected
            );

          }}

          getRowClass={(params) => {

            const status =
              params.data?.task_status
                ?.toLowerCase()
                .replace(
                  /\s+/g,
                  "_"
                );


            return status
              ?
              `row-${status}`
              :
              "";


          }}


        />


      </div>





      <ViewTask


        open={viewOpen}


        onClose={() =>

          setViewOpen(false)

        }

        task={selectedTask}

        onEdit={() => {

          handleEdit(
            selectedTask
          );

        }}

        onDelete={() => {


          handleDelete(
            selectedTask
          );


        }}



      />


      <SnackbarAlert

        alert={alert}

      />
    </div>

  );


};


export default TaskGrid;