import {
  Grid,
  TextField,
  MenuItem
} from "@mui/material";

const TaskFilters = ({
  filters,
  setFilters
}) => {
  return (
    <div className="filter-panel">

      <Grid container spacing={2}>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Search Task"
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value
              })
            }
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            select
            fullWidth
            label="Status"
            value={filters.status}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value
              })
            }
          >
            <MenuItem value="">
              All
            </MenuItem>

            <MenuItem value="NEW">
              NEW
            </MenuItem>

            <MenuItem value="IN_PROGRESS">
              IN PROGRESS
            </MenuItem>

            <MenuItem value="FINISHED">
              FINISHED
            </MenuItem>

          </TextField>
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Project"
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Assigned To"
          />
        </Grid>

      </Grid>

    </div>
  );
};

export default TaskFilters;