// src/utils/filters/taskFilters.js

import {
    textSearchFilter,
    statusFilter,
    projectFilter,
    platformFilter,
    dateFromFilter,
    dateToFilter,
    hoursRangeFilters
} from "./baseFilters";


export const taskFilterFields = [

    textSearchFilter,

    {
        ...statusFilter,
        optionsKey: "statuses"
    },

    {
        ...projectFilter,
        optionsKey: "projects"
    },

    {
        ...platformFilter,
        optionsKey: "platforms"
    },

    dateFromFilter,

    dateToFilter,

    ...hoursRangeFilters
];


export const taskDefaultFilters = {

    search: "",
    status: [],
    project: [],
    platform: [],
    created_from: null,
    created_to: null,
    min_hours: null,
    max_hours: null

};