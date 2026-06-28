import {
    useState,
    useEffect
} from "react";


import FormModal from "../common/FormModel";

import taskService from "../../api/taskService";

import masterDataService from "../../api/masterdataService";

import SnackbarAlert from "../common/SnackbarAlert";

const AddTaskForm = ({

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

                setTimeout(() => {

                    onClose();
                    resetForm();

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


    const fields=[



        {
            label:"Task Details",

            name:"task_details",

            type:"textarea",
            size:"full",
            error:
            errors.task_details

        },



        {
            label:"Description",

            name:"work_description",

            type:"textarea",
            rows:4,
            size:"medium",
            error:
            errors.work_description
        },



        {
            label:"Project",

            name:"project_id",

            type:"select",
            size:"small",
            options:projects,
            newRow:true,
            error:
            errors.project_id

        },



        {
            label:"Task Source",

            name:"task_source_id",

            type:"select",
            size:"small",

            options:taskSources,

            error:
            errors.task_source_id

        },



        {
            label:"Task Type",

            name:"task_type_id",
            size:"small",

            type:"select",

            options:taskTypes,

            error:
            errors.task_type_id

        }


    ];






    return (

        <>


        <FormModal


            open={open}


            onClose={onClose}


            title="Add New Task"


            fields={fields}


            formData={formData}


            onChange={handleChange}


            onSave={handleSave}


            saving={saving}


            buttonText="Save Task"



        />



        <SnackbarAlert

            alert={alert}

        />



        </>

    );

};


export default AddTaskForm;