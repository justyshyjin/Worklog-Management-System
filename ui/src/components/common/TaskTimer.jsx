import useTaskTimer from "../../hooks/useRunningTimer";


import {formatMinutes} from "../../utils/formatter";

import "../../styles/tasktimer.css";


const TaskTimer = ({
    status,
    startedDate,
    totalMinutes
}) => {


    const isRunning =
        status === "IN PROGRESS";



    const runningMinutes =
        useTaskTimer(
            startedDate,
            isRunning
        );



    if(isRunning){

        return (

            <span
                className="task-running-time"
            >

                {
                    formatMinutes(
                        runningMinutes
                    )
                }

            </span>

        );

    }



    return (

        <span>

            {
                totalMinutes
            }

        </span>

    );


};


export default TaskTimer;