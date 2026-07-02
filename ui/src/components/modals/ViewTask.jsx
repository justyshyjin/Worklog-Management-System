import ViewModel from "../common/ViewModel";
import {
    formatDateTime,
    formatYesNo,
    formatDateTimeLong
} from "../../utils/formatter";

const ViewTask = ({

    open,

    onClose,

    task,

    onEdit,

    onDelete

}) => {


    const fields = [

        {
            label: "Task",
            key: "task_details"
        },

        {
            label: "Description",
            key: "work_description"
        },

        {
            label: "Project",
            key: "project"
        },

        {
            label: "Task Source",
            key: "task_source"
        },

        {
            label: "Task Type",
            key: "task_type"
        },

        {
            label: "Status",
            key: "task_status"
        },

        // {
        //     label: "Assigned To",
        //     key: "assigned_to"
        // },

        {
            label: "Platform",
            key: "platform"
        },

        {
            label: "Jira Logged",
            key: "jira_logged",
            formatter: formatYesNo
        },

        {
            label: "Time",
            key: "total_minutes"
        },

        {
            label: "Created Date",
            key: "created_date",
            formatter: formatDateTime
        },

        {
            label: "Started Date",
            key: "started_date",
            formatter: formatDateTimeLong
        },

        {
            label: "Completed Date",
            key: "completed_date",
            formatter: formatDateTimeLong
        }

        // {
        //     label: "Created At",
        //     key: "created_at",
        //     formatter: formatDateTime
        // },

        // {
        //     label: "Updated At",
        //     key: "updated_at",
        //     formatter: formatDateTime
        // }

    ];



    return (

        <ViewModel

            open={open}

            onClose={onClose}

            title="Task Details"

            data={task}

            fields={fields}

            onEdit={onEdit}

            onDelete={onDelete}

        />

    );


};


export default ViewTask;