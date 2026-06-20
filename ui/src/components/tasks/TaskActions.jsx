import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { nextStatus,canMoveNext } from "../../utils/statusflow";

const TaskActions = ({
  row,
  onStatusChange,
  onView,
  onEdit,
  onDelete
}) => {

  const handleStatusChange = () => {

    const newStatus =
        nextStatus(
            row.task_status
        );


    if(!newStatus)
        return;


    onStatusChange(
        row,
        newStatus
    );

};

  return (
    <div className="task-actions">

      {/* <button
        className="action-btn view"
        onClick={() => onView(row)}
      >
        <VisibilityIcon fontSize="small" />
      </button> */}
      <button
        className="action-btn run"
        alt="Change Status"
        onClick={handleStatusChange}
      >
        <PlayArrowIcon fontSize="small" />
      </button>
      <button
        className="action-btn edit"
        onClick={() => onEdit(row)}
      >
        <EditIcon fontSize="small" />
      </button>


      <button
        className="action-btn delete"
        onClick={() => onDelete(row)}
      >
        <DeleteIcon fontSize="small" />
      </button>

    </div>
  );
};

export default TaskActions;