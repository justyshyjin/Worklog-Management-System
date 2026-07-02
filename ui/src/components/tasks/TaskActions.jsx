import { useState } from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModel from "../common/ConfirmModel";


const TaskActions = ({
  row,
  onStatusChange,
  onStatusBlocked,
  onEdit,
  onDelete
}) => {


    const [
        confirmOpen,
        setConfirmOpen
    ] = useState(false);


    const [
        nextStatusValue,
        setNextStatusValue
    ] = useState("");



    const handleStatusChange = (event)=>{

        event.stopPropagation();
        setConfirmOpen(true);

    };



    const confirmStatusChange = ()=>{

        onStatusChange(row);

        setConfirmOpen(false);

    };

  const handleEdit = (event) => {

    event.stopPropagation();

    onEdit(row);

  };

  const handleDelete = (event) => {

    event.stopPropagation();

    onDelete(row);

  };

  return (

        <>


    <div
      className="task-actions"
      onClick={(e)=>
                e.stopPropagation()
            }
    >

      {/* <button
        className="action-btn view"
        onClick={() => onView(row)}
      >
        <VisibilityIcon fontSize="small" />
      </button> */}
      <button
        className="action-btn run"
        alt="Change Status"
        onClick={
                    handleStatusChange
                }
      >
        <PlayArrowIcon fontSize="small" />
      </button>



      <button

        className="action-btn edit"

                onClick={(e)=>{

                    e.stopPropagation();

                    onEdit(row);

                }}

            >

                <EditIcon
                    fontSize="small"
                />

      </button>


      <button
        className="action-btn delete"

                onClick={(e)=>{

                    e.stopPropagation();

                    onDelete(row);

                }}

            >

                <DeleteIcon
                    fontSize="small"
                />

      </button>

    </div>



        <ConfirmModel

            open={confirmOpen}

            title="Change Task Status"

            message={
                `Move task status to Next Status`
            }

            onConfirm={
                confirmStatusChange
            }

            onCancel={()=>
                setConfirmOpen(false)
            }

        />


        </>

  );
};

export default TaskActions;
