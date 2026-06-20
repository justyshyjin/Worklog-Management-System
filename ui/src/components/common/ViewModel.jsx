import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import "../../styles/viewmodel.css";


const ViewModel = ({

    open,

    onClose,

    title,

    data,

    fields = [],

    onEdit,

    onDelete

}) => {


    return (

        <Dialog

            open={open}

            onClose={onClose}

            maxWidth="md"

            fullWidth

            className="common-view-modal"

            PaperProps={{
                className:
                    "common-view-paper"
            }}

        >


            <DialogTitle

                className="common-modal-title"

            >

                {title}

            </DialogTitle>



            <DialogContent>


                <div className="view-fields">


                    {
                        fields.map(
                            (field) => (

                                <div

                                    className="view-field-row"

                                    key={
                                        field.key
                                    }

                                >


                                    <div

                                        className="view-label"

                                    >

                                        {
                                            field.label
                                        }

                                    </div>



                                    <div

                                        className="view-value"

                                    >

                                        {
                                            data &&
                                                data[field.key] !== undefined &&
                                                data[field.key] !== null

                                                ?

                                                (
                                                    field.formatter

                                                        ?

                                                        field.formatter(
                                                            data[field.key]
                                                        )

                                                        :

                                                        data[field.key]
                                                )

                                                :

                                                "-"
                                        }

                                    </div>


                                </div>

                            )
                        )
                    }


                </div>


            </DialogContent>





            <DialogActions

                className="common-modal-actions"

            >


                <Button

                    variant="contained"

                    className="edit-btn"

                    onClick={onEdit}

                    disabled={!data}

                >

                    Edit

                </Button>



                <Button

                    variant="contained"

                    className="delete-btn"

                    onClick={onDelete}

                    disabled={!data}

                >

                    Delete

                </Button>



                <Button

                    variant="outlined"

                    className="close-btn"

                    onClick={onClose}

                >

                    Close

                </Button>


            </DialogActions>


        </Dialog>

    );

};


export default ViewModel;