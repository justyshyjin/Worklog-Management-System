import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "../../styles/successAlert.css";

// severity type: (error,warning,info,success)

export default function SnackbarAlert({

    alert

}) {


    return (

        <Snackbar

            open={alert.open}

            autoHideDuration={alert.duration || 3000}

            onClose={ alert.onClose }

            anchorOrigin={{

                vertical: "top",

                horizontal: "right"

            }}

            className="success-alert-container"

            sx={{
                mt: 8
            }}
        >

            <Alert

                onClose={alert.onClose}

                severity={alert.severity||"success"}

                variant="filled"

                className="success-alert"

            >
                {alert.message}

            </Alert>

        </Snackbar>

    );

}