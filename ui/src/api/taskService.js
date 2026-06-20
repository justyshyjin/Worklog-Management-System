import axiosClient from "./axiosClient";

const taskService = {

  getTasks: (params = {}) =>
    axiosClient.get(
      "/tasks",
      { params }
    ),

  getTaskById: (id) =>
    axiosClient.get(
      `/tasks/${id}`
    ),

  createTask: (data) =>
    axiosClient.post(
      "/tasks",
      data
    ),

  updateTask: (
    id,
    data
  ) =>
    axiosClient.put(
      `/tasks/${id}`,
      data
    ),

  deleteTask: (id) =>
    axiosClient.delete(
      `/tasks/${id}`
    ),

  changeStatus: (
    id,
    task_status_id
  ) =>
    axiosClient.patch(
      `/tasks/${id}/status`,
      {
        task_status_id
      }
    ),

  getTaskStats: () =>
    axiosClient.get(
      "/tasks/stats"
    )

};

export default taskService;