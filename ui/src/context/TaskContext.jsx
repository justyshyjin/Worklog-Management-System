import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import axiosClient from "../api/axiosClient";

const TaskContext =
  createContext();

export const TaskProvider = ({
  children
}) => {

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchTasks =
    async () => {

      try {

        setLoading(true);

        const response =
          await axiosClient.get(
            "/tasks"
          );

        setTasks(
          response.data
        );

      } catch (err) {

        console.error(err);

        setError(
          "Failed to load tasks"
        );

      } finally {

        setLoading(false);

      }
    };

  const createTask =
    async (taskData) => {

      try {

        const response =
          await axiosClient.post(
            "/tasks",
            taskData
          );

        setTasks(prev => [
          response.data,
          ...prev
        ]);

        return response.data;

      } catch (err) {

        console.error(err);

        throw err;

      }
    };

  const updateTask =
    async (
      taskId,
      taskData
    ) => {

      try {

        const response =
          await axiosClient.put(
            `/tasks/${taskId}`,
            taskData
          );

        setTasks(prev =>
          prev.map(task =>
            task.id === taskId
              ? response.data
              : task
          )
        );

        return response.data;

      } catch (err) {

        console.error(err);

        throw err;

      }
    };

  const deleteTask =
    async (taskId) => {

      try {

        await axiosClient.delete(
          `/tasks/${taskId}`
        );

        setTasks(prev =>
          prev.filter(
            task =>
              task.id !== taskId
          )
        );

      } catch (err) {

        console.error(err);

        throw err;

      }
    };

  useEffect(() => {

    fetchTasks();

  }, []);

  return (

    <TaskContext.Provider
      value={{

        tasks,

        loading,

        error,

        fetchTasks,

        createTask,

        updateTask,

        deleteTask

      }}
    >

      {children}

    </TaskContext.Provider>

  );
};

export const useTasks = () =>
  useContext(TaskContext);