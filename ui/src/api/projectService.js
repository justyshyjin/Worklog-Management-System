import axiosClient from "./axiosClient";

const projectService = {

  getAll() {
    return axiosClient.get("/projects");
  },

  getById(id) {
    return axiosClient.get(`/projects/${id}`);
  },

  create(data) {
    return axiosClient.post(
      "/projects",
      data
    );
  },

  update(id, data) {
    return axiosClient.put(
      `/projects/${id}`,
      data
    );
  },

  delete(id) {
    return axiosClient.delete(
      `/projects/${id}`
    );
  }
};

export default projectService;