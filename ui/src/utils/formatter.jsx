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