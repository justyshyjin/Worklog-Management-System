import axiosClient from "./axiosClient";


const filterService = {


  getSavedFilters: (module) =>
    axiosClient.get(
      "/savedfilters",
      {
        params: {
          module
        }
      }
    ),

  getSavedFilter: (id) =>
    axiosClient.get(
      `/savedfilters/${id}`
    ),



  createSavedFilter: (data) =>
    axiosClient.post(
      "/savedfilters",
      data
    ),



  updateSavedFilter: (
    id,
    data
  ) =>
    axiosClient.put(
      `/savedfilters/${id}`,
      data
    ),



  deleteSavedFilter: (id) =>
    axiosClient.delete(
      `/savedfilters/${id}`
    )


};


export default filterService;
