import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import "../../styles/formModel.css";


const FormModal = ({

    open,

    onClose,

    title,

    fields = [],

    formData = {},

    onChange,

    onSave,

    saving = false,

    buttonText = "Save"

}) => {


    return (

        <Dialog


            open={open}


            onClose={onClose}


            maxWidth="lg"


            fullWidth


            className="form-modal"


            PaperProps={{

                className:
                    "form-modal-paper"

            }}


        >



            <DialogTitle

                className="form-modal-title"

            >

                {title}

            </DialogTitle>





            <DialogContent>
                <div className="form-fields">

                    {
                        fields.map(
                            (field) => (
                                <div className={ `form-field ${field.size === "small" ? "small-width" : field.size === "medium" ? "medium-width" : "full-width" } ${field.newRow ? "new-row" : "" }` }>
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        name={field.name}
                                        value={
                                            formData[field.name]
                                            ??
                                            ""
                                        }
                                        onChange={
                                            onChange
                                        }
                                        select={
                                            field.type === "select"
                                        }
                                        SelectProps={{
                                            MenuProps:{
                                                PaperProps:{
                                                    className:"theme-dropdown-menu"
                                                }
                                            }
                                        }}
                                        multiline={
                                            field.type === "textarea"
                                        }
                                        rows={
                                            field.type === "textarea"
                                            ?
                                            field.rows || 2
                                            :
                                            1
                                        }
                                        error={
                                            Boolean(
                                                field.error
                                            )
                                        }
                                        helperText={
                                            field.error ||
                                            ""
                                        }
                                        className={
                                            field.type === "textarea"
                                                ?
                                                "form-textarea"
                                                :
                                                "form-input"
                                        }
                                    >
                                        {
                                            field.type === "select"
                                            &&
                                            field.options?.map(
                                                (option) => (
                                                    <MenuItem
                                                        key={
                                                            option.id
                                                        }
                                                        value={
                                                            option.id
                                                        }
                                                    >
                                                        {
                                                            option.name
                                                            ||
                                                            option.project_name
                                                            ||
                                                            option.source_name
                                                            ||
                                                            option.tasktype_name
                                                        }
                                                    </MenuItem>
                                                )
                                            )
                                        }
                                    </TextField>
                                </div>
                            )
                        )
                    }
                </div>
            </DialogContent>
            <DialogActions className="form-modal-actions">
                <Button
                    onClick={
                        onClose
                    }
                    className="form-cancel-btn"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={
                        onSave
                    }
                    disabled={
                        saving
                    }
                    className="form-save-btn"
                >
                    {
                        saving
                            ?
                            "Saving..."
                            :
                            buttonText
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormModal;