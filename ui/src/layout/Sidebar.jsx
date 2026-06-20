import "../styles/sidebar.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from "@mui/icons-material/Folder";
import DevicesIcon from "@mui/icons-material/Devices";
import FlagIcon from "@mui/icons-material/Flag";
import SourceIcon from "@mui/icons-material/Source";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";


const Sidebar = ({onAddTask}) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const navigate = useNavigate();
  const menuItems = [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
      label: "Dashboard"
    },

    {
      id: "tasks",
      icon: <AssignmentIcon />,
      label: "Add Tasks"
    },

    {
      id: "projects",
      path: "/project",
      icon: <FolderIcon />,
      label: "Add Projects"
    },

    {
      id: "platform",
      path: "/platform",
      icon: <DevicesIcon />,
      label: "Add Platform"
    },

    {
      id: "task_status",
      path: "/taskstatus",
      icon: <FlagIcon />,
      label: "Add Task Status"
    },

    {
      id: "task_source",
      path: "/tasksource",
      icon: <SourceIcon />,
      label: "Add Task Source"
    },

    {
      id: "task_type",
      path: "/tasktype",
      icon: <CategoryIcon />,
      label: "Add Task Type"
    },
    {
      id: "users",
      path: "/users",
      icon: <PeopleIcon />,
      label: "Users"
    },
    {
      id: "reports",
      path: "/reports",
      icon: <AssessmentIcon />,
      label: "Reports"
    },
    {
      id: "settings",
      path: "/settings",
      icon: <SettingsIcon />,
      label: "Settings"
    }
  ];

  return (
    <aside
      className={`sidebar ${sidebarOpen
          ? "expanded"
          : "collapsed"
        }`}
    >
      <ul className="menu-list">

        <li
          className="sidebar-toggle menu-item"
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
        >
          <MenuIcon />

          {sidebarOpen && (
            <span className="menu-label">
              Collapse Menu
            </span>
          )}
        </li>

        {menuItems.map((item) => (

          <li
            key={item.id}
            className="sidebar-toggle menu-item"
            onClick={() => {
              if (item.id === "tasks") {

                onAddTask?.();

                return;
              }

              navigate(
                item.path
              );
            }}
          >
            {item.icon}

            {sidebarOpen && (
              <span className="menu-label">
                {item.label}
              </span>
            )}
          </li>

        ))}

      </ul>
    </aside>
  );
};

export default Sidebar;