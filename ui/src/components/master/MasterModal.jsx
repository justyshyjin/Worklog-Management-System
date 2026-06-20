import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

const MasterModal = ({
  open,
  title,
  data,
  setData,
  onSave,
  onClose
}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={data.name || ""}
          onChange={(e) =>
            setData({
              ...data,
              name: e.target.value
            })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Description"
          value={
            data.description || ""
          }
          onChange={(e) =>
            setData({
              ...data,
              description:
                e.target.value
            })
          }
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default MasterModal;