/*
|--------------------------------------------------------------------------
| Task Status Constants
|--------------------------------------------------------------------------
*/


export const TASK_STATUS = {

    NEW: "NEW",

    IN_PROGRESS: "IN PROGRESS",

    FINISHED: "FINISHED",

    ON_HOLD: "ON HOLD",

    DROPPED: "DROPPED"

};



/*
|--------------------------------------------------------------------------
| Status Action Flow
|
| Only statuses allowed from action button
|--------------------------------------------------------------------------
*/


export const STATUS_SEQUENCE = {

    [TASK_STATUS.NEW]:
        TASK_STATUS.IN_PROGRESS,


    [TASK_STATUS.IN_PROGRESS]:
        TASK_STATUS.FINISHED

};



/*
|--------------------------------------------------------------------------
| Get Next Status
|--------------------------------------------------------------------------
*/


export const nextStatus = (
    currentStatus
) => {


    return (
        STATUS_SEQUENCE[
            currentStatus
        ]
        ||
        null
    );


};



/*
|--------------------------------------------------------------------------
| Check Status Button Availability
|--------------------------------------------------------------------------
*/


export const canMoveNext = (
    currentStatus
) => {


    return Boolean(
        STATUS_SEQUENCE[
            currentStatus
        ]
    );


};



/*
|--------------------------------------------------------------------------
| Status Colors
|--------------------------------------------------------------------------
*/


export const getStatusColor = (
    status
) => {


    switch(status){


        case TASK_STATUS.NEW:

            return "#2196F3";


        case TASK_STATUS.IN_PROGRESS:

            return "#00BCD4";


        case TASK_STATUS.FINISHED:

            return "#4CAF50";


        case TASK_STATUS.ON_HOLD:

            return "#FF9800";


        case TASK_STATUS.DROPPED:

            return "#F44336";


        default:

            return "#FFFFFF";


    }


};



/*
|--------------------------------------------------------------------------
| Status Badge Style
|--------------------------------------------------------------------------
*/


export const getStatusStyle =
(
    status
)=>({

    color:
        getStatusColor(status),


    border:
        `1px solid ${getStatusColor(status)}`,


    borderRadius:
        "10px",


    padding:
        "4px 10px",


    fontWeight:
        "600",


    display:
        "inline-block"

});
