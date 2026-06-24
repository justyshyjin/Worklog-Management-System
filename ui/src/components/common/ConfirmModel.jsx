import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import "../../styles/confirmModel.css";


const ConfirmModel = ({

    open,

    title="Confirm",

    message,

    onConfirm,

    onCancel

}) => {


return (

<Dialog

    open={open}

    onClose={onCancel}

    className="common-confirm-modal"


    PaperProps={{
        className:
            "confirm-paper"
    }}

>


    <DialogTitle

        className="confirm-title"

    >

        {title}


    </DialogTitle>



    <DialogContent

        className="confirm-content"

    >

        {message}


    </DialogContent>



    <DialogActions

        className="confirm-actions"

    >


        <Button

            variant="outlined"

            className="confirm-cancel-btn"

            onClick={onCancel}

        >

            Cancel

        </Button>




        <Button

            variant="contained"

            className="confirm-ok-btn"

            onClick={onConfirm}

        >

            Confirm

        </Button>


    </DialogActions>


</Dialog>


);


};


export default ConfirmModel;