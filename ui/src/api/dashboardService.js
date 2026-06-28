import axiosClient from "./axiosClient";

const DashboardService = {

  getStats: (params={})=>{
    return axiosClient.get(
      "/dashboard/stats",
      {
        params
      }
    );
  }

};

export default DashboardService;
    
