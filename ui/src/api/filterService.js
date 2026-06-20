import axiosClient from "./axiosClient";

const filterService = {

  getSavedFilters() {
    return axiosClient.get(
      "/saved-filters"
    );
  },

  getSavedFilter(id) {
    return axiosClient.get(
      `/saved-filters/${id}`
    );
  },

  createSavedFilter(data) {
    return axiosClient.post(
      "/saved-filters",
      data
    );
  },

  updateSavedFilter(id,data) {
    return axiosClient.put(
      `/saved-filters/${id}`,
      data
    );
  },

  deleteSavedFilter(id) {
    return axiosClient.delete(
      `/saved-filters/${id}`
    );
  }
};

export default filterService;