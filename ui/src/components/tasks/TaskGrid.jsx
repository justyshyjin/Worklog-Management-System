import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SnackbarAlert from "../common/SnackbarAlert";
import TaskActions from "./TaskActions";

import QuickReports from "../filters/QuickReports";
import SavedFilters from "../filters/SavedFilters";
import FilterPanel from "../filters/FilterPanel";

import { taskFilterFields, taskDefaultFilters } from "../../utils/filters";
import { dateTimeColumn } from "../../utils/formatter";

import ExportToolbar from "../export/ExportToolbar";

import taskService from "../../api/taskService";
import DashboardService from "../../api/dashboardService";

import TaskTimer from "../common/TaskTimer";
import ViewTask from "../modals/ViewTask";
import "../../styles/TaskGrid.css";


const TaskGrid = ({ setDashboardFilters }) => {

  const gridRef = useRef();

  const [selectedRows, setSelectedRows] = useState([]);

  const [filters, setFilters] = useState(taskDefaultFilters);

  const [activeReport, setActiveReport] = useState(null);

  const resetFilters = () => {
    setFilters(taskDefaultFilters);
    setActiveReport(null);
    if (setDashboardFilters) {

      setDashboardFilters({});

    }
    // reload default platform list
    loadFilterOptions();
  };

  const [filterOptions, setFilterOptions] = useState({
    statuses: [],
    projects: [],
    platforms: []
  });

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: ""
  });

  const [viewOpen, setViewOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  /*
      Load dynamic filter values
      Status / Project / Platform

      Initial load:
      - status
      - projects
      - platforms related to user's projects
  */

  const loadFilterOptions = useCallback(async () => {

    try {

      const response =
        await taskService.getFilterOptions("tasks");

      setFilterOptions({
        statuses: response.data?.statuses || [],
        projects: response.data?.projects || [],
        platforms: response.data?.platforms || []
      });

    } catch (error) {
      console.error("Filter option loading failed", error);
    }
  }, []);

  /*
      Load platforms based on selected project
  */

  const loadProjectPlatforms = useCallback(
    async (projectId) => {

      try {
        const response =
          await taskService.getFilterOptions(
            "tasks",
            {
              project_id: projectId
            }
          );
        setFilterOptions(prev => ({
          ...prev,
          platforms: response.data?.platforms || []
        }));
      } catch (error) {
        console.error(
          "Project platform loading failed",
          error
        );
      }
    },
    []
  );

  const [hoursFilterEnabled, setHoursFilterEnabled] = useState(false);
  /*
      Fetch tasks using filters
  */

  const fetchTasks = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(filters);

      setTasks(response.data);

      // console.log(response.data.map(task => task.task_status));
      setHoursFilterEnabled(
        response.data.length > 0 &&
        response.data.every(task =>
          (task.task_status || "").trim().toUpperCase() === "FINISHED")
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  }, []);

  const filterFields = useMemo(() => {
    return taskFilterFields.map(filter => {
      if (filter.key === "hours") {
        return {
          ...filter,
          disabled: !hoursFilterEnabled
        };
      }

      return filter;
    });
  }, [hoursFilterEnabled]);

  useEffect(() => {
    if (!hoursFilterEnabled && filters.hours) {
      setFilters(prev => ({
        ...prev,
        hours: null
      }));
    }
  }, [hoursFilterEnabled, filters.hours]);
  /*
      Initial load
      Filter change reload
  */
  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  /*
      Load filter dropdown values once
  */
  useEffect(() => {
    loadFilterOptions();
  }, [loadFilterOptions]);

  /*
      Task created / updated events
  */
  useEffect(() => {
    const refreshTasks = () => {
      fetchTasks(filters);
    };

    window.addEventListener("task-created", refreshTasks);
    window.addEventListener("task-changed", refreshTasks);
    window.addEventListener("taskstatus-changed", refreshTasks);

    return () => {
      window.removeEventListener("task-created", refreshTasks);
      window.removeEventListener("task-changed", refreshTasks);
      window.removeEventListener("taskstatus-changed", refreshTasks);
    };

  }, [fetchTasks]);


  useEffect(() => {
    if (!hoursFilterEnabled && filters.hours) {
      setFilters(prev => ({
        ...prev,
        hours: null
      }));
    }
  }, [hoursFilterEnabled]);


  /*
      Status change
  */
  const handleStatusChange = async (row) => {
    try {
      const response = await taskService.changeStatus(row.id);
      await fetchTasks(filters);
      window.dispatchEvent(
        new Event("taskstatus-changed")
      );

      setAlert({
        open: true,
        message: response.data.message,
        severity: "success",
        duration: 3000,
        onClose: () => {
          setAlert(prev => ({ ...prev, open: false }));
        }
      });
    } catch (error) {
      handleStatusBlocked(error.response?.data?.detail);
      console.error("Status change failed", error);
    }

  };

  const handleStatusBlocked = (message) => {
    setAlert({
      open: true,
      message,
      severity: "warning",
      duration: 3000,
      onClose: () => {
        setAlert(prev => ({ ...prev, open: false }));
      }
    });

  };

  /*
      Filter change
  */
  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "project") {
        loadProjectPlatforms(value); // optional reload
      }

      // Custom date selected -> clear quick report
      if ((name === "created_from" || name === "created_to") && value) {
        updated.range = null;

        setActiveReport(null);

        setDashboardFilters?.({
          created_from: updated.created_from,
          created_to: updated.created_to,
        });
      }

      // Quick report selected -> clear custom dates
      if (name === "range") {
        updated.created_from = null;
        updated.created_to = null;

        setActiveReport(value || null);

        setDashboardFilters?.(
          value
            ? {
              range: value,
            }
            : {}
        );
      }

      return updated;
    });
  };


  /*
      View task
  */
  const handleView = (params) => {
    setSelectedTask(params.data);
    setViewOpen(true);
  };

  /*
      Edit task
  */
  const handleEdit = (row) => {
    console.log("Edit", row);
  };

  /*
      Delete task
  */
  const handleDelete = async (row) => {
    try {
      await taskService.deleteTask(row.id);
      setViewOpen(false);
      await fetchTasks(filters);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60
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
      width: 140,
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
      width: 130
    },
    {
      field: "task_source",
      headerName: "Task Source",
      width: 130
    },
    dateTimeColumn(
      "started_date",
      "Started At"
    ),
    dateTimeColumn(
      "completed_date",
      "Completed At"
    ),
    {
      field: "total_minutes",
      headerName: "Time",
      width: 120,
      cellRenderer: (params) => {
        return (
          <TaskTimer
            status={params.data.task_status}
            startedDate={params.data.started_date}
            totalMinutes={params.data.total_minutes}
          />
        );
      }
    },
    {
      headerName: "Actions",
      width: 160,
      cellRenderer: (params) => (
        <TaskActions
          row={params.data}
          onStatusChange={handleStatusChange}
          onStatusBlocked={handleStatusBlocked}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )
    }
  ];

  return (
    <div className="task-grid-container">
      <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filters</h3>
      <div className="task_filters">
        <div className="quick-filter-section">
          <QuickReports
            activeReport={activeReport}
            setActiveReport={setActiveReport}
            onSelect={(reportFilters) => {
              handleFilterChange("range", reportFilters.range);
            }}
          />

        </div>
        <div className="filter-panel-section">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            fields={filterFields}
            options={filterOptions}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        {/* <SavedFilters
          module="tasks"
          onSelect={(saved) =>
            setFilters(
              saved.filter_json
            )
          }
        /> */}

      </div>
      <div className="export-toolbar">
        <ExportToolbar rowData={tasks}
          selectedRows={selectedRows}
        />
      </div>
      <div className="ag-theme-alpine"
        style={{
          height: "600px",
          width: "100%"
        }}
      >
        <AgGridReact theme="legacy"
          ref={gridRef}
          rowData={tasks}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={20}
          onRowClicked={(params) => {
            if (params.event.target.closest(".task-actions")) {
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
              ? `row-${status}`
              : "";

          }}
        />

      </div>

      <ViewTask

        open={
          viewOpen
        }

        onClose={() =>
          setViewOpen(false)
        }

        task={
          selectedTask
        }
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

        alert={
          alert
        }

      />

    </div>

  );

};

export default TaskGrid;