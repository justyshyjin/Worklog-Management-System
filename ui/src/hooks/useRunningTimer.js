import {calculateWorkingMinutes} from "../utils/formatter";

import {
    useEffect,
    useState
} from "react";


const useTaskTimer = (
    startedDate,
    isRunning
) => {


    const [minutes, setMinutes] =
        useState(0);



    useEffect(() => {


        if (
            !isRunning ||
            !startedDate
        ) {

            return;

        }


        const calculate = () => {


            setMinutes(
                calculateWorkingMinutes(
                    startedDate
                )
            );


        };


        calculate();


        const interval =
            setInterval(
                calculate,
                1000
            );


        return () => {

            clearInterval(
                interval
            );

        };


    }, [
        startedDate,
        isRunning
    ]);



    return minutes;

};


export default useTaskTimer;