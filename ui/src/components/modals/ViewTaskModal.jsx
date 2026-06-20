import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from "@mui/material";

const ViewTaskModal = ({
  open,
  onClose,
  task
}) => {
  if (!task) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Task Details
      </DialogTitle>

      <DialogContent>

        <Typography>
          <b>Task:</b>
          {" "}
          {task.task_details}
        </Typography>

        <Typography>
          <b>Project:</b>
          {" "}
          {task.project}
        </Typography>

        <Typography>
          <b>Status:</b>
          {" "}
          {task.status}
        </Typography>

        <Typography>
          <b>Assigned To:</b>
          {" "}
          {task.assigned_to}
        </Typography>

        <Typography>
          <b>Hours:</b>
          {" "}
          {task.hours}
        </Typography>

      </DialogContent>

    </Dialog>
  );
};

export default ViewTaskModal;