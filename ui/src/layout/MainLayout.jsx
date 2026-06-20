import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

import AddTask from "../components/modals/AddTask";

import "../styles/layout.css";

const MainLayout = ({ children }) => {

  const [addTaskOpen, setAddTaskOpen] =
    useState(false);

  const handleTaskSaved = () => {
    window.dispatchEvent(
      new Event("task-created")
    );

  };

  return (

    <div className="layout-container">

      <Header />

      <div className="layout-body">

        <Sidebar
          onAddTask={() =>
            setAddTaskOpen(true)
          }
        />

        <main className="content-area">
          {children}
        </main>

      </div>

      <AddTask
        open={addTaskOpen}
        onSaved={
          handleTaskSaved
          }
        onClose={() =>
          setAddTaskOpen(false)
        }
        
      />

    </div>

  );
};

export default MainLayout;