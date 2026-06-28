import axiosClient from "./axiosClient";

const taskService = {

  getTasks: (params = {}) => {
    const cleanParams =
      Object.fromEntries(
        Object.entries(params)
          .filter(([key, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined
          )
      );

    return axiosClient.get("/tasks", {
      params: cleanParams
    });
  },

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
    ),
  getFilterOptions: (
    module,
    params = {}
  ) => {

    return axiosClient.get(
      "/filters/options",
      {
        params: {
          module,
          ...params
        }
      }
    );

  }


};

export default taskService;