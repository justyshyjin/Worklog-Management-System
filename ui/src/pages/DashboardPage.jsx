import {
  Button
} from "@mui/material";

import {
  useAuth
} from "../context/AuthContext";

import MainLayout from "../layout/MainLayout";

import TaskGrid from "../components/tasks/TaskGrid";

import StatCards from "../components/stats/StatCards";

import DashboardService from "../api/dashboardService";

import { useEffect, useState } from "react";

const DashboardPage = () => {

  const {
    logout,
    user
  } = useAuth();

  // FIX 1: stats should be an array (because you render StatCards)
  const [stats, setStats] = useState([]);

  // Added: shared dashboard filter state
  const [filters, setFilters] = useState({});

  const loadStats =
    async () => {

      try {

        const res =
          await DashboardService.getStats(filters);

        // FIX 2: axios response -> res.data
        const data = res.data;

        setStats([
          {
            title: "TOTAL TASKS",
            value: data.total,
            color: "#00CFFF"
          },

          {
            title: "NEW",
            value: data.new,
            color: "#00CFFF"
          },

          {
            title: "IN PROGRESS",
            value: data.in_progress,
            color: "#00FF88"
          },

          {
            title: "ON HOLD",
            value: data.on_hold,
            color: "#FFB020"
          },

          {
            title: "FINISHED",
            value: data.finished,
            color: "#00FF88"
          },

          {
            title: "DROPPED",
            value: data.dropped,
            color: "#FF5252"
          },
          {
            title: "Todays Tasks",
            value: data.today,
            color: "#5289ffa9"
          },
          {
            title: "Week Tasks",
            value: data.weekly,
            color: "#ffd752a9"
          },
          {
            title: "Month Tasks",
            value: data.monthly,
            color: "#ba52ffa9"
          }
        ]);

      } catch (error) {

        console.error(
          "Failed to load dashboard stats",
          error
        );

      }
    };

  useEffect(() => {
    loadStats();
    const refreshStats = () => {
      loadStats();
    };

    const events = [
      "task-created",
      "taskstatus-changed"
    ];

    events.forEach(event => {
      window.addEventListener(event, refreshStats);
    });

    return () => {

      events.forEach(event => {
        window.removeEventListener(event, refreshStats);
      });

    };


  }, [filters]);

  // DashboardService.getStats()

  return (
    <MainLayout>
      <StatCards stats={stats} />
      <div className="page-header">
        <h2>DashBoard</h2>
      </div>


      <TaskGrid

        setDashboardFilters={setFilters}

      />


    </MainLayout>
  );
};

export default DashboardPage;