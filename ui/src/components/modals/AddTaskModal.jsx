import { useState, useEffect } from "react";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, MenuItem, Typography, duration } from "@mui/material";

import { Snackbar, Alert } from "@mui/material";

import taskService from "../../api/taskService";

import masterDataService from "../../api/masterdataService";

import SnackbarAlert from "../common/SnackbarAlert";

import "../../styles/addTaskModal.css";
import "../../styles/successAlert.css";

const AddTaskModal = ({
    open,
    onClose,
    onSaved
}) => {

    const [successMessage, setSuccessMessage] =
        useState(false);

    const [projects, setProjects] =
        useState([]);

    // const [platforms, setPlatforms] =
    //     useState([]);

    const [taskSources, setTaskSources] =
        useState([]);

    const [taskTypes, setTaskTypes] =
        useState([]);

    const [errors, setErrors] =
        useState({});

    const [saving, setSaving] =
        useState(false);

    const [alert, setAlert] = useState({

        open: false,

        message: "",

        severity: "",

        duration: ""

    });

    const [formData, setFormData] =
        useState({
            task_details: "",
            work_description: "",
            project_id: "",
            // platform_id: "",
            task_source_id: "",
            task_type_id: ""
        });

    useEffect(() => {

        if (!open) return;

        loadDropdowns();

    }, [open]);

    const loadDropdowns =
        async () => {

            try {

                const [
                    projectsRes,
                    // platformsRes,
                    sourcesRes,
                    typesRes
                ] = await Promise.all([
                    masterDataService.getProjects(),
                    // masterDataService.getPlatforms(),
                    masterDataService.getTaskSources(),
                    masterDataService.getTaskTypes()
                ]);
                // console.log(
                // "Platforms:",
                // platformsRes.data
                // );
                setProjects(
                    projectsRes.data || []
                );

                // setPlatforms(
                //     platformsRes.data || []
                // );

                setTaskSources(
                    sourcesRes.data || []
                );

                setTaskTypes(
                    typesRes.data || []
                );

            } catch (error) {

                console.error(
                    "Failed loading dropdowns",
                    error
                );

            }
        };

    const handleChange =
        (e) => {

            const {
                name,
                value
            } = e.target;

            setFormData((prev) => {

                const updated = {
                    ...prev,
                    [name]: value
                };

                if (
                    name === "task_details"
                ) {

                    if (
                        prev.work_description === "" ||
                        prev.work_description ===
                        prev.task_details
                    ) {

                        updated.work_description =
                            value;
                    }
                }

                return updated;
            });
        };

    const validate =
        () => {

            const validationErrors = {};

            if (
                !formData.task_details.trim()
            ) {

                validationErrors.task_details =
                    "Task Details is required";
            }

            if (
                !formData.work_description.trim()
            ) {

                validationErrors.work_description =
                    "Description is required";
            }

            if (
                !formData.project_id
            ) {

                validationErrors.project_id =
                    "Project is required";
            }

            // if (
            //     !formData.platform_id
            // ) {

            //     validationErrors.platform_id =
            //         "Platform is required";
            // }

            if (
                !formData.task_source_id
            ) {

                validationErrors.task_source_id =
                    "Task Source is required";
            }

            if (
                !formData.task_type_id
            ) {

                validationErrors.task_type_id =
                    "Task Type is required";
            }

            setErrors(
                validationErrors
            );

            return (
                Object.keys(
                    validationErrors
                ).length === 0
            );
        };

    const resetForm =
        () => {

            setFormData({
                task_details: "",
                work_description: "",
                project_id: "",
                // platform_id: "",
                task_source_id: "",
                task_type_id: ""
            });

            setErrors({});
        };

    const handleSave =
        async () => {

            if (!validate())
                return;

            try {

                setSaving(true);

                await taskService.createTask(
                    formData
                );
                setAlert({

                    open: true,

                    message:
                        "Task created successfully",

                    severity:
                        "success",

                    duration: 5000,

                    onClose: () => {

                        setAlert(prev => ({
                            ...prev,
                            open: false
                        }));

                    }

                });

                if (onSaved) {

                    onSaved();

                }

                resetForm();

                setTimeout(() => {

                    onClose();

                }, 800);

            } catch (error) {

                console.error(
                    "Save failed",
                    error
                );

            } finally {

                setSaving(false);
            }
        };

    const handleClose =
        () => {

            resetForm();

            onClose();
        };


    return (
        <>
            <Dialog

                open={open}

                onClose={handleClose}

                maxWidth="lg"

                fullWidth

                className="add-task-dialog"

                PaperProps={{
                    sx:{
                        width:"1100px",
                        maxWidth:"95vw",
                        minHeight:"500px"
                    }
                }}

            >

                <DialogTitle
                    className="add-task-title"
                >
                    Add New Task
                </DialogTitle>


                <DialogContent>


                    <Grid

                        container

                        spacing={3}

                        sx={{
                            mt: 1
                        }}

                    >


                        {/* TASK DETAILS */}

                        <Grid
                            item
                            xs={12}
                            className="input-grid-field-textarea"
                        >

                            <TextField

                                fullWidth

                                
                                
                                

                                rows={3}

                                label="Task Details"

                                name="task_details"

                                className="large-input task-details"

                                value={
                                    formData.task_details
                                }

                                onChange={
                                    handleChange
                                }

                                error={
                                    !!errors.task_details
                                }

                                helperText={
                                    errors.task_details
                                }

                            />

                        </Grid>



                        {/* DESCRIPTION */}

                        <Grid
                            item
                            xs={12}
                            className="input-grid-field-textarea"
                        >

                            <TextField

                                fullWidth

                                multiline

                                rows={5}

                                label="Description"
                                
                                className="large-input task-description"

                                name="work_description"

                                value={
                                    formData.work_description
                                }

                                onChange={
                                    handleChange
                                }


                                error={
                                    !!errors.work_description
                                }


                                helperText={
                                    errors.work_description
                                }


                            />

                        </Grid>




                        {/* PROJECT */}

                        <Grid

                            item

                            xs={12}

                            md={6}
                            
                            className="input-grid-field-dropdown"
                        >

                            <TextField

                                select

                                fullWidth

                                label="Project"

                                className="large-input dropdown"

                                name="project_id"

                                value={
                                    formData.project_id
                                }

                                onChange={
                                    handleChange
                                }

                                error={
                                    !!errors.project_id
                                }

                                helperText={
                                    errors.project_id
                                }

                            >


                                {projects.map(

                                    (project) => (

                                        <MenuItem

                                            key={
                                                project.id
                                            }

                                            value={
                                                project.id
                                            }

                                        >

                                            {
                                                project.project_name
                                            }

                                        </MenuItem>

                                    )

                                )}

                            </TextField>

                        </Grid>





                        {/* TASK SOURCE */}

                        <Grid

                            item

                            xs={12}

                            md={6}

                            className="input-grid-field-dropdown"

                        >

                            <TextField

                                select

                                fullWidth

                                label="Task Source"

                                name="task_source_id"

                                className="large-input dropdown"

                                value={
                                    formData.task_source_id
                                }

                                onChange={
                                    handleChange
                                }

                            >

                                {taskSources.map(

                                    (source) => (

                                        <MenuItem

                                            key={
                                                source.id
                                            }

                                            value={
                                                source.id
                                            }

                                        >

                                            {
                                                source.source_name
                                            }

                                        </MenuItem>


                                    )

                                )}

                            </TextField>


                        </Grid>






                        {/* TASK TYPE */}

                        <Grid

                            item

                            xs={12}

                            md={4}

                            className="input-grid-field-dropdown"

                        >

                            <TextField

                                select

                                fullWidth

                                label="Task Type"

                                name="task_type_id"

                                className="large-input dropdown"

                                value={
                                    formData.task_type_id
                                }

                                onChange={
                                    handleChange
                                }


                            >

                                {taskTypes.map(

                                    (type) => (

                                        <MenuItem

                                            key={
                                                type.id
                                            }

                                            value={
                                                type.id
                                            }

                                        >

                                            {
                                                type.tasktype_name
                                            }

                                        </MenuItem>

                                    )

                                )}

                            </TextField>


                        </Grid>




                    </Grid>


                </DialogContent>





                <DialogActions

                    className="add-task-actions"

                >


                    <Button

                        onClick={
                            handleClose
                        }

                        className="cancel-task-btn"

                    >

                        Cancel

                    </Button>



                    <Button

                        variant="contained"

                        onClick={
                            handleSave
                        }

                        disabled={
                            saving
                        }

                        className="save-task-btn"

                    >

                        {
                            saving
                                ? "Saving..."
                                : "Save Task"
                        }


                    </Button>



                </DialogActions>


            </Dialog>



            <SnackbarAlert

                alert={
                    alert
                }

            />

        </>
    );
};

export default AddTaskModal;