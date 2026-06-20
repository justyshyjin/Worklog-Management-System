import axiosClient from "./axiosClient";

const DashboardService = async () => {

  const response =
    await axiosClient.get(
      "/dashboard/stats"
    );

  return response.data;
};

export default {
    getStats: DashboardService
};