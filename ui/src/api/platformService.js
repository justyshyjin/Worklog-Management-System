import axiosClient from "./axiosClient";

const platformService = {

  getAll() {
    return axiosClient.get("/platforms");
  },

  create(data) {
    return axiosClient.post(
      "/platforms",
      data
    );
  },

  update(id, data) {
    return axiosClient.put(
      `/platforms/${id}`,
      data
    );
  },

  delete(id) {
    return axiosClient.delete(
      `/platforms/${id}`
    );
  }
};

export default platformService;