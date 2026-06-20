import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import ProjectActions from "./ProjectActions";

export default function ProjectsGrid({
    rowData,
    onEdit,
    onDelete,
    onToggle
}) {

    const columns = [

        {
            field: "id",
            width: 100
        },

        {
            field: "project_name",
            flex: 2
        },

        {
            field: "description",
            flex: 3
        },

        {
            field: "platform",
            width: 150
        },

        {
            field: "is_active",

            headerName: "Status",

            width: 150,

            valueGetter: (params) =>
                params.data.is_active
                    ? "ACTIVE"
                    : "DISABLED"
        },

        {
            field: "created_at",

            width: 180
        },

        {
            headerName: "Actions",

            width: 220,

            cellRenderer:
                (params) => (

                    <ProjectActions
                        row={params.data}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />

                )
        }

    ];

    return (
        
        <div
            className="ag-theme-alpine task-grid" style={{
        height: "600px",
        width: "100%"
    }}
        >
            <AgGridReact
                theme="legacy"
                rowData={rowData}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={20}
            />
        </div>
    );
}