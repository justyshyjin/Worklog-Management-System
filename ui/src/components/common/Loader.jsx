import CircularProgress
from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <CircularProgress
        color="success"
      />
    </div>
  );
};

export default Loader;