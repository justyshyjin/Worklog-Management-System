import {
  Grid,
  TextField,
  MenuItem,
  Button
} from "@mui/material";

const AdvancedTaskFilters = ({
  filters,
  setFilters,
  onApply,
  onReset
}) => {

  return (

    <div className="advanced-filter-panel">

      <Grid container spacing={2}>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Task Search"
            value={filters.search}
            onChange={(e)=>
              setFilters({
                ...filters,
                search:e.target.value
              })
            }
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            select
            label="Status"
            value={filters.status}
            onChange={(e)=>
              setFilters({
                ...filters,
                status:e.target.value
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

            <MenuItem value="DROPPED">
              DROPPED
            </MenuItem>

          </TextField>
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Project"
            value={filters.project}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Platform"
            value={filters.platform}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            type="date"
            fullWidth
            label="Created From"
            InputLabelProps={{
              shrink:true
            }}
            value={filters.created_from}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            type="date"
            fullWidth
            label="Created To"
            InputLabelProps={{
              shrink:true
            }}
            value={filters.created_to}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Min Hours"
            value={filters.min_hours}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Max Hours"
            value={filters.max_hours}
          />
        </Grid>

      </Grid>

      <div
        className="filter-buttons"
      >

        <Button
          variant="contained"
          color="success"
          onClick={onApply}
        >
          Apply
        </Button>

        <Button
          variant="outlined"
          onClick={onReset}
        >
          Reset
        </Button>

      </div>

    </div>
  );
};

export default AdvancedTaskFilters;