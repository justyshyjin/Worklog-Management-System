import axiosClient from "./axiosClient";

const masterDataService = {

  getProjects: () =>
    axiosClient.get(
      "/projects"
    ),

  getPlatforms: () =>
    axiosClient.get(
      "/platforms"
    ),

  getTaskSources: () =>
    axiosClient.get(
      "/tasksource"
    ),

  getTaskTypes: () =>
    axiosClient.get(
      "/tasktype"
    ),

  getTaskStatuses: () =>
    axiosClient.get(
      "/task-statuses"
    ),

  getUsers: () =>
    axiosClient.get(
      "/users"
    )

};

export default masterDataService;