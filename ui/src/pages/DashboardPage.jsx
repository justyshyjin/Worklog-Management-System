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

  const [stats, setStats] = useState([]);

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

            window.addEventListener(
                event,
                refreshStats
            );

        });

        return () => {

            events.forEach(event => {

                window.removeEventListener(
                    event,
                    refreshStats
                );

            });

        };
  }, []);

  const loadStats =
    async () => {

      try {

        const data =
          await DashboardService.getStats();

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
          }
        ]);

      } catch (error) {

        console.error(
          "Failed to load dashboard stats",
          error
        );

      }
    };

  return (
    <MainLayout>
      <StatCards stats={stats} />
      <div className="page-header">
        <h2>DashBoard</h2>
      </div>
      <TaskGrid />
    </MainLayout>
  );
};

export default DashboardPage;