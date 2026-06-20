import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

export default function ProjectActions({
    row,
    onEdit,
    onDelete,
    onToggle
}) {

    return (
        <div className="task-actions">

            <button
                className="action-btn run"
                onClick={() =>
                    onToggle(row)
                }
            >
                <ToggleOnIcon />
            </button>

            <button
                className="action-btn edit"
                onClick={() =>
                    onEdit(row)
                }
            >
                <EditIcon />
            </button>

            <button
                className="action-btn delete"
                onClick={() =>
                    onDelete(row)
                }
            >
                <DeleteIcon />
            </button>

        </div>
    );
}