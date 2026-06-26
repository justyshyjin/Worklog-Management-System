export const formatDateTime = (value) => {

    if (!value)
        return "-";


    const date = new Date(value);


    if (isNaN(date))
        return "-";


    const day =
        String(date.getDate())
        .padStart(2, "0");


    const month =
        String(date.getMonth() + 1)
        .padStart(2, "0");


    const year =
        date.getFullYear();


    const hours =
        String(date.getHours())
        .padStart(2, "0");


    const minutes =
        String(date.getMinutes())
        .padStart(2, "0");


    return `${day}-${month}-${year} ${hours}:${minutes}`;

};

export const formatDateTimeLong = (value) => {

    if (!value)
        return "-";


    const date = new Date(value);


    if (isNaN(date))
        return "-";


    const day =
        String(date.getDate())
        .padStart(2, "0");


    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    const month =
        monthNames[
            date.getMonth()
        ];


    const year =
        date.getFullYear();


    const hours =
        String(date.getHours())
        .padStart(2, "0");


    const minutes =
        String(date.getMinutes())
        .padStart(2, "0");


    return `${day} ${month} ${year} ${hours}:${minutes}`;

};


export const formatYesNo = (value) => {

    if (value === 1 || value === "1")
        return "Yes";


    if (value === 0 || value === "0")
        return "No";


    return "-";

};

/*
|--------------------------------------------------------------------------
| Format Working Minutes
|--------------------------------------------------------------------------
| 1 working day = 8.5 hours = 510 minutes
|--------------------------------------------------------------------------
*/

export const formatMinutes = (
    totalMinutes = 0
) => {

    if (!totalMinutes || totalMinutes < 0) {
        return "0h 0m";
    }


    const WORKING_DAY_MINUTES = 510;


    const days =
        Math.floor(
            totalMinutes /
            WORKING_DAY_MINUTES
        );


    const remainingMinutes =
        totalMinutes %
        WORKING_DAY_MINUTES;


    const hours =
        Math.floor(
            remainingMinutes / 60
        );


    const minutes =
        remainingMinutes % 60;


    if (days > 0) {

        return `${days}d ${hours}h ${minutes}m`;

    }


    return `${hours}h ${minutes}m`;

};

export const calculateWorkingMinutes = (
    startDate,
    endDate = new Date()
) => {


    if(!startDate){
        return 0;
    }


    const WORK_START_HOUR = 9;
    const WORK_START_MINUTE = 30;

    const WORK_END_HOUR = 18;
    const WORK_END_MINUTE = 0;


    let totalMinutes = 0;


    let current =
        new Date(startDate);


    const end =
        new Date(endDate);



    while(
        current.toDateString()
        <=
        end.toDateString()
    ){


        const dayStart =
            new Date(current);

        dayStart.setHours(
            WORK_START_HOUR,
            WORK_START_MINUTE,
            0,
            0
        );



        const dayEnd =
            new Date(current);


        dayEnd.setHours(
            WORK_END_HOUR,
            WORK_END_MINUTE,
            0,
            0
        );



        const actualStart =
            current > dayStart
                ? current
                : dayStart;



        const actualEnd =
            end < dayEnd
                ? end
                : dayEnd;



        if(
            actualStart < actualEnd
        ){

            totalMinutes +=
                Math.floor(
                    (
                        actualEnd -
                        actualStart
                    )
                    /
                    60000
                );

        }



        current.setDate(
            current.getDate()+1
        );


        current.setHours(
            0,
            0,
            0,
            0
        );

    }


    return totalMinutes;

};

export const formatWorkingHours = (
    minutes = 0
)=>{

    const hours =
        Math.floor(
            minutes / 60
        );


    const mins =
        minutes % 60;


    return `${hours}h ${mins}m`;

};

export const dateTimeColumn = (field, headerName) => ({
  field,
  headerName,
  width: 180,
  valueFormatter: (params) =>
    params.value ? formatDateTimeLong(params.value) : ""
});