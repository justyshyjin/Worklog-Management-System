import FormModel from FormModel

export default const EditTask = ({
    open,
    onClose,
    formData,
    handleChange,
    handleSave,
    mode

}) =>{


    const EditTaskFields = [

        {
            name: "task_details",
            label: "Task Details",
            type: "textarea"
        },

        {
            name: "work_description",
            label: "Description",
            type: "textarea"
        },

        {
            name: "project_id",
            label: "Project",
            type: "select",
            options: projects
        },

        {
            name: "task_source_id",
            label: "Task Source",
            type: "select",
            options: taskSources
        },

        {
            name: "task_type_id",
            label: "Task Type",
            type: "select",
            options: taskTypes
        },

        {
            name: "task_status_id",
            label: "Status",
            type: "select",
            options: statuses
        },

        {
            name: "platform_id",
            label: "Platform",
            type: "select",
            options: platforms
        },

        {
            name: "assigned_to",
            label: "Assigned To",
            type: "select",
            options: users
        },

        {
            name: "jira_logged",
            label: "Jira Logged",
            type: "select",
            options: [
                {
                    id: 0,
                    name: "No"
                },
                {
                    id: 1,
                    name: "Yes"
                }
            ]
        },

        {
            name: "remarks",
            label: "Remarks",
            type: "textarea"
        }

    ];
    return (

        <FormModal
            open={open}
            onClose={onClose}
            title={mode === "edit" ? "Edit Task" : "Add Task"}
            ields={fields}
            formData={formData}
            onChange={handleChange}
            onSave={handleSave}
            mode={mode}
        />

    );
};
