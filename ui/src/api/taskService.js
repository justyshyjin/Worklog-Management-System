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
    id
  ) =>
    axiosClient.patch(
      `/tasks/${id}/status`
    ),

  getTaskStats: () =>
    axiosClient.get(
      "/tasks/stats"
    )

};

export default taskService;