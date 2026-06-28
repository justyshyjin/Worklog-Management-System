// src/utils/filters/baseFilters.js

export const textSearchFilter = {
    key: "search",
    label: "Search",
    type: "text"
};

export const statusFilter = {
    key: "status",
    label: "Status",
    type: "select",
    optionsKey: "statuses",
    multiple: true
};

export const projectFilter = {
    key: "project",
    label: "Project",
    type: "select",
    optionsKey: "projects",
    multiple: true
};

export const platformFilter = {
    key: "platform",
    label: "Platform",
    type: "select",
    optionsKey: "platforms",
    multiple: true
};

export const dateFromFilter = {
    key: "created_from",
    label: "From Date",
    type: "date"
};

export const dateToFilter = {
    key: "created_to",
    label: "To Date",
    type: "date"
};

export const hoursRangeFilters = [
    {
        key: "min_hours",
        label: "Min Hours",
        type: "number"
    },
    {
        key: "max_hours",
        label: "Max Hours",
        type: "number"
    }
];