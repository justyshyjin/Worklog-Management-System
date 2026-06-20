import "./AddTaskModal.css";

export default function AddProjectModal({
  open,
  onClose
}) {

  if(!open) return null;

  return (

    <div className="modal-overlay">

      <div className="task-modal">

        <h2>
          Add New Project
        </h2>

        <input
          placeholder="Task Details"
        />

        <select>
          <option>Project</option>
        </select>

        <select>
          <option>Task Type</option>
        </select>

        <select>
          <option>Task Source</option>
        </select>

        <textarea
          placeholder="Work Description"
        />

        <textarea
          placeholder="Remarks"
        />

        <div className="modal-actions">

          <button
            className="save-btn"
          >
            Save
          </button>

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}